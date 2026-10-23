import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router";


const Movie = ({ movie }) => {
  const [img, setImg] = useState();

  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;

    const image = new Image();
    image.src = movie.url;

    image.onload = () => {
      setTimeout(() => {
        if (mountedRef.current) {
          setImg(image);
        }
      }, 300);
    };

    return () => {
      // When the component unmounts
      mountedRef.current = false;
    };
  }, [movie.url]);

  return (
    <div className="movie">
      {img ? (
        <>
          <Link to={`/movie/${movie.imdbID}`}>
            <figure className="movie__img--wrapper">
              <img src={img.src} alt="" className="movie__img" />
            </figure>
          </Link>
          <div className="movie__title">
            <Link to={`/movie/${movie.imdbID}`} className="movie__title--link">
              {movie.title}
            </Link>
          </div>
          {/* <Rating rating={movie.rating} /> */}
          {/* <Price
            salePrice={movie.salePrice}
            originalPrice={movie.originalPrice}
          /> */}
        </>
      ) : (
        <>
          {" "}
          <div className="movie__img--skeleton"></div>
          <div className="movie__title--skeleton"></div>
          <div className="movie__rating--skeleton"></div>
          <div className="movie__price--skeleton"></div>
        </>
      )}
    </div>
  );
};

export default Movie;
