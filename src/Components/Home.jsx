import React, { useState, useEffect } from "react";

const Home = () => {
   const apiKey = ""; //OMDb API Key
  const [searchTerm, setSearchTerm] = useState(''); // State for search input
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [movies, setMovies] = useState([]); // State for storing fetched movies
  const [year, setYear] = useState(2022); // State for selected year for filtering

  const fetchMovies = async () => {
    if (!searchTerm.trim()) {
      alert("Please enter a search term.");
    } return;
  }
  
  const url = 'https://www.omdbapi.com/?apikey=${apiKey}&s=${searchTerm}';
  setLoading(true); // Start loading
  
    try {
      const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
      const data = await response.json();
      if (data.Response === "True") {
        setMovies(data.Search); // Set movies from fetched data
      }
      else {
        alert(data.Error);
        setMovies([]); // Clear Movies if there was an error
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false); // stop loading
      }
    };

    const displayMovies = (year) => {
      return movies.filter(movie => parseInt(movie.Year) <= year);
    };

    useEffect(() => {
      displayMovies(year); // Update displayed movies when year changes
    }, [year, movies]); // Dependency array

    return (
      <div>
        <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} // Update search term
        placeholder="Search for movies..." />
        <button onClick={fetchMovies}>Search</button>
        {loading && <p>Loading...</p>}
        <div id="results">
          {displayMovies(year).map(movie => (
            <div key={movie.imdbID}>
              <h3>{movie.Title}</h3>
              <p>Year: {movie.Year}</p>
              <img onScroll={movie.Poster} alt={movie.Title} />
        </div>
          ))}
      </div>
      <input type="range" id="yearRange" min="1900" max="2023" value={year} onChange={(e) => setYear(parseInt(e.target.value))} // Update year
      />
      <p>Selected Year: {year}</p>
      </div>
    );
  };
  
  return (
    <div>
      <section id="landing-page">
        <nav>
          <div className="burger-menu" id="burgerMenu">
            <i className="fas fa-bars"></i>
          </div>
          <figure>
            <img
              id="personal-logo"
              src="./assets/blinker-icon.png"
              alt="blinker company logo"
            />
          </figure>
          <ul className="nav__link--list" id="navLinks">
            <li className="nav__link">
              <a
                href="#"
                className="nav__link--anchor link__hover-effect link__hover-effect--black"
              >
                Home
              </a>
            </li>
            <li className="nav__link">
              <a
                href="#"
                className="nav__link--anchor link__hover-effect link__hover-effect--black"
              >
                Find Your Movie
              </a>
            </li>
            <li className="nav__link--button">
              <a
                href="#"
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
            />
            <button id="search-button" onClick={fetchMovies}>
              Search
            </button>
            <div className="movie" id="loading" style={{ display: "none" }}>
              Loading...
            </div>
            <label htmlFor="yearRange">Select Release Year Range:</label>
            <input
              type="range"
              id="yearRange"
              min="1900"
              max="2026"
              value="2026"
              // onChange=""
            />
            <span id="yearValue">2026</span>
          </div>
          <div id="results"></div>
          <div id="movieList"></div>
        </section>
      </section>
    </div>
  );
};

export default Home;
