// //dependencies
// const express = require("express");
// //create an express server
// const app = express();
// //creating environment variables port
// const PORT = process.env.PORT || 3000;
// //point server to the route files

// //Parse incoming array data
// app.use(express.urlencoded({ extended: true }));

// //parse incoming json data
// app.use(express.json());

// app.use(express.static("public"));
// app.use("/api", apiRoutes);
// app.use("/", htmlRoutes);
// //listen to the port- to start the server.
// app.listen(PORT, () => {
//   console.log(`API server now on port at localhost${PORT}`);
// });
//dependencies
const express = require("express");
//heroku port
const PORT = process.env.PORT || 3000;
//file system
const fs = require("fs");
//path
const path = require("path");
//express
const app = express();
//const router = require("express").Router();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");
//to listen to the port
app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});
