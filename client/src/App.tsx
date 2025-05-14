import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, Outlet, ScrollRestoration } from "react-router";
import HarvardMuseumAPIContext from "../context/HavardMuseumAPIContext.tsx";
import type { Record } from "./types/HarvardType.tsx";
import "./stylesheets/normalize.css";
import "./stylesheets/App.css";
import "./stylesheets/filter.css";
import { useInfiniteQuery } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import redaxios from "redaxios";

const subject = "portrait";
const classificationA = "Paintings";
const classificationB = "Photographs";
const packageSize = 100;

async function fetchHarvardAPI({ pageParam = 1 }) {
  const urlHarvard = `https://api.harvardartmuseums.org/object?apikey=${import.meta.env.VITE_REACT_APP_HARVARD_MUSEUM_API}&q=classification=${classificationA}&q=classification=${classificationB}&keyword=${subject}&size=${packageSize}&page=${pageParam}`;
  const { data } = await redaxios.get(urlHarvard);
    const validArt = data.records.filter((record: Record) => record.primaryimageurl && record.primaryimageurl.trim() !== "");
  return { records: validArt, nextPage: pageParam + 1, hasMore: data.info.next !== null };
}

function App() {
  const [dailyPortrait, setDailyPortrait] = useState<Record>({} as Record);

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useInfiniteQuery({
    queryKey: ['harvardArt', subject, classificationA, classificationB, packageSize],
    queryFn: fetchHarvardAPI,
    getNextPageParam: (lastPage) => (lastPage.hasMore ? lastPage.nextPage : undefined),
    initialPageParam: 1,
    staleTime: 15 * 60 * 1000,
  });

  const art = data?.pages.flatMap((page) => page.records) || [];

  const artMemo = useMemo(() => {
    return art;
  }, [art]);

  const selectRandomPortrait = useCallback(() => {
    if (art?.length > 0) {
      const randomIndex = Math.floor(Math.random() * art.length);
      setDailyPortrait(art[randomIndex]);
    }
  }, [art]);

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

    return (
        <HarvardMuseumAPIContext
            value={{
                dailyPortrait,
                artMemo,
                art,
                checkbox: [],
                hasNextPage,
                isFetchingNextPage,
                fetchNextPage,
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
                {isLoading ? <p>Minute Papillon</p> : null}
                {isError ? <p>Flute alors ! {error?.message}</p> : null}
                {!isLoading && !isError && <Outlet />}
            </main>
            <ReactQueryDevtools initialIsOpen={false} />
        </HarvardMuseumAPIContext>
    );
}

export default App;