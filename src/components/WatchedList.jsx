import MovieRating from "./MovieRating.jsx";
import WatchedSummary from "./WatchedSummary.jsx";
export default function WatchedList({ watched, setWatched }) {
  return (
    <>
      <WatchedSummary watched={watched} />
      <ul className="list">
        {watched?.map((movie) => (
          <MovieRating
            key={movie.imdbID}
            movie={movie}
            watched = {watched}
            setWatched={setWatched}
          />
        ))}
      </ul>
    </>
  );
}
