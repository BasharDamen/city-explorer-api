"use strict";

require("dotenv").config();
const express = require("express");
const server = express();
const cors = require("cors");
const axios = require("axios");

server.use(cors());

const PORT = process.env.PORT;

/*-----------------------------------------*/
// http://localhost:3010/weather?city_name=''
server.get("/", (req, res) => {
  res.send("You Are Welcome");
});


/*-------------------------------------------------------------------------*/
// https://api.weatherbit.io/v2.0/forecast/daily?city=Raleigh,NC&key=API_KEY
// http://localhost:3010/weather?city_name=''
let weatherPort = require('./ports/weather_port/weather');
server.get("/weather", weatherPort)



/*------------------------------------ ----------------------*/
// https://api.themoviedb.org/3/movie/157336?api_key={api_key}
// http://localhost:3010/movie?origin_country=""
let moviesPort = require('./ports/movies_port/movies')
server.get("/movie", moviesPort)


/*---------------------------------------*/
//Error
server.get("*", (req, res) => {
  res.status(500).send("Page Not Found!");
});

server.listen(PORT, () => {
  console.log(`this is my ${PORT}`);
});
