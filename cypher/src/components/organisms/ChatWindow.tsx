import {FC, useEffect, useRef } from 'react'
import firebase from 'firebase/compat/app';
import 'firebase/firestore'
import 'firebase/auth'
import { collection, getFirestore, serverTimestamp, onSnapshot, query,where, orderBy } from 'firebase/firestore';
import { useState } from 'react';
import { addDoc } from 'firebase/firestore';
import SelfChat from '../molecules/SelfChat';
import OppositeChat from '../molecules/OppositeChat';
//Firebase Initializations
const app = firebase.initializeApp({
    apiKey: "AIzaSyBZHHJ_OZMiORvgvHULc8JaHSufiia3TAs",
    authDomain: "cypher-chats.firebaseapp.com",
    projectId: "cypher-chats",
    storageBucket: "cypher-chats.appspot.com",
    messagingSenderId: "133858993300",
    appId: "1:133858993300:web:76eba24ab15c4ab8ddc081",
    measurementId: "G-VPW6CW2ZEK"
})
const db = getFirestore(app)
interface ChatWindowProps {
    clientId: string,
    projectId : string,
    cypherId: string,
    isClient : boolean,
    disabled: boolean,
    placeholder: string
}
const ChatWindow : FC<ChatWindowProps> = ({clientId, projectId,cypherId,isClient, disabled, placeholder}) =>{
    const clientUserName = clientId.split('-')[1]
    const cypherUserName = cypherId.split('-')[1]
    const [newMessage,setNewMessage] = useState('')
    const [messages, setMessages] = useState([])
    const chatid = "clientId-"+clientId+"-projectId-"+projectId+'-CypherId-'+cypherId 
    const chatID = chatid.split(' ').join('_')

    // console.log(chatID)
    const chatsRef = collection(db,chatID)
    const handleChange = (e:any)=>{
        setNewMessage(e.target.value)
    }
    const handleSubmit = async(e:any)=>{
        e.preventDefault();
        if(newMessage=='') return;
        await addDoc(chatsRef,{
            text:newMessage,
            createAt:serverTimestamp(), 
            user: isClient?clientId:cypherId,
        })
        setNewMessage('')
    }
    useEffect(()=>{
        const queryMessage = query(chatsRef,where('user','in',[clientId,cypherId]))
        onSnapshot(queryMessage,(snapshot)=>{
            let Newmessages = []
            let textMsg=""
            let createTime=String(Math.floor(Date.now() / 1000))
            let user = ''
            snapshot.forEach((doc)=>{
                try{
                    textMsg = doc._document.data.value.mapValue.fields.text.stringValue
                    createTime =  doc._document.data.value.mapValue.fields.createAt.timestampValue
                    user = doc._document.data.value.mapValue.fields.user.stringValue
                }
                catch(err){
                    textMsg =""
                }
                Newmessages.push({text:textMsg,id:doc.id,createAt:Date.parse(createTime),user:user})
               
            })
            Newmessages.sort((a,b)=>{
                return a.createAt - b.createAt
            })
            setMessages(Newmessages)
            

        })
    },[])

    const messagesEndRef = useRef<HTMLElement>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])


    return(
        <div className="fixed p-4 w-full max-w-3xl h-1/2 desktop:h-3/4 desktop:max-w-md bg-white shadow-lg rounded-t-md flex flex-col">
            <div className="text-secondary border-b-2 border-lightgrey p-4 mb-2 font-abhaya">
                {isClient ? clientUserName : cypherUserName}
            </div>
            <div className="flex-1 overflow-y-scroll mb-2 no-scrollbar">
                {messages.map((msg, index) => (
                    msg.user === clientId
                        ? (isClient
                            ? <SelfChat key={index} msg={msg.text} />
                            : <OppositeChat key={index} msg={msg.text} />)
                        : (isClient
                            ? <OppositeChat key={index} msg={msg.text} />
                            : <SelfChat key={index} msg={msg.text} />)
                ))}
                <div ref={messagesEndRef} />
            </div>
            <div className="flex">
                <input
                    className="flex-1 p-2 rounded-l-md"
                    placeholder={placeholder}
                    onChange={handleChange}
                    value={newMessage}
                    disabled={disabled}
                />
                <button
                    className="bg-secondary text-white p-2 rounded-r-md"
                    onClick={handleSubmit}
                    hidden={disabled}
                >
                    Send
                </button>
            </div>
        </div>
    )
}

export default ChatWindow;