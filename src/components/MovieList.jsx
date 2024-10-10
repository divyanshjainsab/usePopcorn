import MovieInfo from "./MovieInfo.jsx";
import IsLoading from "./IsLoading.jsx";
export default function MovieList({ movies, isLoading = false, error , setId, selectedId}) {
  return (
    <>
      <ul className="list list-movies ">
        {movies?.map((movie) => (
          <MovieInfo key={movie.imdbID} movie={movie} setId={setId} selectedId = {selectedId}/>
        ))}
      </ul>
      {error && (
        <div
          style={{
            textAlign: "center",
            fontSize: "24px",
            marginTop: "20%",
          }}
        >
          <span>🛑</span>
          {error}
        </div>
      )}
      <IsLoading isLoading = {isLoading}/>
    </>
  );
}
