export interface Pagination {
    max: number;
    current: number;
}

export const DEFAULT_PAGINATION = {
    max : 1,
    current: 1
};
