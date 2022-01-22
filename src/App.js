import "./App.css";
import React, { useState, useEffect } from 'react';
import {Routes, Route, Link } from "react-router-dom";
import AddMovieForm from "./AddMovieForm";
import MovieReviews from "./MovieReviews";

export default function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch('./movies.json')
      .then((response) => response.json())
      .then(setMovies)
  }, []);

  const removeMovie = poster => {
    const newMovies = movies.filter(movie => movie.poster !== poster);
    setMovies(newMovies);
  }

  const AddMovie = (movieTitle, date, actors, ratings, poster) => {
    const newMovies = [
        ...movies,
        {
            movieTitle,
            date,
            actors,
            ratings,
            poster
        }   
    ];
    setMovies(newMovies)   
  }
  
  return (
    <>
      <div className='App'>
        <nav>
            <Link to="/"><img src="./static/house.png" alt="Picture of a house for the HOME link" style={{width: 35, height: 35}}/></Link>
            <Link to="/AddMovie"> Add Movies </Link>
        </nav>
        <Routes>
          <Route path="*" element={<MovieReviews movies={movies} onRemoveMovie={removeMovie}/>} />
          <Route path="/AddMovie" element={<AddMovieForm onNewMovie={AddMovie} />} />
        </Routes>
      </div>
    </>   
  );
}