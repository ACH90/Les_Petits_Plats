import RecipeCardFactory from "./factories/RecipeCardFactory.js";
import recipes from "./data/recipes.js";
import { handleChange, showXButton, handleClear } from "./utils/query_Utils.js";
import { filterAndMapRecipes } from "./utils/filterAndMapRecipes.js";
import {
  //   getAllIngredients,
  //   getAllAppliances,
  //   getAllUstensils,
  //   updateOptions,
  //   getAllOptions,
  getOptionValues,
  updateOptions,
  displayOptions,
} from "./utils/filter_Utils.js";
import { addTag, removeTag } from "./utils/tag_Utils.js";

const Cardscontainer = document.getElementById("recipes-container");
const mainSearchInput = document.getElementById("search-bar");
const mainClearButton = document.getElementById("clear-button");
const recipesCountContainer = document.getElementById("recipe-count");

const ingredientsSet = new Set();
let ingredientOptions = [""];
let selectedIngredients = [""];
const ingredientSearchInput = document.getElementById("ingredient-search");
const ingredientOptionsContainer = document.querySelector(
  ".ingredient-options"
);

const appliancesSet = new Set();
let applianceOptions = [""];
let selectedAppliances = [];
const applianceSearchInput = document.getElementById("appliance-search");
const applianceOptionsContainer = document.querySelector(".appliance-options");

const ustensilsSet = new Set();
let ustensilOptions = [""];
let selectedUstensils;
const ustensilSearchInput = document.getElementById("ustensil-search");
const ustensilOptionsContainer = document.querySelector(".ustensil-options");
let mainQuerryValue = "";
let mainSearchValue = "";

let ingredientQuerryValue = "";
let ingredientSearchValue = "";
const ingredientClearButton = document.getElementById(
  "ingredient-clear-button"
);

let applianceQuerryValue = "";
let applianceSearchValue = "";

let ustensilQuerryValue = "";
let ustensilSearchValue = "";

let filteredRecipes = recipes;
const recipeFactory = new RecipeCardFactory();
const selectedTagsContainer = document.getElementById("selectedTags");

let ingredients = [];
let appliances = [];
let ustensils = [];

//------------------------------------------------------------------------------------------------------------

const renderRecipes = (recipeList) => {
  Cardscontainer.innerHTML = "";

  recipesCountContainer.textContent = `${recipeList.length} recettes`;

  recipeList.forEach((recipe) => {
    const recipeCard = recipeFactory.createRecipeCard(recipe);
    Cardscontainer.appendChild(recipeCard);
  });
  console.log("Voici recipeList", recipeList);
};

//------------------------------------------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
  //Affichage des recettes initiales
  renderRecipes(filteredRecipes);

  updateOptions(ingredients, appliances, ustensils, filteredRecipes);

  displayOptions(ingredientOptionsContainer, ingredients);
  displayOptions(applianceOptionsContainer, appliances);
  displayOptions(ustensilOptionsContainer, ustensils);

  //   displayOptions(
  //     ingredientOptionsContainer,
  //     ingredients,
  //     selectedIngredients,
  //     applianceOptionsContainer,
  //     appliances,
  //     selectedAppliances,
  //     ustensilOptionsContainer,
  //     ustensils,
  //     selectedUstensils,
  //     filteredRecipes,
  //     mainSearchValue,
  //     filterAndMapRecipes,
  //     updateOptions,
  //     renderRecipes
  //   );

  //--------------------------------------------------------------------------------------------

  //Ecouteur d'evenements sur la barre de recherche principale

  mainSearchInput.addEventListener("input", (e) => {
    mainQuerryValue = e.target.value;
    mainSearchValue = handleChange(
      e,
      mainSearchValue,
      selectedIngredients,
      selectedAppliances,
      selectedUstensils
    );
    showXButton(mainClearButton, mainQuerryValue);
    filteredRecipes = filterAndMapRecipes(recipes, mainSearchValue);
    renderRecipes(filteredRecipes);
    console.log("Voici mainSearchValue dans App handleChange", mainSearchValue);
    console.log("Voici filteredRecipes dans ecouteur d'event", filteredRecipes);
    updateOptions(ingredients, appliances, ustensils, filteredRecipes);
    displayOptions(ingredientOptionsContainer, ingredients);
    displayOptions(applianceOptionsContainer, appliances);
    displayOptions(ustensilOptionsContainer, ustensils);
  });

  mainClearButton.addEventListener("click", () => {
    handleClear(mainSearchInput); // Efface l'input visuellement
    mainQuerryValue = ""; // Réinitialise la variable manuellement

    // Masquer le bouton "X" après l'effacement
    showXButton(mainClearButton, mainQuerryValue);

    // Réafficher toutes les recettes après la réinitialisation
    renderRecipes(recipes);
    updateOptions(ingredients, appliances, ustensils, recipes);
    displayOptions(ingredientOptionsContainer, ingredients);
    displayOptions(applianceOptionsContainer, appliances);
    displayOptions(ustensilOptionsContainer, ustensils);
  });

  //Ecouteur d'evenements sur la barre de recherche des ingredients
  ingredientSearchInput.addEventListener("input", (e) => {
    ingredientQuerryValue = [""];
    ingredientQuerryValue = e.target.value;
    ingredientSearchValue = handleChange(e, ingredientSearchValue);
    showXButton(ingredientClearButton, ingredientQuerryValue);
    let filteredIngredientOptions = filterAndMapRecipes(
      recipes,
      ingredientSearchValue
    );
    //   updateOptions();
    console.log(
      "Voici filteredIngredientOptions dans ecouteur d'event",
      filteredIngredientOptions
    );
  });

  //Ecouteur d'evenements sur la croix de la barre de recherche des ingredients

  ingredientClearButton.addEventListener("click", () => {
    handleClear(ingredientSearchInput); // Efface l'input visuellement
    ingredientQuerryValue = ""; // Réinitialise la variable manuellement

    // Masquer le bouton "X" après l'effacement
    showXButton(ingredientClearButton, ingredientQuerryValue);

    // Réafficher toutes les recettes après la réinitialisation
    //   getAllIngredients(filteredRecipes);
  });
});
