import {FC }from 'react'

interface OppositeChatProps {
    msg:string
}

const OppositeChat : FC<OppositeChatProps> = ({msg}) =>{
    console.log("opp", msg)
    return(
        <div className='shadow-md rounded-r-lg rounded-b-lg mb-2 bg-secondary text-white'>
            <h1 className='p-3'>{msg}</h1> 
        </div>
    )
}

export default OppositeChat