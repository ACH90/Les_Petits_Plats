import RecipeCardFactory from "./factories/RecipeCardFactory.js";
import recipes from "./data/recipes.js";
import { handleChange, showXButton, handleClear } from "./utils/query_Utils.js";
import { filterAndMapRecipes } from "./utils/filterAndMapRecipes.js";

const Cardscontainer = document.querySelector("#recipes-container");
const mainSearchInput = document.querySelector("#search-bar");
const mainClearButton = document.querySelector("#clear-button");
const recipesCountContainer = document.querySelector("#recipe-count");
let mainQuerryValue = "";
let mainSearchValue = "";

const recipeFactory = new RecipeCardFactory();

const renderRecipes = (recipeList) => {
  Cardscontainer.innerHTML = "";

  recipesCountContainer.textContent = `${recipeList.length} recettes`;

  recipeList.forEach((recipe) => {
    const recipeCard = recipeFactory.createRecipeCard(recipe);
    Cardscontainer.appendChild(recipeCard);
  });
};

//Affichage des recettes initiales
renderRecipes(recipes);

//Ecouteur d'evenements sur la barre de recherche principale

mainSearchInput.addEventListener("input", (e) => {
  mainQuerryValue = e.target.value;
  mainSearchValue = handleChange(e, mainSearchValue);
  showXButton(mainClearButton, mainQuerryValue);
  const filteredRecipes = filterAndMapRecipes(recipes, mainSearchValue);
  renderRecipes(filteredRecipes);
  console.log("Voici mainSearchValue dans App handleChange", mainSearchValue);
});

mainClearButton.addEventListener("click", () => {
  handleClear(mainSearchInput); // Efface l'input visuellement
  mainQuerryValue = ""; // Réinitialise la variable manuellement

  // Masquer le bouton "X" après l'effacement
  showXButton(mainClearButton, mainQuerryValue);

  // Réafficher toutes les recettes après la réinitialisation
  renderRecipes(recipes);
});
