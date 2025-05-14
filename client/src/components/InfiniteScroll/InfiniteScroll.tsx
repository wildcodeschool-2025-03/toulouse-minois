import { useEffect, useRef } from 'react';

interface InfiniteScrollProps {
    fetchNextPage: () => void;
    hasNextPage: boolean | undefined;
    isFetchingNextPage: boolean;
}

function InfiniteScroll({ fetchNextPage, hasNextPage, isFetchingNextPage }: InfiniteScrollProps) {
    const observerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!hasNextPage || isFetchingNextPage) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    fetchNextPage();
                }
            },
            { threshold: 1.0 }
        );

        if (observerRef.current) {
            observer.observe(observerRef.current);
        }

        return () => {
            if (observerRef.current) {
                observer.unobserve(observerRef.current);
            }
        };
    }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

    return <div ref={observerRef} />;
}

export default InfiniteScroll;