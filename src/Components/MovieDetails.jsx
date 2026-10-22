import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useParams } from "react-router";
import Rating from "./Rating";
// import Price from "../components/ui/Price";
// import Book from "../components/ui/Book";
import Movie from "../Components/Movie";

const apiKey = "92a7848e";

const MovieDetails = ({ movies, cart = [], addToCart }) => {
  const [movie, setData] = useState({});
  const { id } = useParams();

  const fetchMovieData = async () => {
    const res = await fetch(
      `https://www.omdbapi.com/?apikey=${apiKey}&i=${id}`,
    );
    const data = await res.json();
    setData(data);
  };

  useEffect(() => {
    fetchMovieData();
  }, []);

  function addMovieToCart(movie) {
    addToCart(movie);
  }

  function movieExistsOnCart() {
    return cart.find((movie) => movie.id === +id);
  }

  return (
    <div id="movies__body">
      <main id="movies__main">
        <div className="movies__container">
          <div className="row">
            <div className="movie__selected--top">
              <Link to="" className="movie__link">
                <FontAwesomeIcon icon="arrow-left" />
              </Link>
              <Link to="" className="movie__link">
                <h2 className="movie__selected--title--top">Movies</h2>
              </Link>
            </div>
            <div className="movie__selected">
              <figure className="movie__selected--figure">
                <img
                  src={movie.Poster}
                  alt=""
                  className="movie__selected--img"
                />
              </figure>
              <div className="movie__selected--description">
                <h2 className="movie__selected--title">{movie.title}</h2>
                {/* <Rating rating={movie.rating} />  */}
                <div className="movie__selected--price">
                  {/* <Price
                      originalPrice={movie.originalPrice}
                      salePrice={movie.salePrice}
                    />  */}
                </div>
                <div className="movie__summary">
                  <h3 className="movie__summary--title">{movie.Title}</h3>
                  {movie.imdbRating && movie.imdbRating !== "N/A" && (
                    <Rating rating={Number(movie.imdbRating) / 2} />
                  )}
                  <p className="movie__summary--para">{movie.Plot}</p>
                  <p className="movie__summary--para">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Sapiente id voluptatum eaque dolore commodi explicabo
                    officiis incidunt ipsam qui sunt ullam, ab eveniet neque
                    numquam. Aperiam blanditiis voluptatem ullam architecto!
                  </p>
                </div>
                {movieExistsOnCart() ? (
                  <Link to={"/cart"} className="movie__link">
                    <button className="btn">Checkout</button>
                  </Link>
                ) : (
                  <button className="btn" onClick={() => addMovieToCart(movie)}>
                    Add to cart
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="movies__container">
          <div className="row">
            <div className="movie__selected--top">
              <h2 className="movie__selected--title--top">
                Recommended Movies
              </h2>
            </div>
            <div className="movies">
              {/* {movies
                .filter((movie) => movie.rating === 5 && +movie.id !== +id)
                .slice(0, 4)
                .map((movie) => (
                  <Movie movie={movie} key={movie.id} />
                ))} */}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
export default MovieDetails;
