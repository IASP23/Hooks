const renderMovies = ({ movies }) => {
  return (
    <ul className="movies">
      {movies.map((movie) => (
        <li className="movie" key={movie.id}>
          <h1>{movie.title}</h1>
          <img src={movie.poster} alt={movie.title} />
          <p>{movie.year}</p>
        </li>
      ))}
    </ul>
  );
};

const renderNoResults = () => {
  return <p>Sin resultados para esta busqueda</p>;
};

export function Movies({ movies }) {
  const hasMovie = movies?.length > 0;
  return hasMovie ? renderMovies({ movies }) : renderNoResults();
}
