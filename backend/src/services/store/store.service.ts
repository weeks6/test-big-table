import { IStore, StoreItem } from './store.types.js';

const listSize = 1_000_000;
const initialList: StoreItem[] = [];

function seedStore() {
	for (let i = 0; i < listSize; i++) {
		initialList.push({ id: i });
	}
}

seedStore();

const Store: IStore = {
	list: async ({ cursor, limit }) => {
		console.log({ cursor, limit });

		let startIndex = 0;

		if (cursor !== null && cursor !== undefined) {
			startIndex = Number(cursor) + 1;
		}

		const items = initialList.slice(startIndex, startIndex + limit);

		const next = items.length > 0 ? startIndex + items.length - 1 : null;

		return {
			items,
			cursor: next,
		};
	},
};

export default Store;
