const express = require("express");
const hbs = require("hbs");
const axios = require("axios");

const app = express();
const app_color = process.env.APP_COLOR || undefined;

app.set("view engine", "hbs");
const port = process.env.port || 3000;
const book_service_url = process.env.BOOK_SERVICE || "http://localhost:5000";
const review_service_url =
  process.env.REVIEW_SERVICE || "http://localhost:7000";

app.get("/", (req, res) => {
  console.log(book_service_url);
  axios.get(book_service_url).then((response) => {
    res.render("index", {
      title: "Book Store",
      books: response.data,
      color: app_color,
    });
  });
});

app.get("/details/:id", (req, res) => {
  let book_id = req.params.id;
  console.log(`${review_service_url}/review/${book_id}`);
  axios.get(`${review_service_url}/review/${book_id}`).then((response) => {
    console.log(response.data);
    res.render("review", {
      title: book_id,
      reviews: response.data,
    });
  });
});

app.get("/error", (req, res) => {
  res.status(500).render("error", {
    title: "500 - Error",
    message: "Dont't worry, It is Fake 500 error!!!",
  });
});

app.listen(port, () => {
  console.log(`App is listening at http://localhost:${port}`);
});
