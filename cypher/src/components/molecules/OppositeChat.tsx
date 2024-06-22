import {FC }from 'react'

interface OppositeChatProps {
    msg:string
}

const OppositeChat : FC<OppositeChatProps> = ({msg}) =>{
    console.log("opp", msg)
    return(
        <div className="flex justify-start mb-2">
            <div className="bg-primary text-secondary rounded-r-xl rounded-b-xl overflow-hidden bg-white border border-secondary">
                <h1 className="px-5 py-3 font-abhaya">{msg}</h1>
            </div>
        </div>
    )
}

export default OppositeChat