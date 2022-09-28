import {ApiResult} from "./ApiResult";

export interface PaginationType extends ApiResult {
    max: number;
    current: number;
}

export const DEFAULT_LIMIT = 20;

export const DEFAULT_PAGINATION: PaginationType = {
    max : 1,
    current: 1,
    limit: DEFAULT_LIMIT,
    offset: 0,
    total: 0,
    count: 0
};
