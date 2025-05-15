import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, Outlet, ScrollRestoration } from "react-router";
import HarvardMuseumAPIContext from "../context/HavardMuseumAPIContext.tsx";
import type { Record } from "./types/HarvardType.tsx";
import "./stylesheets/normalize.css";
import "./stylesheets/App.css";
import "./stylesheets/filter.css";
import "./stylesheets/Gallery.css";
import { useInfiniteQuery } from "@tanstack/react-query";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import redaxios from "redaxios";
import ScrollToTopButton from "./components/ScrollToTopButton/ScrollToTopButton.tsx";

const subject = "portrait";
const classificationA = "Paintings";
const classificationB = "Photographs";
const packageSize = 100;

async function fetchHarvardAPI({ pageParam = 1 }) {
  const urlHarvard = `https://api.harvardartmuseums.org/object?apikey=${
    import.meta.env.VITE_REACT_APP_HARVARD_MUSEUM_API
  }&q=classification=${classificationA}&q=classification=${classificationB}&keyword=${subject}&size=${packageSize}&page=${pageParam}`;
  const { data } = await redaxios.get(urlHarvard);
  const validArt = data.records.filter(
    (record: Record) =>
      record.primaryimageurl && record.primaryimageurl.trim() !== "",
  );
  return {
    records: validArt,
    nextPage: pageParam + 1,
    hasMore: data.info.next !== null,
  };
}

function App() {
  const [dailyPortrait, setDailyPortrait] = useState<Record>({} as Record);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [
      "harvardArt",
      subject,
      classificationA,
      classificationB,
      packageSize,
    ],
    queryFn: fetchHarvardAPI,
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.nextPage : undefined,
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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    selectRandomPortrait();
    const interval = setInterval(() => {
      selectRandomPortrait();
    }, 15 * 60000);

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
      <nav className={isMobileMenuOpen ? "mobile-nav-open" : ""}>
        <p>Minois</p>
        <div className="desktop-links">
          <Link to="/">Home</Link>
          <Link to="/gallery">Gallery</Link>
          <Link to="/about">About</Link>
        </div>
        <button
          type="button"
          className="hamburger-button"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? <IoClose /> : <GiHamburgerMenu />}
        </button>

        <div className="mobile-links">
          <Link to="/" onClick={toggleMobileMenu}>
            Home
          </Link>
          <Link to="/gallery" onClick={toggleMobileMenu}>
            Gallery
          </Link>
          <Link to="/about" onClick={toggleMobileMenu}>
            About
          </Link>
        </div>
      </nav>
      <ScrollRestoration />
      <main>
        {isLoading ? <p>Minute Papillon</p> : null}
        {isError ? <p>Flute alors ! {error?.message}</p> : null}
        {!isLoading && !isError && <Outlet />}
      </main>
      <footer>
        <ScrollToTopButton />
      </footer>
    </HarvardMuseumAPIContext>
  );
}

// C'est pas un code mort, juste une mise en retrait d'un outil de dev :p
// <ReactQueryDevtools initialIsOpen={false} />

export default App;
