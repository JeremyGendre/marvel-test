import {Thumbnail} from "./Thumbnail";
import {SubCollection} from "./SubCollection";

export interface Comic{
    id: number;
    title: string;
    description: string;
    thumbnail: Thumbnail;
    creators: SubCollection;
    characters: SubCollection;
    series: {name: string};
    format: string;
}
