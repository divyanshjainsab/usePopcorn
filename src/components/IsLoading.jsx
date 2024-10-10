export default function IsLoading({ isLoading }) {
  return (
    isLoading && (
      <div
        style={{
          textAlign: "center",
          fontSize: "24px",
          marginTop: "40%",
        }}
      >
        Loading...
      </div>
    )
  );
}
