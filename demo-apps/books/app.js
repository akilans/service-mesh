const express = require("express");
const app = express();
var port = process.env.port || 5000;

let books = [
  {
    id: 1,
    title: "How to Win Friends & Influence People",
    author: "Dale Carnegie",
    price: 600,
    image_url:
      "https://images-na.ssl-images-amazon.com/images/I/51C4Tpxn4KL._SX316_BO1,204,203,200_.jpg",
  },
  {
    id: 2,
    title: "Think and Grow Rich",
    author: "Napoleon Hill",
    price: 500,
    image_url:
      "https://images-na.ssl-images-amazon.com/images/I/51Y8jwGiebL._SX328_BO1,204,203,200_.jpg",
  },
  {
    id: 3,
    title: "The 7 Habits of Highly Effective People",
    author: "Stephen R. Covey",
    price: 700,
    image_url:
      "https://images-na.ssl-images-amazon.com/images/I/51qy14G7knL._SX318_BO1,204,203,200_.jpg",
  },
];

app.get("/", (req, res) => {
  res.json(books);
});

app.listen(port, () => {
  console.log(`Books API is listening at http://localhost:${port}`);
});
