import Star from "../assets/Star.jsx";
export default function StarRating({ maxRating = 5, rating}) {
  return (
    <span style={{ display: "flex", gap: "5px" }}>
      {Array.from({ length: maxRating }, (_, i) => (
        <Star
          key={i}
          isFilled={rating >= i + 1}
          color="rgba(0,255,255,1)"
          size={48}
        />
      ))}
      {rating}
    </span>
  );
}
