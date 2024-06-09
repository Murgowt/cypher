type props={
    placeHolder : string,
    helperFunction: () => void
}

const CypherButton = ({placeHolder,helperFunction}:props) =>{

    return(
        <button className="bg-primary text-white px-4 py-2 text-sm rounded-lg shadow-lg" onClick ={()=>helperFunction()}>
            {placeHolder}
        </button>
    )
}

export default CypherButton;