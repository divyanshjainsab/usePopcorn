import { useState, useEffect } from "react";
import Navbar from "./components/Navbar.jsx";
import Main from "./components/Main.jsx";
import StarRating from "./components/StarRating.jsx";
import InfoBox from "./components/InfoBox.jsx";
import { useEvent } from "./CustomHooks.js";
// import { tempMovieData, tempWatchedData } from "./components/Data.jsx";
import { SearchBar, NumResults } from "./components/Navbar.jsx";
import MovieList from "./components/MovieList.jsx";
import WatchedList from "./components/WatchedList.jsx";
import IsLoading from "./components/IsLoading.jsx";
const key = "1fc476f8";
// import TextExpander from "./TextExpander";
// const text =
//   "Space travel is the ultimate adventure! Imagine soaring past the stars and exploring new worlds. It's the stuff of dreams and science fiction,but believe it or not, space travel is a real thing. Humans and robots are constantly venturing out into the cosmos to uncover its secrets and push the boundaries of what's possible.";
export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedId, setId] = useState("");

  function handleCloseMovie() {
    setId(null);
  }

  useEffect(
    function () {
      const controller = new AbortController();
      async function fetchMovies() {
        try {
          setLoading(() => true);
          setError("");
          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${key}&s=${query}`,
            { signal: controller.signal }
          );

          if (!res.ok)
            throw new Error("Something went wrong while fetching Movies.");
          const data = await res.json();
          if (data.Response === "False") {
            setMovies(() => []);
            throw new Error("Movie not Found");
          }
          setMovies(() => data.Search);
          setError("");
        } catch (err) {
          if (err.name !== "AbortError") setError(() => err.message);
          setLoading(true);
        } finally {
          setLoading(false);
        }
      }

      if (query.length < 3) {
        setError("");
        setMovies([]);
        return;
      }
      handleCloseMovie();
      fetchMovies();
      return () => controller.abort();
    },
    [query]
  );

  function ShowMovieDetail({ selectedId }) {
    const [movie, setMovie] = useState({});
    const {
      Title: title,
      Poster: poster,
      Runtime: runtime,
      Released: released,
      Genre: genre,
      imdbRating,
      Plot: plot,
      Actors: actors,
      Director: director,
    } = movie;

    useEvent("Escape", handleCloseMovie);

    useEffect(
      function () {
        async function getData() {
          try {
            const res = await fetch(
              `https://www.omdbapi.com/?apikey=${key}&i=${selectedId}`
            );
            const data = await res.json();
            setMovie(() => data);
          } catch (err) {
            setLoading(true);
            setError(() => err.message);
          } finally {
            setLoading(false);
          }
        }
        getData();
      },
      [selectedId]
    );

    useEffect(
      function () {
        if (!title) return;
        document.title = `Movie | ${title}`;

        return () => (document.title = "usePopcorn");
      },
      [title]
    );

    return (
      <div className="details">
        <header>
          <button className="btn-back" onClick={handleCloseMovie}>
            &larr;
          </button>
          <img src={poster} alt={`Poster of Movie : ${title}`} />
          <div className="details-overview">
            <h2>
              {title} &bull; {runtime}
            </h2>
            <p>{released}</p>
            <p>{genre}</p>
            <p>
              <span>⭐️</span>
              {imdbRating}
            </p>
          </div>
        </header>

        <section style={{ marginTop: "0px" }}>
          <p>
            <StarRating
              key={selectedId}
              maxRating={10}
              handleCloseMovie={handleCloseMovie}
              watched={watched}
              setWatched={setWatched}
              movie={movie}
            />
            <em> {plot}</em>
          </p>
          <p>
            Starring
            {actors}
          </p>
          <p>Directed by {director}</p>
        </section>
      </div>
    );
  }

  return (
    <>
      <Navbar>
        <NumResults movies={movies} />
        <SearchBar query={query} setQuery={setQuery} />
      </Navbar>
      <Main>
        <InfoBox>
          <MovieList
            movies={movies}
            isLoading={isLoading}
            error={error}
            setId={setId}
            selectedId={selectedId}
          />
        </InfoBox>
        <InfoBox>
          {selectedId ? (
            isLoading ? (
              <IsLoading isLoading={isLoading} />
            ) : (
              <ShowMovieDetail
                selectedId={selectedId}
                setId={setId}
                onCloseMovie={handleCloseMovie}
              />
            )
          ) : (
            <WatchedList setWatched = {setWatched} watched={watched} />
          )}
        </InfoBox>
      </Main>
      {/* <TextExpander
        wordCount={10}
        isCollapsed={true}
        linkStyle={{
          color: "yellow",
          textDecoration: "none",
        }}
      >
        {text}
      </TextExpander>
      <TextExpander
        wordCount={20}
        isCollapsed={true}
        linkStyle={{
          color: "yellow",
          textDecoration: "none",
        }}
        showText="Show Text"
        hideText="Collapse text"
      >
        {text}
      </TextExpander>
      <TextExpander
        wordCount={10}
        isCollapsed={false}
        linkStyle={{
          color: "yellow",
          textDecoration: "none",
        }}
      >
        {text}
      </TextExpander> */}
    </>
  );
}
