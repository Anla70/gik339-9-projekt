// Definierar vår URL till API-servern
const url = "http://localhost:3000/recipe";

// Variabler för att hantera uppdatering av våra recept
let isUpdating = false;
let updatingRecipeId = null;

// Lyssnae på submit-händelsen i formuläret för att lägga till recept
document.getElementById("addRecipeForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Förhindrar standardformulärhantering

  // Hämta värdena från formuläret
  const recipeData = {
    recipeName: document.getElementById("recipeName").value,
    recipeIngredients: document.getElementById("recipeIngredients").value,
    recipeInstructions: document.getElementById("recipeInstructions").value,
    recipeDescription: document.querySelector('input[name="flexRadioDefault"]:checked').value,
  };

  // Kontrollerar om ett recept uppdateras eller läggs till
  if (isUpdating) {
    // Om receptet uppdateras, skickas en PUT-förfrågan till API-servern
    fetch(`${url}/${updatingRecipeId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(recipeData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Recept uppdaterat:", data);
        isUpdating = false;
        updatingRecipeId = null;
        fetchAndDisplayRecipes(); // Funktion som uppdaterar receptlistan
      })
      .catch((error) => console.error("Error:", error));
  } else {
    // Om ett nytt recept läggs till skickas en POST-förfrågan till API-servern
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(recipeData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        fetchAndDisplayRecipes();
      })
      .catch((error) => console.error("Error:", error));
  }

  // Återställer formuläret efter att ett recept publicerats
  document.getElementById("addRecipeForm").reset();
});

// Funktion för att hämta och visa receptlistan
function fetchAndDisplayRecipes() {
  fetch(url)
    .then((response) => response.json())
    .then((recipes) => {
      if (Array.isArray(recipes)) {
        const recipeList = document.createElement("ul");
        recipeList.innerHTML = "";

        // Loopar igenom och renderar varje recept som en listpunkt
        recipes.forEach((recipe) => {
          const listItem = document.createElement("li");
          const color = getColorForRecipeType(recipe.recipeDescription);
          listItem.style.borderTop = "2rem solid";
          listItem.style.borderTopColor = color;
          listItem.innerHTML = `
            <p><b>Recept nr:</b> ${recipe.id}</p>            
            <p><b>Recept:</b> ${recipe.recipeName}</p>
            <p><b>Beskrivning:</b> ${recipe.recipeDescription}</p>
            <p><b>Ingredienser:</b> ${recipe.recipeIngredients}</p>
            <p><b>Instruktioner:</b> ${recipe.recipeInstructions}</p>
            <button onclick="updateRecipe(${recipe.id})">Uppdatera</button>
            <button onclick="deleteRecipe(${recipe.id})">Ta bort</button>
          `;

          recipeList.appendChild(listItem);
        });

        // Ersätter receptlistan med den uppdaterade listan
        const container = document.querySelector(".container");
        container.innerHTML = "";
        container.appendChild(recipeList);
      }
    })
    .catch((error) => console.error("Error:", error));
}

// Funktion för att uppdatera ett recept
function updateRecipe(id) {
  isUpdating = true;
  updatingRecipeId = id;

  // Hämtar det valda receptets data från API-servern och fyller i formuläret
  fetch(`${url}/${id}`)
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("recipeName").value = data.recipeName;
      document.getElementById("recipeIngredients").value = data.recipeIngredients;
      document.getElementById("recipeInstructions").value = data.recipeInstructions;

      // Scrollar upp till formuläret när ett recept ska uppdateras
      const form = document.getElementById("addRecipeForm"); // Hämtar formuläret
      form.scrollIntoView({ behavior: "smooth" }); // Scrollar upp till formuläret
    })
    .catch((error) => console.error("Error:", error));
}

// Funktion för att ta bort ett recept
function deleteRecipe(id) {
  // Skickar en DELETE-förfrågan till API-servern
  fetch(`${url}/${id}`, { method: "DELETE" })
    .then((response) => response.json())
    .then((data) => {
      console.log("Recept borttaget:", data);
      fetchAndDisplayRecipes(); // Uppdaterar receptlistan
    })
    .catch((error) => console.error("Error:", error));
}

// Funktion för att använda vår färgkodning baserat på recepttyp
function getColorForRecipeType(description) {
  if (description.includes("Förrätt")) {
    return "rgba(224, 213, 150, 0.815)";
  } else if (description.includes("Varmrätt")) {
    return "rgba(111, 119, 174, 0.815)";
  } else if (description.includes("Efterrätt")) {
    return "rgba(108, 159, 189, 0.815)";
  } else {
    return "gray"; // Standardfärg om inget matchar
  }
}

// Laddar receptlistan när sidan laddas
window.onload = fetchAndDisplayRecipes;

// const url = "http://localhost:5500/recipe";

// fetch(url)

//   .then((response) => response.json())

//   .then((recipes) => {

//     console.log(recipes);

//     const recipeList = document.createElement("ul");

//     recipes.forEach((recipe) => {

//       const recipeList = document.createElement("li");

//       listItem.style.borderColor = recipe.color;

//       listItem.innerHTML = `<p>ID: ${recipe.id} <br> Name: ${recipe.recipeName} ${recipe.recipeIngredients}

//       <br> Description: ${recipe.recipeDescription} <br>Färg: ${recipe.color} </p>`;

//       console.log(recipe);

//       recipeList.appendChild(listItem);

//     });

//     document.body.appendChild(recipeList);

//   });
