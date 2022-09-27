import axios from "axios";
import {API_HASH, API_KEY, BASE_URL, TIMESTAMP} from "../config/config";

export function request(url: string, extraParams: any = {}){
    return axios.get(BASE_URL + url,{params: {apikey: API_KEY, hash: API_HASH, ts: TIMESTAMP, ...extraParams}})
}
