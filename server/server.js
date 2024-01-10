const express = require("express");
const server = express();
const port = 3000;
const sqlite = require("sqlite3").verbose();
const db = new sqlite.Database("./gik339.db");

// Middleware för att hantera JSON-data och URL-kodade data
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

// CORS-headers för att tillåta förfrågningar från andra ursprung
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "*");
  next();
});

// Starta servern
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Route för att hämta alla recept
server.get("/recipe", (req, res) => {
  db.all("SELECT * FROM recipe", (err, rows) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.send(rows);
    }
  });
});

// Route för att hämta ett specifikt recept
server.get("/recipe/:id", (req, res) => {
  db.get("SELECT * FROM recipe WHERE id = ?", req.params.id, (err, row) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.send(row);
    }
  });
});

// Route för att lägga till ett nytt recept
server.post("/recipe", (req, res) => {
  const { recipeName, recipeDescription, recipeIngredients, recipeInstructions } = req.body;
  db.run(
    "INSERT INTO recipe (recipeName, recipeDescription, recipeIngredients, recipeInstructions) VALUES (?, ?, ?, ?)",
    [recipeName, recipeDescription, recipeIngredients, recipeInstructions],
    function (err) {
      if (err) {
        res.status(500).send(err.message);
      } else {
        res.status(200).send({ message: "Receptet sparades", id: this.lastID });
      }
    }
  );
});

// Route för att uppdatera ett recept
server.put("/recipe/:id", (req, res) => {
  const { recipeName, recipeDescription, recipeIngredients, recipeInstructions } = req.body;
  db.run(
    "UPDATE recipe SET recipeName = ?, recipeDescription = ?, recipeIngredients = ?, recipeInstructions = ? WHERE id = ?",
    [recipeName, recipeDescription, recipeIngredients, recipeInstructions, req.params.id],
    function (err) {
      if (err) {
        res.status(500).send(err.message);
      } else {
        res.send({ message: "Receptet uppdaterades" });
      }
    }
  );
});

// Route för att ta bort ett recept
server.delete("/recipe/:id", (req, res) => {
  db.run("DELETE FROM recipe WHERE id = ?", req.params.id, function (err) {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.send({ message: "Receptet är borttaget" });
    }
  });
});
