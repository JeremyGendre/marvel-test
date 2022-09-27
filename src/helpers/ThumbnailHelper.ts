import {Thumbnail} from "../models/Thumbnail";

export function getThumbnailPath(tn: Thumbnail){
    return `${tn.path}.${tn.extension}`;
}
