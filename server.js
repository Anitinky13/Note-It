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
//path
const path = require("path");
const { asapScheduler } = require("rxjs");
//express
const app = express();
//heroku port
const PORT = process.env.PORT || 3000;
app.use(express.json());
//const router = require("express").Router();
app.use(express.urlencoded({ extended: true }));
require("./routes/apiRoutes.js")(app);
require("./routes/htmlRoutes.js")(app);
//EXPRESS calls to handle data
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
//file system
// const fs = require("fs");

app.use(express.static("public"));
// const apiRoutes = require("./routes/apiRoutes");
// const htmlRoutes = require("./routes/htmlRoutes");
//to listen to the port
app.listen(PORT, function () {
  console.log(`App listening on PORT: ${PORT}`);
});
