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
      data: result.data[i].datetime,
      description: result.data[i].weather.description,
    };
  });
  console.log(lat);
  console.log(lon);
  console.log(searchQuery);
  console.log(forcast);
  console.log(result.data[0].weather.description);
  res.send(forcast);
});
//Error
weatherServer.get("*", (req, res) => {
  res.status(500).send("Page Not Found!");
});

weatherServer.listen(PORT, () => {
  console.log(`this is my ${PORT}`);
});
