const url = "http://localhost:3000/recipe";

fetch(url)
  .then((response) => response.json())
  .then((recipe) => {
    const recipeList = document.createElement("ul");

    users.forEach((recipe) => {
      const recipeList = document.createElement("li");

      recipeList.innerHTML = `<p>Name: ${recipe.recipeName}  ${recipe.recipeDescription}
      <br> Username: ${user.username} <br>Favorit color: ${user.color} </p>`;
      console.log(user);

      userList.appendChild(recipeList);
    });
    document.body.appendChild(userList);
  });
