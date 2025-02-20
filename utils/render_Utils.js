import RecipeCardFactory from "./../factories/RecipeCardFactory.js";

const recipeFactory = new RecipeCardFactory();
const Cardscontainer = document.getElementById("recipes-container");

export const renderRecipes = (recipeList) => {
  Cardscontainer.innerHTML = "";
  const recipesCountContainer = document.getElementById("recipe-count");
  recipesCountContainer.textContent = `${recipeList.length} recettes`;

  recipeList.forEach((recipe) => {
    const recipeCard = recipeFactory.createRecipeCard(recipe);
    Cardscontainer.appendChild(recipeCard);
  });
};
