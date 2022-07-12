// //dependencies
// const express = require("express");
// //create an express server
// const app = express();
// //creating environment variables port
// const PORT = process.env.PORT || 3000;
// //point server to the route files
// const apiRoutes = require("./routes/apiRoutes");
// const htmlRoutes = require("./routes/htmlRoutes");
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
const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 3000;

const router = require("express").Router();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());

app.post("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) throw err;
    var notes = JSON.parse(data);
    let userNote = req.body;
    userNote.id = Math.floor(Math.random() * 5000);
    notes.push(userNote);
    fs.writeFile("./db/db.json", JSON.stringify(notes), (err, data) => {
      res.json(userNote);
    });
  });
});

app.delete("/api/notes/:id", (req, res) => {
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) throw err;
    let notes = JSON.parse(data);
    const newNotes = notes.filter(
      (note) => note.id !== parseInt(req.params.id)
    );

    fs.writeFile("./db/db.json", JSON.stringify(newNotes), (err, data) => {
      res.json({ msg: "successfully" });
    });
  });
});

app.get("api/notes/:id", (req, res) => {
  res.json(notes[req.params.id]);
});

app.get("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) throw err;
    var notes = JSON.parse(data);
    res.json(notes);
  });
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/notes.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
});

app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});
