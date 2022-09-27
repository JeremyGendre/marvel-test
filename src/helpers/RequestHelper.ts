import axios from "axios";
import {API_HASH, API_KEY, BASE_URL, TIMESTAMP} from "../config/config";
import {ApiResult} from "../models/ApiResult";
import {Pagination} from "../models/Pagination";

export function request(url: string, extraParams: object = {}){
    return axios.get(BASE_URL + url,{params: {apikey: API_KEY, hash: API_HASH, ts: TIMESTAMP, ...extraParams}})
}

export function getPaginationValues (apiresult: ApiResult): Pagination {
    return {
        current : (apiresult.offset <= apiresult.limit) ? 1 : Math.floor(apiresult.offset / apiresult.limit),
        max : Math.ceil(apiresult.total / apiresult.limit)
    }
}
