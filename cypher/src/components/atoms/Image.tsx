import { FC } from "react";


interface ImageProps {
    path: string,
    altText:string
}

const Image:FC<ImageProps> =({path,altText})=>{
    return(
        <>
        <img className="" src={path} alt = {altText}/>
        </>
    )
}

export default Image;