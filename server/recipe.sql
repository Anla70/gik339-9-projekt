DROP TABLE IF EXISTS recipe ;
CREATE TABLE IF NOT EXISTS recipe (
   id         INTEGER  NOT NULL PRIMARY KEY AUTOINCREMENT
  ,recipeName TEXT NOT NULL
  ,recipeDescription TEXT NOT NULL
  ,recipeIngredients  TEXT NOT NULL
  ,recipeInstructions TEXT NOT NULL
);

select * from recipe;
