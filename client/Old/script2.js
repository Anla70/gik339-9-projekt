const url = "http://localhost:5000/recipe";

document.getElementById("submit").addEventListener("click", function () {
  fetchAndDisplayRecipes();

  const form = document.getElementById("addRecipeForm");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const newRecipe = {
      recipeName: document.getElementById("recipeName").value,

      recipeIngredients: document.getElementById("recipeIngredients").value,
      recipeInstructions: document.getElementById("recipeInstructions").value,
    };

    fetch(url, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRecipe),
    })
      .then((response) => response.json())

      .then((data) => {
        console.log("Success:", data);
        fetchAndDisplayRecipes(); // Uppdatera receptlistan
      })

      .catch((error) => {
        console.error("Error:", error);
      });

    // Rensa formuläret efter inskickning
    form.reset();
  });
});

function getColorForRecipeType(description) {
  if (description.includes("Förrätt")) {
    return "rgba(224, 213, 150, 0.815)"; // Exempel på färg för förrätter
  } else if (description.includes("Varmrätt")) {
    return "rgba(111, 119, 174, 0.815)"; // Exempel på färg för varmrätter
  } else if (description.includes("Efterrätt")) {
    return "rgba(108, 159, 189, 0.815)"; // Exempel på färg för desserter
  } else {
    return "gray"; // Standardfärg om ingen typ matchar
  }
}

// // Funktionen som hanterar eventet
// function handleInputEvent(e) {
//   // Skriver ut vilket element som genererade eventet
//   console.log('Event genererat av:', e.target);
//   // Hämtar name-attributet från elementet som genererade eventet
//   const fieldName = e.target.name;
//   // Kontrollerar om det är 'content'-fältet
//   if (fieldName === 'content') {
//       // Hämtar värdet från 'content'-fältet
//       const contentValue = e.target.value;
//       // Skriver ut värdet i 'content'-fältet till div-elementet
//       dynamicDisplay.innerHTML = contentValue;
//   }
// }
// // Lägger till eventlyssnare till alla input-fält
// inputFields.forEach(field => field.addEventListener('input', handleInputEvent));
// // Lägger till en eventlyssnare på checkboxen för att hantera förändringar
// divStyleCheckbox.addEventListener('change', function() {
//   // Kontrollerar om checkboxen är ikryssad
//   if (this.checked) {
//     // Rensar befintligt innehåll i dynamicDisplay
//     dynamicDisplay.innerHTML = '';
//     // Skapar ett nytt div-element
//     const newElement = document.createElement('div');
//     // Lägger till en klass till det nya elementet
//     newElement.classList.add('new-element');
//     // Sätter bakgrundsfärgen på det nya elementet baserat på värdet i colorField
//     newElement.style.backgroundColor = colorField.value;
//     // Sätter innehållet i det nya elementet baserat på värdet i contentField
//     newElement.innerHTML = contentField.value;
//     // Lägger till det nya elementet i dynamicDisplay
//     dynamicDisplay.appendChild(newElement);
//   }
// });

function fetchAndDisplayRecipes() {
  fetch(url)
    .then((response) => response.json())

    .then((recipes) => {
      console.log(recipes);
      const recipeList = document.createElement("ul");

      recipeList.innerHTML = ""; // Rensa tidigare recept
      recipes.forEach((recipe) => {
        const listItem = document.createElement("li");
        const color = getColorForRecipeType(recipe.recipeDescription);
        listItem.style.borderTop = "2rem solid";
        listItem.style.borderTopColor = color;
        listItem.innerHTML = `
                <p><b>Recept nr:</b> ${recipe.id}</p>
                <p><b>Beskrivning:</b> ${recipe.recipeDescription}</p>
                <p><b>Recept:</b> ${recipe.recipeName}</p>
                <p><b>Ingredienser:</b> ${recipe.recipeIngredients}</p>
                <p><b>Instruktioner:</b> ${recipe.recipeInstructions}</p>`;

        console.log(recipe);

        recipeList.appendChild(listItem);
      });

      const container = document.querySelector(".container");
      container.innerHTML = ""; // Rensa befintligt innehåll
      container.appendChild(recipeList);
    });

  // .catch((error) => {
  //   console.error("Error:", error);
  // });
}

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
