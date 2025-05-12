import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, Outlet } from "react-router";
import HarvardMuseumAPIContext from "../context/HavardMuseumAPIContext.tsx";
import type { Record } from "./types/HarvardType.tsx";
import "./stylesheets/normalize.css";
import "./stylesheets/App.css";
import "./stylesheets/filter.css";
import { useQuery } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import redaxios from "redaxios";

const subject = "portrait";
const classificationA = "Paintings";
const classificationB = "Photographs";
const packageSize = 100;
const page = 1;

async function fetchHarvardAPI() {
  const urlHarvard = `https://api.harvardartmuseums.org/object?apikey=${import.meta.env.VITE_REACT_APP_HARVARD_MUSEUM_API}&q=classification=${classificationA}&q=classification=${classificationB}&keyword=${subject}&size=${packageSize}&page=${page}`;
  const { data } = await redaxios.get(urlHarvard);
  const validArt = data.records.filter((record: Record) => record.primaryimageurl);
  return { ...data, records: validArt };
}

function App() {
  const [dailyPortrait, setDailyPortrait] = useState<Record>({} as Record);

  const { isLoading: isArtLoading, isError: isArtError, data: artHarvardData, error: artError} = useQuery({
    queryKey: ['harvardArt', subject, classificationA, classificationB, packageSize, page],
    queryFn: fetchHarvardAPI,
    staleTime: 15 * 60 * 1000,
  });

  const art = artHarvardData?.records || [];
  const info = artHarvardData?.info;

  console.log(info);

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
          }}
      >
        <nav>
          <p>Minois</p>
          <Link to="/">Home</Link>
          <Link to="/Gallery">Gallery</Link>
          <Link to="/About">About</Link>
        </nav>
        <main>
          {isArtLoading ? <p>Minute Papillon</p> : null}
          {isArtError ? <p>Flute alors ! {artError?.message}</p> : null}
          {!isArtLoading && !isArtError && <Outlet />}
        </main>
        <ReactQueryDevtools initialIsOpen={false} />
      </HarvardMuseumAPIContext>
  );
}

export default App;