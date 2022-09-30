export type TOnFilterList<S extends unknown, L extends unknown> = (search: S, list: L[]) => Promise<L[]>
export type TOnFilterListAsync<S extends unknown, L extends unknown> = (search: S, list: L[]) => Promise<L[]>