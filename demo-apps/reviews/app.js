const express = require("express");
const app = express();

const port = process.env.port || 7000;

let book_reviews = [
  {
    id: 1,
    title: "How to Win Friends & Influence People",
    reviews: [
      {
        user: "Akilan",
        text:
          "Cured my anxiety, won a lot of friends, and gave me more confidence than I've ever had in my life.",
      },
      {
        user: "Inba",
        text: "Everyone should read this book",
      },
    ],
  },
  {
    id: 2,
    title: "Think and Grow Rich",
    reviews: [
      {
        user: "Saravana",
        text:
          " Excellent book! be open minded and work through it, you won't regret of reading this book.",
      },
      {
        user: "Alex",
        text: "Great book to keep you on track",
      },
    ],
  },
  {
    id: 3,
    title: "The 7 Habits of Highly Effective People",
    reviews: [
      {
        user: "Jegan",
        text: "This is one of the best books I have ever known!",
      },
      {
        user: "Kumar",
        text: "Still reading, but so far so good!!",
      },
      {
        user: "Mathan",
        text: "Great book with good insights!",
      },
    ],
  },
];

app.get("/review/:id", (req, res) => {
  let book_id = req.params.id;

  let book_review = book_reviews.filter((book) => {
    return book.id == book_id;
  });
  res.json(book_review);
});

app.get("/error", (req, res) => {
  res.status(500).send("Fake 500 error");
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
