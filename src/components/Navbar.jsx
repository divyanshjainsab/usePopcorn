
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

export const SearchBar = ({query,setQuery}) => {
  return (
    <>
      <input
        className="search"
        type="text"
        placeholder="Search movies..."
        value = {query}
        onChange={(e) => setQuery(() => e.target.value)}
      />
    </>
  );
};

export const NumResults = ({ movies }) => (
  <p className="num-results">
    Found <strong>{movies?.length}</strong> results
  </p>
);
