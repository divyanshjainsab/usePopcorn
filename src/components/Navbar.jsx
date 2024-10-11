import { useRef, useEffect } from "react";
import { useEvent } from "../CustomHooks";
export default function Navbar({ children }) {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
}

export const Logo = () => (
  <div className="logo">
    <span role="img">🍿</span>
    <h1>usePopcorn</h1>
  </div>
);

export const SearchBar = ({ query, setQuery }) => {
  const inputEl = useRef(null);
  useEvent("Enter", function () {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
    setQuery("");
  });
  return (
    <>
      <input
        className="search"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(() => e.target.value)}
        ref={inputEl}
      />
    </>
  );
};

export const NumResults = ({ movies }) => (
  <p className="num-results">
    Found <strong>{movies?.length}</strong> results
  </p>
);
