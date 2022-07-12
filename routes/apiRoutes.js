const router = require("express").Router();

//request notes
module.exports = (app) => {
  //get request
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
  //Get api notes should read the db.json file and return all saved notes as json.
  app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./db/db.json"));
  });

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/index.html"));
  });
  //post should recieve a new note to save on the request body,
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
  //delete /api/notes/:id should receive a query parameter containing the id of a note to deleteNote.
  app.delete("/api/notes/:id", (req, res) => {
    let db = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    //     if (err) throw err;
    //     let notes = JSON.parse(data);
    //     const newNotes = notes.filter(
    //       (note) => note.id !== parseInt(req.params.id)
    //     );
    let deleteNotes = db.filter((item) => item.id !== req.params.id);
    //file system to writeFile//rewriting to db.json
    fs.writeFileSync(
      "/db/db.json",
      JSON.stringify(deleteNotes),
      (err, data) => {
        res.json(deleteNotes);
      }
    );
  });
};
