import { defaults } from "autoprefixer";
import { FC } from "react";
import Image from "../atoms/Image";
interface ImageCard {
    imgPath : string,
    text : string
}

const ImageCard:FC<ImageCard> =({imgPath,text})=>{
    console.log(imgPath)
    return (
    <div >
        <Image path={imgPath} altText="Cypher" />
        <div className="text-grey py-2 monitor:text-xl">
            <span>{text}</span>
        </div>
    </div>
    )
}

export default ImageCard;