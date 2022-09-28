import axios from "axios";
import {API_HASH, API_KEY, BASE_URL, TIMESTAMP} from "../config/config";
import {ApiResult} from "../models/ApiResult";
import {PaginationType} from "../models/Pagination";

export function request(url: string, extraParams: object = {}){
    return axios.get(BASE_URL + url,{params: {apikey: API_KEY, hash: API_HASH, ts: TIMESTAMP, ...extraParams}})
}

export function getPaginationValues (apiresult: ApiResult): PaginationType {
    return {
        current : (apiresult.offset + 1 <= apiresult.limit) ? 1 : Math.ceil((apiresult.offset + 1) / apiresult.limit),
        max : Math.ceil(apiresult.total / apiresult.limit),
        ...apiresult
    }
}
