const { default: axios } = require("axios");
require("dotenv").config();
let forcast = require('./day');
let forcastMemory = {};

function generateWeatherData(req, res) {
  let query = req.query.city_name;

  let weatherURL = `https://api.weatherbit.io/v2.0/forecast/daily?city=${query}&key=${process.env.WEATHER_API_KEY}`;

  if(forcastMemory[query] !== undefined){
    res.send(forcastMemory[query])
  }else{

    axios
      .get(weatherURL)
      .then((result) => {
        const newDay = result.data.data.map((item, i) => {
          return new forcast(item);
        });
        forcastMemory[query] = newDay
        res.send(newDay);
      })
      .catch((err) => console.log(err));
  }
  }

module.exports = generateWeatherData;

/*-----------------------------old one-------------------------------------------*/
// server.get("/weather", (req, res) => {
//   let query = req.query.city_name;

//   let weatherURL = `https://api.weatherbit.io/v2.0/forecast/daily?city=${query}&key=${process.env.WEATHER_API_KEY}`;

//   axios
//     .get(weatherURL)
//     .then((result) => {
//       let newForcast = result.data.data.map((item, i) => {
//         return new Forcast(item);
//       });
//       res.send(newForcast);
//     })
//     .catch((err) => console.log(err));
// });
// let forcastArray = [];
// function Forcast(item) {
//     this.description = `Low of ${item.low_temp}, high of ${item.max_temp} with ${item.weather.description}`;
//     this.date = item.datetime;
//     forcastArray.push(this);
// }
