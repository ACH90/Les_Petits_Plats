import RecipeCardFactory from "./../factories/RecipeCardFactory.js";

const recipeFactory = new RecipeCardFactory();
const Cardscontainer = document.getElementById("recipes-container");
const errorContainer = document.createElement("div");
errorContainer.classList.add("no-results-message");
Cardscontainer.parentElement.appendChild(errorContainer);

export const renderRecipesByMap = (recipeList, query) => {
  Cardscontainer.innerHTML = "";
  const recipesCountContainer = document.getElementById("recipe-count");
  recipesCountContainer.textContent = `${recipeList.length} recettes`;

  // recipeList.forEach((recipe) => {
  //   const recipeCard = recipeFactory.createRecipeCard(recipe);
  //   Cardscontainer.appendChild(recipeCard);
  // });

  recipeList.map((recipe) => {
    const recipeCard = recipeFactory.createRecipeCard(recipe);
    Cardscontainer.appendChild(recipeCard);
  });

  if (recipeList.length === 0) {
    displayNoResultsMessage(query);
  }
};

export function displayNoResultsMessage(query) {
  // Display a custom error message with the user's query
  errorContainer.innerHTML = `
      <p>Aucune recette ne contient '${query}'</p>
  `;
}
