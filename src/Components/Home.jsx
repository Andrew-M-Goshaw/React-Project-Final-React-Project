import React, { useState } from "react";
import personalLogo from "../assets/personal-logo.svg";
import { Link } from "react-router";

const Home = () => {
  // Your OMDb API key
  const apiKey = "92a7848e";

  // Stores whatever the user types into the search box
  const [searchTerm, setSearchTerm] = useState("");

  // Tracks whether the API request is loading
  const [loading, setLoading] = useState(false);

  // Stores the movies returned by the API
  const [movies, setMovies] = useState([]);

  // Stores the selected year from the slider
  const [year, setYear] = useState(2026);

  // Stores any API error messages
  const [error, setError] = useState("");

  // Fetch movies from the OMDb API
  const fetchMovies = async () => {
    if (!searchTerm.trim()) {
      setError("Please enter a movie title.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(searchTerm)}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Network response was not OK");
      }

      const data = await response.json();

      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setMovies([]);
        setError(data.Error || "No movies found.");
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
      setMovies([]);
      setError("Something went wrong while fetching movies.");
    } finally {
      setLoading(false);
    }
  };

  // Only display movies released on or before selected year
  const filteredMovies = movies.filter((movie) => {
    return Number(movie.Year) <= year;
  });

  return (
    <div>
      <section id="landing-page">
        <nav>
          <div className="burger-menu" id="burgerMenu">
            <i className="fas fa-bars"></i>
          </div>

          <figure>
            <img id="personal-logo" src={personalLogo} alt="Company logo" />
          </figure>

          <ul className="nav__link--list" id="navLinks">
            <li className="nav__link">
              <a
                href="#landing-page"
                className="nav__link--anchor link__hover-effect link__hover-effect--black"
              >
                Home
              </a>
            </li>

            <li className="nav__link">
              <a
                href="#search-section"
                className="nav__link--anchor link__hover-effect link__hover-effect--black"
              >
                Find Your Movie
              </a>
            </li>

            <li className="nav__link--button">
              <a
                href="mailto:contact@example.com"
                className="nav__link--anchor link__hover-effect link__hover-effect--black"
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>

        <section>
          <h1>Welcome to Our Movie Finder</h1>
          <h2>Discover the perfect movie for your needs!</h2>
        </section>

        <section id="search-section">
          <div className="search-container">
            <input
              type="text"
              id="search-input"
              placeholder="Search for movies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  fetchMovies();
                }
              }}
            />

            <button id="search-button" onClick={fetchMovies} disabled={loading}>
              Search
            </button>

            <label htmlFor="yearRange">Select Release Year Range:</label>

            <input
              type="range"
              id="yearRange"
              min="1900"
              max="2026"
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
            />

            <span id="yearValue">{year}</span>
          </div>

          {loading && (
            <div className="movie" id="loading">
              Loading movies...
            </div>
          )}

          {error && <p className="error">{error}</p>}

          <div id="results">
            {!loading &&
              filteredMovies.map((movie) => (
                <Link to={`/movie/${movie.imdbID}`} className="movie" key={movie.imdbID}>
                  {movie.Poster !== "N/A" && (
                    <img src={movie.Poster} alt={movie.Title} />
                  )}

                  <h3>{movie.Title}</h3>
                  <p>Year: {movie.Year}</p>
                </Link>
              ))}
          </div>
        </section>
      </section>
    </div>
  );
};

export default Home;
