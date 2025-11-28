export type StoreItem = {
	id: number;
};

export type StoreListResponse = {
	items: StoreItem[];
};

export interface IStore {
	list: (query: {
		cursor?: number;
		limit: number;
	}) => Promise<StoreListResponse>;
}
