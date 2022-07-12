const fs = require("fs");
const path = require("path");
const getNotes = require("db/db.json");
console.log(process.pid);

//request notes
module.exports = function (app) {
  //take json array to db.json
  function writeData(notes) {
    notes = JSON.stringify(notes);
    console.log(notes);
    fs.writeFilySync("db/db.json", notes, function (err) {
      if (err) {
        return console.log(err);
      }
    });
  }
  app.get("/api/notes", function (req, res) {
    res.json(getNotes);
  });

  //   app.get("/api/notes", (req, res) => {
  //     fs.readFile("./db/db.json", "utf8", (err, data) => {
  //       if (err) throw err;
  //       var notes = JSON.parse(data);
  //       res.json(notes);
  //     });
  //   });
  //Get api notes should read the db.json file and return all saved notes as json.
  //   app.get("/notes", (req, res) => {
  //     res.sendFile(path.join(__dirname, "./db/db.json"));
  //   });

  //   app.get("*", (req, res) => {
  //     res.sendFile(path.join(__dirname, "/index.html"));
  //   });
  //post should recieve a new note to save on the request body,
  app.post("/api/notes", function (req, res) {
    if (getNotes.length == 0) {
      req.body.id = "0";
    } else {
      const lastItemIndex = getNotes.length - 1;
      const lastItem = getNotes[lastItemIndex];
      const newId = JSON.parse(lastItem.id) + 1;
      req.body.id = JSON.stringify(newId);
    }
    console.log("req.body.id: " + req.body.id);

    getNotes.push(req.body);
    writeToDB();
    console.log(getNotes);

    res.json(req.body);
  });
  function writeToDB() {
    fs.writeFile(
      path.join(__dirname, "..", "db/db.json"),
      JSON.stringify(getNotes, "\t"),
      (err) => {
        if (err) throw err;
        return true;
      }
    );
  }
  //delete /api/notes/:id should receive a query parameter containing the id of a note to deleteNote.
  app.delete("/api/notes/:id", (req, res) => {
    let id = req.params.id.toString();
    for (i = 0; i < getNotes.length; i++) {
      if (getNotes[i].id == id) {
        console.log("Successfully deleted!");
        res.send(getNotes[i]);

        getNotes.splice(i, 1);
        break;
      }
    }
    writeData(getNotes);
  });
};
