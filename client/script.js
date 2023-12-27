const url = "http://localhost:3000/recipe";

// fetch(url)
//   .then((response) => response.json())
//   .then((recipe) => {
//     const recipeList = document.createElement("ul");

//     users.forEach((recipe) => {
//       const recipeList = document.createElement("li");

//       recipeList.innerHTML = `<p>Name: ${recipe.recipeName}</p>`;
//       console.log(user);

//       recipeList.appendChild(recipeList);
//     });
//     document.body.appendChild(recipeList);
//   });

fetch(url)
  .then((response) => response.json())
  .then((recipe) => {
    const recipeList = document.createElement("ul");

    recipe.forEach((recipe) => {
      const recipeList = document.createElement("li");
      listItem.style.borderColor = recipe.color;

      listItem.innerHTML = `<p>ID: ${recipe.id} <br> Name: ${recipe.recipeName} ${recipe.recipeIngredients}
      <br> Description: ${recipe.recipeDescription} <br>Färg: ${recipe.color} </p>`;
      console.log(recipe);

      recipeList.appendChild(recipeList);
    });
    document.body.appendChild(recipeList);
  });

// fetch(url)
//   .then((response) => response.json())
//   .then((recipe) => {
//     const grid = document.createElement("div");
//     grid.className = "grid";

//     recipe.forEach((recipe, index) => {
//       // Skapar en div för varje användare som kommer att innehålla både etiketten och användarens detaljer
//       const userDiv = document.createElement("div");
//       userDiv.className = "grid-item";

//       // Skapar en etikett för varje användare och nummer
//       const memberLabel = document.createElement("div");
//       memberLabel.className = "member-label";
//       memberLabel.innerHTML = `Member<br>#${index + 1}`; // Sätter Member och #, vi har index som börjar på 0 och ökar med 1 för varje användare

//       // Skapar en div för användarens namn och användarnamn
//       const userInfo = document.createElement("div");
//       userInfo.className = "user-info";
//       // Sätter in användarens namn och användarnamn i userInfo
//       userInfo.innerHTML = `<p>${user.firstName} ${user.lastName}<br>Username: ${user.username}</p>`;
//       userInfo.style.backgroundColor = user.color; // Sätter bakgrundsfärgen på userInfo till användarens färg

//       // Skapar en etikett för varje användare
//       userDiv.appendChild(memberLabel);
//       userDiv.appendChild(userInfo);

//       // Lägger till userDiv till i griden
//       grid.appendChild(userDiv);
//     });
//     // Hämtar container från index.html och lägger till griden där
//     document.querySelector(".container").appendChild(grid);
//   })
//   .catch((error) => {
//     console.error("Error fetching users:", error);
//   });
