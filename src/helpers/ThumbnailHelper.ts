import {Thumbnail} from "../models/Thumbnail";

// forme le path complet d'une thumbnail
export function getThumbnailPath(tn: Thumbnail){
    return `${tn.path}.${tn.extension}`;
}
