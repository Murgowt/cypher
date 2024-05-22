type props={
    placeHolder : string,
    helperFunction: () => void
}

const CypherButton = ({placeHolder,helperFunction}:props) =>{

    return(
        <button className="bg-primary px-3 py-2 font-semibold" onClick ={()=>helperFunction()}>
            {placeHolder }
        </button>
    )
}

export default CypherButton;