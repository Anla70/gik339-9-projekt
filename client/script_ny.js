// Definierar vår URL till API-servern
const url = "http://localhost:4000/recipe";

// Variabler för att hantera uppdatering och borttagning av våra recept
let isUpdating = false;
let updatingRecipeId = null;
let deleteRecipeId = null;

// Funktion för att visa modalen för uppdaterat recept
function showUpdateModal() {
  var updateModal = new bootstrap.Modal(document.getElementById("updateModal"));
  updateModal.show();
}

// Funktion för att visa modalen för tillagt recept
function showAddedModal() {
  var addedModal = new bootstrap.Modal(document.getElementById("addedModal"));
  addedModal.show();
}

// Funktion för att visa bekräftelsemodalen för borttagning av recept
function confirmDeleteRecipe(id) {
  deleteRecipeId = id;
  var deleteConfirmModal = new bootstrap.Modal(document.getElementById("deleteConfirmModal"));
  deleteConfirmModal.show();
}

// Funktion för att förbereda uppdatering av ett recept
function prepareUpdateRecipe(id) {
  isUpdating = true;
  updatingRecipeId = id;

  document.getElementById("updateRecipeBtn").style.display = "block";
  document.getElementById("submitRecipeBtn").style.display = "none";

  fetch(`${url}/${id}`)
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("recipeName").value = data.recipeName;
      document.getElementById("recipeIngredients").value = data.recipeIngredients;
      document.getElementById("recipeInstructions").value = data.recipeInstructions;
      document.querySelector(`input[name="flexRadioDefault"][value="${data.recipeDescription}"]`).checked = true;

      const form = document.getElementById("addRecipeForm");
      form.scrollIntoView({ behavior: "smooth" });
    })
    .catch((error) => console.error("Error:", error));
}

// Händelsehanterare för Uppdatera-knappen
document.getElementById("updateRecipeBtn").addEventListener("click", function (e) {
  e.preventDefault();
  if (!isUpdating || !updatingRecipeId) return;

  const recipeData = {
    recipeName: document.getElementById("recipeName").value,
    recipeIngredients: document.getElementById("recipeIngredients").value,
    recipeInstructions: document.getElementById("recipeInstructions").value,
    recipeDescription: document.querySelector('input[name="flexRadioDefault"]:checked').value,
  };

  fetch(`${url}/${updatingRecipeId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(recipeData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Recept uppdaterat:", data);
      document.getElementById(
        "updateModalBody"
      ).innerHTML = `Receptet "${recipeData.recipeName}" med recept nr: ${updatingRecipeId} har uppdaterats`;
      showUpdateModal();
      resetFormAndButtons();
      fetchAndDisplayRecipes();
    })
    .catch((error) => console.error("Error:", error));
});

// Återställer formuläret och knapparna
function resetFormAndButtons() {
  document.getElementById("addRecipeForm").reset();
  document.getElementById("updateRecipeBtn").style.display = "none";
  document.getElementById("submitRecipeBtn").style.display = "block";
  isUpdating = false;
  updatingRecipeId = null;
}

// Händelsehanterare för att lägga till ett nytt recept
document.getElementById("addRecipeForm").addEventListener("submit", function (e) {
  e.preventDefault();

  if (isUpdating) return;

  const recipeData = {
    recipeName: document.getElementById("recipeName").value,
    recipeIngredients: document.getElementById("recipeIngredients").value,
    recipeInstructions: document.getElementById("recipeInstructions").value,
    recipeDescription: document.querySelector('input[name="flexRadioDefault"]:checked').value,
  };

  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(recipeData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      // Uppdaterar modalen med det nya receptets information
      document.getElementById(
        "addedModalBody"
      ).innerHTML = `Receptet "${recipeData.recipeName}" har lagts till och har recept nr: ${data.id}`;
      showAddedModal();
      resetFormAndButtons();
      fetchAndDisplayRecipes();
    })
    .catch((error) => console.error("Error:", error));
});

// Funktion för att hämta och visa receptlistan
function fetchAndDisplayRecipes() {
  fetch(url)
    .then((response) => response.json())
    .then((recipes) => {
      if (Array.isArray(recipes)) {
        const recipeList = document.createElement("ul");
        recipeList.innerHTML = "";

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
            <button onclick="prepareUpdateRecipe(${recipe.id})">Uppdatera</button>
            <button onclick="confirmDeleteRecipe(${recipe.id})">Ta bort</button>
          `;

          recipeList.appendChild(listItem);
        });

        const container = document.querySelector(".container");
        container.innerHTML = "";
        container.appendChild(recipeList);
      }
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
    return "gray";
  }
}
// Händelsehanterare för Ja-knappen i bekräftelsemodalen
document.getElementById("confirmDeleteBtn").addEventListener("click", function () {
  if (deleteRecipeId !== null) {
    deleteRecipe(deleteRecipeId);
    // Stänger den första modalen direkt
    var deleteConfirmModal = document.getElementById("deleteConfirmModal");
    var modalBootstrap = bootstrap.Modal.getInstance(deleteConfirmModal);
    modalBootstrap.hide();
  }
});

// Funktion för att ta bort ett recept och visa bekräftelse
function deleteRecipe(id) {
  fetch(`${url}/${id}`, { method: "DELETE" })
    .then((response) => response.json())
    .then((data) => {
      console.log("Recept borttaget:", data);
      fetchAndDisplayRecipes();
      showDeleteConfirmation();
    })
    .catch((error) => console.error("Error:", error));
}

// Funktion för att visa bekräftelsemodalen för borttagning
function showDeleteConfirmation() {
  var deleteConfirmationModal = new bootstrap.Modal(document.getElementById("deleteConfirmationModal"));
  deleteConfirmationModal.show();
}

// Laddar receptlistan när sidan laddas
window.onload = fetchAndDisplayRecipes;
