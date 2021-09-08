"use strict";

require("dotenv").config();
const express = require("express");
const weatherServer = express();
const cors = require("cors");
const axios = require("axios");

weatherServer.use(cors());

const PORT = process.env.PORT;

// http://localhost:3010/weather?city_name=''
weatherServer.get("/", (req, res) => {
  res.send("You Are Welcome");
});
/*----------------------------------------------------------------------------------------------------*/
// https://api.weatherbit.io/v2.0/forecast/daily?city=Raleigh,NC&key=API_KEY
// http://localhost:3010/weather?city_name=''
weatherServer.get("/weather", (req, res) => {
  let query = req.query.city_name;

  let weatherURL = `https://api.weatherbit.io/v2.0/forecast/daily?city=${query}&key=${process.env.WEATHER_API_KEY}`;

  axios
    .get(weatherURL)
    .then((result) => {
      let newForcast = result.data.data.map((item, i) => {
        return new Forcast(item);
      });
      res.send(newForcast);
    })
    .catch((err) => console.log(err));
});
let forcastArray = [];
function Forcast(item) {
  this.description = `Low of ${item.low_temp}, high of ${item.max_temp} with ${item.weather.description}`;
  this.date = item.datetime;
  forcastArray.push(this);
}
/*----------------------------------------------------------------------------------------------------*/
// https://api.themoviedb.org/3/movie/157336?api_key={api_key}
// http://localhost:3010/movie?origin_country=""
weatherServer.get("/movie", (req, res) => {
  let query = req.query.origin_country;
  let movieURL = `https://api.themoviedb.org/3/search/multi?api_key=${process.env.MOVIE_API_KEY}&query=${query}`;
  
  axios
  .get(movieURL)
  .then((result) => {
    // console.log(result.data.results);
    let newMovie = result.data.results.map((item,i)=>{
      return new Movie(item)
    })
    res.send(newMovie)
  })
  .catch((err) => console.log(err));
});
let movieArray = [];
function Movie(item) {
  this.title = item.original_title;
  this.overview = item.overview;
  this.avgVotes = item.vote_average;
  this.imageURL = `https://image.tmdb.org/t/p/w500${item.poster_path}`;
  this.popularity = item.popularity;
  this.released = item.release_date;
  movieArray.push(this)
}
//Error
weatherServer.get("*", (req, res) => {
  res.status(500).send("Page Not Found!");
});

weatherServer.listen(PORT, () => {
  console.log(`this is my ${PORT}`);
});
