import {Thumbnail} from "./Thumbnail";
import {SubCollection} from "./SubCollection";

export interface Serie {
    id: number;
    title: string;
    description: string;
    thumbnail: Thumbnail;
    creators: SubCollection;
    characters: SubCollection;
    comics: SubCollection;
}
