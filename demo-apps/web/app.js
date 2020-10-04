const express = require("express");
const hbs = require("hbs");
const axios = require("axios");

const app = express();

app.set("view engine", "hbs");
const port = process.env.port || 3000;
const book_service_url = process.env.BOOK_SERVICE || "http://localhost:5000";
const review_service_url =
  process.env.REVIEW_SERVICE || "http://localhost:7000";

app.get("/", (req, res) => {
  axios.get(book_service_url).then((response) => {
    res.render("index", {
      title: "Book Store",
      books: response.data,
    });
  });
});

app.get("/details/:id", (req, res) => {
  let book_id = req.params.id;
  axios.get(`${review_service_url}/review/${book_id}`).then((response) => {
    console.log(response.data);
    res.render("review", {
      title: book_id,
      reviews: response.data,
    });
  });
});

app.listen(port, () => {
  console.log(`App is listening at http://localhost:${port}`);
});
