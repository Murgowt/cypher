type props={
    placeHolder : string,
    helperFunction: () => void
}

const CypherButton = ({placeHolder,helperFunction}:props) =>{

    return(
        <button className="bg-primary px-3 py-2 text-secondaryFont rounded-xl" onClick ={()=>helperFunction()}>
            {placeHolder }
        </button>
    )
}

export default CypherButton;