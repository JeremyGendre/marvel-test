import {Thumbnail} from "./Thumbnail";
import {SubCollection} from "./SubCollection";

export interface Character{
    id: number;
    name: string;
    description: string;
    thumbnail: Thumbnail;
    comics: SubCollection;
    series: SubCollection;
}
