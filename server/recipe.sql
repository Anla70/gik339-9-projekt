DROP TABLE IF EXISTS recipe ;
CREATE TABLE IF NOT EXISTS recipe (
   id INTEGER  NOT NULL PRIMARY KEY AUTOINCREMENT
  ,recipeName TEXT NOT NULL
  ,recipeDescription TEXT NOT NULL
  ,recipeIngredients  TEXT NOT NULL
  ,recipeInstructions TEXT NOT NULL
  ,recipeImage TEXT
);

--     "INSERT INTO recipe(recipeName, recipeDescription, recipeIngredients, recipeInstructions, recipeImage) VALUES (?,?,?,?,?)";
-- Förrätt = blue, Varmrätt = green, Efterrätt = yellow
INSERT INTO recipe (id, recipeName, recipeDescription, recipeIngredients, recipeInstructions, recipeImage, color) VALUES (1,'Kokt ägg','Varmrätt','Ägg ,vatten och salt', 'Koka ägget i 8 min', 'green');

INSERT INTO recipe (id, recipeName, recipeDescription, recipeIngredients, recipeInstructions, recipeImage, color) VALUES (2,'Köttbullar med mos','Varmrätt','1½dl mjölk, 5msk ströbröd, 500g Köttfärs, ½ gul lök, 1 ägg, 1krm peppar, 1tsk salt, ½tsk socker, smör eller margarin, Potatis, mjölk', 'Gör så här: B', 'green');

INSERT INTO recipe (id, recipeName, recipeDescription, recipeIngredients, recipeInstructions, recipeImage, color) VALUES (3,'Sockerkaka','Efterrätt','2 Ägg, 2dl Socker, 2dl Mjöl, 1dl Mjölk, 1msk Bakpulver, 1msk Vaniljsocker','Gör så här: Häll i ingredienserna i en bunke, vispa till en smet, smöra och bröda en form, häll i smeten i formen och ställ in i ugnen på 185 grader i 10 minuter', 'yellow');

INSERT INTO recipe (id,recipeName, recipeDescription, recipeIngredients, recipeInstructions, recipeImage) VALUES (4,'Crepes med räkfyllning','Förrätt','Vetmjöl, Salt, Mjölk, Ägg, Smör, Fyllning: Skalade räkor, Purjolök, Creme Fraiche, Citron, Finhackad färsk dill, Riven prästost', 'Gör så hör: Vispa samman mjöl och salt med häften av mjölken till en jämn smet. Vispa i resten av mjölken och äggen. Smält smöret och rör ner det i smeten. Hacka purjolök fint. Blanda samman ingredienserna till fyllningen. Ställ åt sidan. Stek 8 stora eller 16 små pannkakor. Sätt ugnen på 225°. Låt svalna. Fördela fyllningen på pannkakorna, rulla ihop och lägg dem i en ugnssäker form. Strö över osten och gratinera i övre delen av ugnen ca 10 min.','blue');

INSERT INTO recipe (id, recipeName, recipeDescription, recipeIngredients, recipeInstructions, recipeImage) VALUES (5,'Chokladbollar','Efterrätt','100g Smör, 1,5dl Socker, 1msk Vaniljsocker, 4dl Havregryn, 3msk Kakao, 3msk Kallt starkt kaffe, Topping: Pärlsocker eller kokos', 'Gör så här: Blanda ingredienserna i en bunke, vispa eller knåda ingredienserna till en kladdig massa, rulla dem till runda bollar och doppa dem i pärlsocker eller kokos, lägg in i kylen och sedan är de redo att serveras','yellow');


select * from recipe ;