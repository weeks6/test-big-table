import { useCallback, useEffect, useRef } from 'react';
import type { StoreItem } from '../types/store';
import { useInfiniteItems } from '../hooks/useInfiniteItems';

export default function ItemsTable() {
    const fetcher = useCallback(async (params: URLSearchParams) => {
        const response = await fetch(`http://127.0.0.1:3000/api/store/list?${params.toString()}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return await response.json() as { items: StoreItem[], cursor: string };
    }, [])

    const { items, loadMore, hasMore, loading } = useInfiniteItems(fetcher);
    const bottomRef = useRef(null);

    useEffect(() => { loadMore(); }, []);

    useEffect(() => {
        if (!hasMore) return;

        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && !loading) {
                loadMore();
            }
        });

        if (bottomRef.current) {

            observer.observe(bottomRef.current);
        }

        return () => observer.disconnect();
    }, [hasMore, loading, loadMore]);

    return (
        <div className='table-container'>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Data</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{JSON.stringify(item)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div ref={bottomRef} style={{ height: 1 }} />

            {loading && <p>Loading...</p>}
        </div>
    );
}