let movieArray = [];
function Movie(item) {
  this.title = item.original_title;
  this.overview = item.overview;
  this.avgVotes = item.vote_average;
  this.imageURL = `https://image.tmdb.org/t/p/w500${item.poster_path}`;
  this.popularity = item.popularity;
  this.released = item.release_date;
  movieArray.push(this);
}



module.exports = Movie