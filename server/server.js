// Importerar express.js och sqlite3-modulen
// samt skapar en ny instans av express.js
const express = require("express");
const server = express();
const sqlite3 = require("sqlite3");

// konfar serven för att hantera JSON-data samt URL-data
server.use(express.json()).use(express.urlencoded({ extended: false }));
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "*");
  next();
});

// Startar serven på port 3000, när serven är igång skrivs medelande ut
server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000 ");
});

// Route för att hämta alla recept från databasen. Resultatet skickas till klienten alt felmeddelande
server.get("/recipe", (req, res) => {
  const db = new sqlite3.Database("./gik339.db");

  const query = "SELECT * FROM recipe";

  db.all(query, (err, rows) => {
    db.close();
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(rows);
    }
  });
});

// Route för att lägga till nya recept
server.post("/recipe", (req, res) => {
  const db = new sqlite3.Database("./gik339.db");
  const recipe = req.body;
  const query =
    "INSERT INTO recipe(recipeName, recipeDescription, recipeIngredients, recipeInstructions, recipeImage) VALUES (?,?,?,?,?)";

  db.all(query, Object.values(recipe), (err) => {
    db.close();
    if (err) {
      res.status(500).send(err);
    } else {
      res.send("Receptet sparades");
    }
  });
});

// Route för att uppdatera befintliga recept
server.put("/recipe", (req, res) => {
  const bodyData = req.body;

  const id = bodyData.id;
  const recipeData = {
    recipeName: bodyData.recipeName,
    recipeDescription: bodyData.recipeDescription,
    recipeIngredients: bodyData.recipeIngredients,
    recipeInstructions: bodyData.recipeInstructions,
    recipeImage: bodyData.recipeImage,
  };

  let updateString = "";
  const columnsArray = Object.keys(recipeData);
  columnsArray.forEach((column, i) => {
    updateString += `${column}="${recipe[column]}"`;
    if (i !== columnsArray.length - 1) updateString += ",";
  });
  const query = `UPDATE recipe SET ${updateString} WHERE id=${id}`;

  db.run(query, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.send("Receptet uppdaterades");
    }
  });
});

// Route för att ta bort befintligt valt recept via id
server.delete("/recipe/:id", (req, res) => {
  const id = req.params.id;
  const query = `DELETE FROM recipe WHERE id = ${id}`;

  db.run(query, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.send("Receptet är borttaget");
    }
  });
});
