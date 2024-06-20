// const search = document.querySelector("#search");
const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();

app.set("Views", path.join(__dirname, "Views"));
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  const filePath = path.join(__dirname, "data", "topics.json");
  const fileData = fs.readFileSync(filePath);
  const storedTopics = JSON.parse(fileData);
  let topicId = req.params.id;
  res.render("index", {
    topics: storedTopics,
    numberOfTopics: storedTopics.length,
    id: topicId,
  });
});

app.get(`/details/:id`, (req, res) => {
  const filePath = path.join(__dirname, "data", "topics.json");
  const fileData = fs.readFileSync(filePath);
  const storedTopics = JSON.parse(fileData);
  let id = req.params.id;

  res.render("details", { topics: storedTopics, topicId: id });
});

app.post("", (req, res) => {
  let search = req.body.search;
  const filePath = path.join(__dirname, "data", "topics.json");
  const fileData = fs.readFileSync(filePath);
  let storedTopics = JSON.parse(fileData);

  const filteredTopics = storedTopics.filter(
    (topic) =>
      topic.topic.includes(`${search.toUpperCase()}`) ||
      topic.topic.includes(`${search.toLowerCase()}`)
  );

  res.render("searched", {
    topics: storedTopics,
    numberOfTopics: filteredTopics.length,
    search: search,
  });
});

app.listen(3000);
