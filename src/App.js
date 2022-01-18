import "./App.css";
import { useState, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import {  MovieReviews, AddMovie } from "./pages";

function App() {
    
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch('./movies.json')
      .then((response) => response.json())
      .then(setMovies)
  }, []);
  
  return (
    <div className='App'>
      <Routes>
        <Route path="/" element={<MovieReviews movies={movies} setMovies={setMovies} />}/>
        <Route path="/AddMovie" element={<AddMovie movies={movies} setMovies={setMovies} />}/>
      </Routes>
      {movies.map( (movie, i) => { return <Movie key={i} info={movie}></Movie>}) }
    </div>
  );
}

function Movie(props) {
  return (
    <>
      <h2>{props.info.name}</h2>
      <img className="poster" src={"./static/" + props.info.poster} alt={"Movie poster for " + props.info.name}/><br/>
      <i>Release Date: {props.info.date}</i><br/>
      <p>Starring: </p> 
      {props.info.actors.map( (actor, j) => { return <p key={j}>{actor}</p>}) }
      <p>Ratings: {props.info.ratings}<b className="star">★</b></p>
    </>
  );
}

export default App;
