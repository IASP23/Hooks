import { useCallback, useEffect, useState } from "react";
import "./App.css";

import { Movies } from "./components/movies";
import { useMovies } from "./hooks/useMovies";
import dobounce from "just-debounce-it";
import debounce from "just-debounce-it";

function useSearchMovie() {
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (search === "") {
      setError("Por favor realize la busqueda de una pelicula");
      return;
    }

    if (search.match(/^\d+$/)) {
      setError("No se puede buscar una película con un número");
      return;
    }

    if (search.length < 3) {
      setError("La búsqueda debe tener al menos 3 caracteres");
      return;
    }

    setError(null);
  }, [search]);

  return { search, error, setSearch };
}

function App() {
  const { search, error, setSearch } = useSearchMovie();
  const [sort, setSort] = useState(false);

  const { movies, getMovies } = useMovies({ search, sort });

  const debounceGetMovies = useCallback(
    debounce((search) => {
      getMovies({ search });
    }, 300),
    [getMovies]
  );
  const handleSubmit = (event) => {
    event.preventDefault();
    getMovies();
  };

  const handleChange = (event) => {
    const newSearch = event.target.value;
    setSearch(newSearch);
    debounceGetMovies();
  };

  const handleSort = () => {
    setSort(!sort);
  };

  return (
    <div className="page">
      <header>
        <h1>Pelis</h1>
        <form action="" onSubmit={handleSubmit}>
          <label htmlFor="movie">
            Pelicula :
            <input
              onChange={handleChange}
              value={search}
              type="text"
              placeholder="Avengers"
            />
            <input type="checkbox" onChange={handleSort} checked={sort} />
            {error && <p style={{ color: "red" }}>{error}</p>}
          </label>

          <button type="submit">Enviar</button>
        </form>
      </header>

      <main>
        <Movies movies={movies} />
      </main>
    </div>
  );
}

export default App;
