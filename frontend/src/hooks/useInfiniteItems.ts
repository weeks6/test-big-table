// useInfiniteItems.js
import { useState, useRef, useCallback } from 'react';
import type { StoreItem } from '../types/store';

export function useInfiniteItems(
	fetcher: (params: URLSearchParams) => Promise<{
		items: StoreItem[];
		cursor: string | null;
	}>
) {
	const [items, setItems] = useState<StoreItem[]>([]);
	const [nextCursor, setNextCursor] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	const seenIds = useRef(new Set());

	const loadMore = useCallback(async () => {
		if (loading) return;
		setLoading(true);

		const params = new URLSearchParams();
		params.set('limit', '20');
		if (nextCursor !== null) params.set('cursor', String(nextCursor));

		const data = await fetcher(params);

		const newItems = data.items.filter((i) => {
			if (seenIds.current.has(i.id)) return false;
			seenIds.current.add(i.id);
			return true;
		});

		setItems((prev) => [...prev, ...newItems]);
		setNextCursor(data.cursor);

		setLoading(false);
	}, [nextCursor, loading, fetcher]);

	return { items, loadMore, hasMore: nextCursor !== null, loading };
}
