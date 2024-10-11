import Star from "../assets/Star.jsx";
import { useState } from "react";
export default function StarRating({
  maxRating = 5,
  watched,
  setWatched,
  movie,
  handleCloseMovie,
}) {
  const [userRating, setUserRating] = useState(0);
  return (
    <div style={{ padding : '5px 10px', backgroundColor : 'green', borderRadius : '20px'}}>
    <span style={{ display: "flex", gap: "5px" }}>
      {Array.from({ length: maxRating }, (_, i) => (
        <Star
          key={i}
          isFilled={userRating >= i + 1}
          color="rgba(0,255,255,1)"
          size={48}
          handler={() => setUserRating(() => i + 1)}
        />
      ))}
      {userRating}
      
    </span>
    {userRating ? (
        <center>
          <button
            style={btnStyle}
            onClick={() => {
              movie.userRating = userRating;
              setWatched([...watched, movie]);
              handleCloseMovie();
            }}
          >
            Add to Watch List
          </button>
        </center>
      ) : ''}
      </div>
  );
}

const btnStyle = {
  padding: "10px",
  marginBottom: "1rem",
  borderRadius: "15px",
  backgroundColor: "#000",
  color: "#FFF",
  border: "2px solid red",
};
