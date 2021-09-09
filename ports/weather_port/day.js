let forcastArray = [];
function Forcast(item) {
  this.description = `Low of ${item.low_temp}, high of ${item.max_temp} with ${item.weather.description}`;
  this.date = item.datetime;
  forcastArray.push(this);
}

module.exports = Forcast