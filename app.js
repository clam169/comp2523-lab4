/*
 Authors:
 Your name and student #: Jo Jo Lam
 Your Partner's Name and student #: Megan Kuo
 (Make sure you also specify on the Google Doc)
*/
const express = require("express");
const { readFile } = require('fs');

let app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");


app.get("/", (req, res) => res.render("pages/index"));

app.get("/myForm", (req, res) => res.render("pages/myForm"));

app.post("/myForm", (req, res) => {
  // Add your implementation here 
  let formData = req.body;
  let movieArray = formData.movieName.split(", ");
  res.render("pages/index", {
    movieList: movieArray
  })
});

app.get("/myListQueryString", (req, res) => {
  // Add your implementation here
  let movieSearchQuery = [];
  movieSearchQuery.push(req.query.movie1);
  movieSearchQuery.push(req.query.movie2);
  res.render("pages/index", {
    movieList: movieSearchQuery
  })
});

app.get("/search/:movieName", (req, res) => {
  // Add your implementation here
  const movieSearchParam = req.params.movieName;
  readFile("movieDescriptions.txt", "utf8", (err, data) => {
    if (err) {
      throw err;
    } 
    let index = data.split("\n").map(text=>text.toLowerCase()).findIndex(movie=>movie.includes(movieSearchParam));
    if (index>=0){
      let movieDescList = data.split("\n");
      let movieName = movieDescList[index].split(":")[0];
      let movieDesc = movieDescList[index].split(":")[1];
      res.render("pages/searchResult", { movieName, movieDesc, index });
    } else {
      res.render("pages/searchResult", { index });
    }
  })
});

app.listen(3000, () => {
  console.log("Server is running on port 3000 🚀");
});