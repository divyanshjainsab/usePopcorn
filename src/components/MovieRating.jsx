export default function MovieRating ({movie, setWatched,watched}){
    return <li key={movie.imdbID}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.Runtime}</span>
        </p>
        <button value={movie.imdbID} style={{background : 'transparent', border : 'none' , fontSize : '20px'}} onClick={
          (e) => setWatched(watched.filter(m => m.imdbID !== e.target.value))
          }>❌</button>
      </div>
    </li>;
}