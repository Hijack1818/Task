const express = require("express");

const ReviewRoutes = require("./routes/review.route.js");

const app = express();

/* A middleware that parses the body of the request and makes it available in the req.body object. */
app.use(express.json());

/* This is the root route. It is used to check if the server is running. */
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.get("/script.js", (req, res) => {
  res.sendFile(__dirname + "/script.js");
});

/* Telling the server to use the routes in the ProductRoutes file. */
app.use("/api", ReviewRoutes);

// app.listen(5000, console.log("Server started on port 5000"));

module.exports = app;
