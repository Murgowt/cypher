import {FC }from 'react'

interface SelfChatProps {
    msg:string
}

const SelfChat : FC<SelfChatProps> = ({msg}) =>{
    console.log('self',msg)
    return(
        <div className='shadow-md rounded-l-lg rounded-b-lg mb-2 bg-primary text-white overflow-none break-words'>
            <h1 className='p-3 '>{msg}</h1> 
        </div>
    )
}

export default SelfChat