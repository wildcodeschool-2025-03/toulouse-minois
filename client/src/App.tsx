import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Link, Outlet, ScrollRestoration } from "react-router";
import HarvardMuseumAPIContext from "../context/HavardMuseumAPIContext.tsx";
import type { Record } from "./types/HarvardType.tsx";
import "./stylesheets/normalize.css";
import "./stylesheets/App.css";
import "./stylesheets/filter.css";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import redaxios from "redaxios";

const subject = "portrait";
const classificationA = "Paintings";
const classificationB = "Photographs";
const packageSize = 100;
const ALL_ART_CACHE_KEY = 'allArt';

async function fetchAllArt(): Promise<Record[]> {
    const url = "http://localhost:3001/artworks";
    const { data } = await redaxios.get(url);
    return data;
}

function useAllArtData(enabled: boolean) {
    return useQuery<Record[]>({
        queryKey: [ALL_ART_CACHE_KEY],
        queryFn: fetchAllArt,
        staleTime: 24 * 60 * 60 * 1000,
        enabled: enabled,
    });
}

async function fetchHarvardAPI({ pageParam = 1 }) {
    const limit = packageSize;
    const urlHarvard = `http://localhost:3001/artworks?_page=<span class="math-inline">\{pageParam\}&\_limit\=</span>{limit}`;
    const { data } = await redaxios.get(urlHarvard);
    const hasMore = data.length === limit;
    return { records: data, nextPage: pageParam + 1, hasMore: hasMore };
}

function App() {
    const [useGlobalFetch, setUseGlobalFetch] = useState(false);
    const { data: allArtData, isLoading, isError, error, refetch: refetchAllArt } = useAllArtData(useGlobalFetch);
    const [dailyPortrait, setDailyPortrait] = useState<Record>({} as Record);

    const {
        data: galleryData,
        isLoading: isGalleryLoading,
        isError: isGalleryError,
        error: galleryError,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        refetch: refetchGallery
    } = useInfiniteQuery({
        queryKey: ['harvardArt', subject, classificationA, classificationB, packageSize],
        queryFn: fetchHarvardAPI,
        getNextPageParam: (lastPage) => (lastPage?.hasMore ? lastPage.nextPage : undefined),
        initialPageParam: 1,
        staleTime: 15 * 60 * 60 * 1000,
        enabled: !useGlobalFetch,
    });

    const artSource = useMemo(() => {
        return useGlobalFetch ? (allArtData || []) : (galleryData?.pages?.flatMap((page) => page.records) || []);
    }, [useGlobalFetch, allArtData, galleryData]);

    const artMemo = useMemo(() => {
        return artSource;
    }, [artSource]);

    const selectRandomPortrait = useCallback(() => {
        if (artSource?.length > 0) {
            const randomIndex = Math.floor(Math.random() * artSource.length);
            setDailyPortrait(artSource[randomIndex]);
        }
    }, [artSource]);

    useEffect(() => {
        selectRandomPortrait();
        const interval = setInterval(
            () => {
                selectRandomPortrait();
            },
            15 * 60000,
        );

        return () => clearInterval(interval);
    }, [selectRandomPortrait]);

    const toggleGlobalFetch = useCallback(() => {
        setUseGlobalFetch(prev => !prev);
        if (!prev) {
            refetchAllArt();
        } else {
            refetchGallery();
        }
    }, [refetchAllArt, refetchGallery]);

    const contextValue = useContext(HarvardMuseumAPIContext);

    return (
        <HarvardMuseumAPIContext
            value={{
                dailyPortrait,
                artMemo,
                art: artSource,
                checkbox: [],
                hasNextPage: useGlobalFetch ? undefined : hasNextPage,
                isFetchingNextPage: useGlobalFetch ? false : isFetchingNextPage,
                fetchNextPage: useGlobalFetch ? undefined : fetchNextPage,
                allArtForFilters: artSource,
                isLoading: useGlobalFetch ? isLoading : isGalleryLoading,
                isError: useGlobalFetch ? isError : isGalleryError,
                error: useGlobalFetch ? error : galleryError,
            }}
        >
            <nav>
                <p>Minois</p>
                <Link to="/">Home</Link>
                <Link to="/gallery">Gallery</Link>
                <Link to="/about">About</Link>
            </nav>
            <ScrollRestoration />
            <main>
                {contextValue?.isLoading ? <p>Minute Papillon</p> : null}
                {contextValue?.isError ? <p>Flute alors ! {contextValue?.error?.message}</p> : null}
                {!contextValue?.isLoading && !contextValue?.isError && <Outlet />}
            </main>
            <footer style={{ position: 'fixed', bottom: 20, right: 20 }}>
                <button type="button" onClick={toggleGlobalFetch}>
                    {useGlobalFetch ? 'Activer Galerie Progressive' : 'Activer Vue Globale'}
                </button>
            </footer>
            <ReactQueryDevtools initialIsOpen={false} />
        </HarvardMuseumAPIContext>
    );
}

export default App;