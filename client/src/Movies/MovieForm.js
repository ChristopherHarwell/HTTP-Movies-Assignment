import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";

const initialMovie = {
  id: "",
  title: "",
  director: "",
  metascore: "",
  stars: [],
};

function MovieForm(props) {
  const { push } = useHistory();
  const { id } = useParams();
  const [movie, setMovie] = useState(initialMovie);

  useEffect(() => {
    axios
        .get(`http://localhost:5000/api/movies/${id}`)
        .then((response) => {
            setMovie(response.data)
        })
        .catch(error => console.log("GET Request Error: ", error));
  }, [id]);

  function changeHandler(event) {
    event.persist();
    let value = event.target.value;

    setMovie({
      ...movie,
      [event.target.name]: value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    axios
        .put(`http://localhost:5000/api/movies/${id}`, movie)
        .then(response => {
            props.setMovie(response.data);
            push(`/movies/${id}`);
        })
        .catch(error => console.log("PUT Request Error: ", error))
  }

  return (
    <div>
      <h2>Edit Movie</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={changeHandler}
          placeholder="title"
          value={movie.title}
        />

        <input
          type="text"
          name="director"
          onChange={changeHandler}
          placeholder="director"
          value={movie.director}
        />

        <input
          type="number"
          name="metascore"
          onChange={changeHandler}
          placeholder="metascore"
          value={movie.metascore}
        />

        <input
          type="text"
          name="stars"
          onChange={changeHandler}
          placeholder="stars"
          value={movie.stars}
        />

        <button>Edit</button>
      </form>
    </div>
  );
};

export default MovieForm;
