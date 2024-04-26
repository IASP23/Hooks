import { useCallback, useMemo, useRef, useState } from "react";
import { searchMovies } from "../services/searchMovies";

export function useMovies({ search, sort }) {
  const [movies, setMovies] = useState([]);
  const previousSearch = useRef(search);

  const getMovies = useCallback(async () => {
    console.log("Render Get Movies");
    try {
      if (previousSearch.current === search) return;

      previousSearch.current = search;
      const newMovies = await searchMovies({ search });
      setMovies(newMovies);
    } catch (error) {
      throw Error(error);
    }
  }, [search]);

  const sortedMovies = useMemo(() => {
    return sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies;
  }, [sort, movies]);
  return { movies: sortedMovies, getMovies };
}
