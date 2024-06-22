import {FC, useEffect} from 'react'
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
    isClient : boolean
}
const ChatWindow : FC<ChatWindowProps> = ({clientId, projectId,cypherId,isClient}) =>{
    const clientUserName = clientId.split('-')[1]
    const cypherUserName = cypherId.split('-')[1]
    const [newMessage,setNewMessage] = useState('')
    const [messages, setMessages] = useState([])
    const chatid = "clientId-"+clientId+"-projectId-"+projectId+'-CypherId-'+cypherId 
    const chatID = chatid.split(' ').join('_')

    console.log(chatID)
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


    return(
        <div className="p-8 rounded-md bg-white shadow-lg font-abhaya overflow-y-auto h-[60%] w-full justify-end">
            <div className='text-secondary border-b-2 border-lightgrey p-4 mb-2' >
                {isClient?clientUserName:cypherUserName}
            </div>
                <div className='overflow-scroll'>
                    {messages.map((msg,index)=> {console.log(msg.user==cypherId) 
                    return(msg.user == clientId? 
                        isClient? <SelfChat key={index} msg={msg.text}/>: <OppositeChat key={index} msg={msg.text}/>
                        : isClient?<OppositeChat key={index} msg={msg.text}/> : <SelfChat key={index} msg={msg.text}/>)}
                    )}
                </div>
                <div className='flex justify-between'>
                    <input className={"w-full outline-none"}placeholder='Start typing ...' onChange={handleChange} value={newMessage}/>
                    <button className={"bg-secondary rounded-lg text-white p-2 text-md w-[20%]"} onClick={handleSubmit}>Send</button>
                </div>
        </div>
    )
}

export default ChatWindow;