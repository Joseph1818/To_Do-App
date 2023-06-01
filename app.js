//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
// S1 : Requiring mongoose in the app
const mongoose = require("mongoose");

//const date = require(__dirname + "/date.js");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// S2 : create a new detabase connection inside mongo DB and create one "todolist".
mongoose.connect("mongodb://127.0.0.1:27017/todolistDB", {
  useNewUrlParser: true,
});
// S3: Create itemSchema With 1 field Called name with String as datatype.
const itemSchema = {
  name: String,
};
// S4: Create model based on the schema.
const Item = mongoose.model("Item", itemSchema);

// S7: creating new items (3).
const item1 = new Item({
  name: "Welcome to your to list",
});
const item2 = new Item({
  name: "Hit the + button to add a new item",
});
const item3 = new Item({
  name: " <-- Hit this to delete an item.",
});

// S8 : creating an Array to save these items
const defaultsItems = [item1, item2, item3];

// S9: Mongose insertMany() to save the item into the array.
Item.insertMany(defaultsItems)
  .then(function () {
    console.log("All models of cars have been succesfully into the db");
  })
  .catch(function (err) {
    console.log(err);
  });

app.get("/", function (req, res) {
  //S5: The code bellow was deleted with date.js file to simplify the code.
  //const day = date.getDate();

  //S6 : and deleted also "day" variable to the code bellow and replaced by a simple string "today".
  res.render("list", { listTitle: "Today", newListItems: items });
});

app.post("/", function (req, res) {
  const item = req.body.newItem;

  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work List", newListItems: workItems });
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
