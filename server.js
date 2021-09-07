"use strict";

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const weatherData = require("./data/weather.json");

const weatherServer = express();

weatherServer.use(cors());

const PORT = process.env.PORT;

// http://localhost:3010/weather?lat=''&lon=''&searchQuery=''
weatherServer.get("/weather", (req, res) => {
  const lat = req.query.lat;
  const lon = req.query.lon;
  const searchQuery = req.query.searchQuery;
  const result = weatherData.find((item) => {
    if (item.city_name === searchQuery || item.lat === lat || item.lon === lon){return item};
  });

  let forcast = [];
  forcast = result.data.map((item, i) => {
    return {
      date: result.data[i].datetime,
      description: `Low of ${result.data[i].low_temp}, high of ${result.data[i].high_temp} with ${result.data[i].weather.description}`,
    };
  });
  
  res.send(forcast);
});
//Error
weatherServer.get("*", (req, res) => {
  res.status(500).send("Page Not Found!");
});

weatherServer.listen(PORT, () => {
  console.log(`this is my ${PORT}`);
});
