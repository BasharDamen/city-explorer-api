const { default: axios } = require("axios");
require("dotenv").config();

let movies = require('./movie')
function generateMovisData(req, res) {
  let query = req.query.origin_country;
  let movieURL = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${query}`;

  axios
    .get(movieURL)
    .then((result) => {
      let newMovie = result.data.results.map((item, i) => {
        return new movies(item);
      });
      res.send(newMovie);
    })
    .catch((err) => console.log(err));
}




module.exports = generateMovisData;


/*-----------------------------old one-------------------------------------------*/
//   server.get("/movie", (req, res) => {
//     let query = req.query.origin_country;
//     let movieURL = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${query}`;

//     axios
//     .get(movieURL)
//     .then((result) => {
//       let newMovie = result.data.results.map((item,i)=>{
//         return new Movie(item)
//       })
//       res.send(newMovie)
//     })
//     .catch((err) => console.log(err));
//   });
//   let movieArray = [];
//   function Movie(item) {
//     this.title = item.original_title;
//     this.overview = item.overview;
//     this.avgVotes = item.vote_average;
//     this.imageURL = `https://image.tmdb.org/t/p/w500${item.poster_path}`;
//     this.popularity = item.popularity;
//     this.released = item.release_date;
//     movieArray.push(this)
//   }
