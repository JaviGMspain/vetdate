const express = require("express");
const hbs = require("hbs");
const app = express();
const mongoose = require("mongoose");
const Date = require("./models/Date.model");
const bodyParser = require("body-parser");

mongoose
  .connect("mongodb://127.0.0.1:27017/date")
  .then(() => console.log("Connected to the database"))
  .catch((err) => console.log(err));

app.set("view engine", "hbs");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public"));
hbs.registerPartials(__dirname + "/views/partials");

app.use(bodyParser());

hbs.registerHelper("eq", function (a, b) {
  return a === b;
});

//lista
app.get(`/`, (req, res) => {
  Date.find().then((data) => {
    res.render("index", { date: data });
  });
});
//nueva tarea

app.get("/create-date", (req, res) => {
  res.render("create-date");
});

app.post("/create-date", (req, res) => {
  Date.create(req.body)
    .then((data) => {
      res.redirect("/");
    })
    .catch((error) => console.log(error));
});

//tarea concreta

app.get(`/date/:id`, (req, res) => {
  Date.findById(req.params.id).then((data) => {
    console.log(data)
    res.render(`date`);
  });
});

app.listen(3000, () => console.log("server listening in port 3000"));
