import RecipeCardFactory from "./factories/RecipeCardFactory.js";
import recipes from "./data/recipes.js";
import { handleChange, showXButton, handleClear } from "./utils/query_Utils.js";
import { filterAndMapRecipes } from "./utils/filterAndMapRecipes.js";
import {
  getAllIngredients,
  getAllAppliances,
  getAllUstensils,
} from "./utils/filter_Utils.js";

const Cardscontainer = document.getElementById("recipes-container");
const mainSearchInput = document.getElementById("search-bar");
const mainClearButton = document.getElementById("clear-button");
const recipesCountContainer = document.getElementById("recipe-count");

let ingredientOptions = [""];
const ingredientSearchInput = document.getElementById("ingredient-search");
const ingredientOptionsContainer = document.querySelector(
  ".ingredient-options"
);

let applianceOptions = [""];
const applianceSearchInput = document.getElementById("appliance-search");
const applianceOptionsContainer = document.querySelector(".appliance-options");

let ustensilOptions = [""];
const ustensilSearchInput = document.getElementById("ustensil-search");
const ustensilOptionsContainer = document.querySelector(".ustensil-options");
let mainQuerryValue = "";
let mainSearchValue = "";

let filteredRecipes = recipes;
const recipeFactory = new RecipeCardFactory();

const renderRecipes = (recipeList) => {
  Cardscontainer.innerHTML = "";

  recipesCountContainer.textContent = `${recipeList.length} recettes`;

  recipeList.forEach((recipe) => {
    const recipeCard = recipeFactory.createRecipeCard(recipe);
    Cardscontainer.appendChild(recipeCard);
  });
  console.log("Voici recipeList", recipeList);
};

const updateOptions = () => {
  ingredientOptions = [""];
  applianceOptions = [""];
  ustensilOptions = [""];
  console.log("voici ingredientOptions initialisé", ingredientOptions);
  ingredientOptions = getAllIngredients(filteredRecipes);
  console.log("voici ingredientOptions", ingredientOptions);

  applianceOptions = getAllAppliances(filteredRecipes);
  ustensilOptions = getAllUstensils(filteredRecipes);
  //Afficher ingredientOptions
  ingredientOptionsContainer.innerText = "";
  ingredientOptions.forEach((option) => {
    const optionElement = document.createElement("option");
    optionElement.value = option;
    optionElement.textContent = option;
    ingredientOptionsContainer.appendChild(optionElement);
  });

  //Afficher applianceOptions
  applianceOptionsContainer.innerText = "";
  applianceOptions.forEach((option) => {
    const optionElement = document.createElement("option");
    optionElement.value = option;
    optionElement.textContent = option;
    applianceOptionsContainer.appendChild(optionElement);
  });

  //Afficher ustensilOptions
  ustensilOptionsContainer.innerText = "";
  ustensilOptions.forEach((option) => {
    const optionElement = document.createElement("option");
    optionElement.value = option;
    optionElement.textContent = option;
    ustensilOptionsContainer.appendChild(optionElement);
  });
};

//Affichage des recettes initiales
renderRecipes(filteredRecipes);

//Affichage des options de recherche
updateOptions();

//Ecouteur d'evenements sur la barre de recherche principale

mainSearchInput.addEventListener("input", (e) => {
  mainQuerryValue = e.target.value;
  mainSearchValue = handleChange(e, mainSearchValue);
  showXButton(mainClearButton, mainQuerryValue);
  filteredRecipes = filterAndMapRecipes(recipes, mainSearchValue);
  renderRecipes(filteredRecipes);
  console.log("Voici mainSearchValue dans App handleChange", mainSearchValue);
  console.log("Voici filteredRecipes dans ecouteur d'event", filteredRecipes);
  updateOptions();
});

mainClearButton.addEventListener("click", () => {
  handleClear(mainSearchInput); // Efface l'input visuellement
  mainQuerryValue = ""; // Réinitialise la variable manuellement

  // Masquer le bouton "X" après l'effacement
  showXButton(mainClearButton, mainQuerryValue);

  // Réafficher toutes les recettes après la réinitialisation
  renderRecipes(recipes);
});
