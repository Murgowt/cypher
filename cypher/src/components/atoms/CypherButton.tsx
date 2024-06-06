type props={
    placeHolder : string,
    helperFunction: () => void
}

const CypherButton = ({placeHolder,helperFunction}:props) =>{

    return(
        <button className="bg-primary text-white px-5 py-3 rounded-lg shadow-lg" onClick ={()=>helperFunction()}>
            {placeHolder}
        </button>
    )
}

export default CypherButton;