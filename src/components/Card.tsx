import {getThumbnailPath} from "../helpers/ThumbnailHelper";
import {Link} from "react-router-dom";
import {Thumbnail} from "../models/Thumbnail";

interface Props{
    thumbnail: Thumbnail;
    name: string;
    link: string;
}

export default function Card({name, thumbnail, link}: Props) {
    return (
        <Link className="flex flex-col rounded border border-gray-600 group overflow-hidden" to={link}>
            <div className="overflow-hidden relative">
                <div className="w-full h-full absolute z-10 opacity-0 group-hover:opacity-100 transition duration-300 flex bg-[rgba(0,0,0,0.5)]"><div className="m-auto">See more</div></div>
                <img className="group-hover:scale-110 aspect-square transition duration-300" src={getThumbnailPath(thumbnail)}/>
            </div>
            <div className="mt-auto p-2">{name}</div>
        </Link>
    );
}
