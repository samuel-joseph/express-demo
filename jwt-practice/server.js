const express = require("express");
const app = express();

const posts = [
  {
    username: "Mel",
    title: "post1"
  },
  {
    username: "Joe",
    title: "post2"
  }
];

app.get(`/posts`, (req, res) => {
  res.json(posts);
});

app.listen(3000);
