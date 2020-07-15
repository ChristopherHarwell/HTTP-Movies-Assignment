import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import MovieCard from "./MovieCard";

function MovieList() {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/movies")
      .then((response) => {
        setMovies(response.data);
      })
      .catch((err) => console.log(err.response));
  }, []);
  return (
    <div className="movie-list">
      {
        movies.map(movie => (
          <Link key={movie.id} to={`/movies/${movie.id}`}>
            <MovieCard movie={movie} />
          </Link>
        ))
      }
    </div>
  );
}

export default MovieList;
