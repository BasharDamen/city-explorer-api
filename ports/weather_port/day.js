let forcastArray = [];
function Forcast(day) {
  this.description = `Low of ${day.low_temp}, high of ${day.max_temp} with ${day.weather.description}`;
  this.date = day.datetime;
  forcastArray.push(this);
}

module.exports = Forcast