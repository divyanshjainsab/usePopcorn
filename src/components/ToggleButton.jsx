export default function ToggleButton({ toSet, setter }) {
  return (
    <button className="btn-toggle" onClick={() => setter((open) => !open)}>
      {toSet ? "–" : "+"}
    </button>
  );
}
