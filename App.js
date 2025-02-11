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
const applianceClearButton = document.getElementById("appliance-clear-button");

let ustensilQuerryValue = "";
let ustensilSearchValue = "";
const ustensilClearButton = document.getElementById("ustensil-clear-button");

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
    // Mettre à jour la valeur de la recherche
    ingredientQuerryValue = e.target.value.toLowerCase(); // Assurer une comparaison sans tenir compte de la casse
    ingredientSearchValue = handleChange(e, ingredientSearchValue);

    // Afficher/masquer le bouton 'X' selon la présence de texte dans le champ
    showXButton(ingredientClearButton, ingredientQuerryValue);

    // Filtrer les ingrédients selon la valeur de la recherche
    const filteredIngredients = ingredients.filter((ingredient) =>
      ingredient.toLowerCase().includes(ingredientQuerryValue)
    );

    // Afficher les options filtrées (mettre à jour l'interface utilisateur)
    displayOptions(ingredientOptionsContainer, filteredIngredients);

    console.log("Ingrédients filtrés:", filteredIngredients);
  });

  //Ecouteur d'evenements sur la croix de la barre de recherche des ingredients

  ingredientClearButton.addEventListener("click", () => {
    handleClear(ingredientSearchInput); // Efface l'input visuellement
    ingredientQuerryValue = ""; // Réinitialise la variable manuellement

    // Masquer le bouton "X" après l'effacement
    showXButton(ingredientClearButton, ingredientQuerryValue);

    displayOptions(ingredientOptionsContainer, ingredients);
  });

  //Ecouteur d'evenements sur la barre de recherche des appliances
  applianceSearchInput.addEventListener("input", (e) => {
    // Mettre à jour la valeur de la recherche
    applianceQuerryValue = e.target.value.toLowerCase(); // Assurer une comparaison sans tenir compte de la casse
    applianceSearchValue = handleChange(e, applianceSearchValue);

    // Afficher/masquer le bouton 'X' selon la présence de texte dans le champ
    showXButton(applianceClearButton, applianceQuerryValue);

    // Filtrer les ingrédients selon la valeur de la recherche
    const filteredAppliances = appliances.filter((appliance) =>
      appliance.toLowerCase().includes(applianceQuerryValue)
    );

    // Afficher les options filtrées (mettre à jour l'interface utilisateur)
    displayOptions(applianceOptionsContainer, filteredAppliances);

    console.log("Appareils filtrés:", filteredAppliances);
  });

  //Ecouteur d'evenements sur la croix de la barre de recherche des appliances

  applianceClearButton.addEventListener("click", () => {
    handleClear(applianceSearchInput); // Efface l'input visuellement
    applianceQuerryValue = ""; // Réinitialise la variable manuellement

    // Masquer le bouton "X" après l'effacement
    showXButton(applianceClearButton, applianceQuerryValue);

    displayOptions(applianceOptionsContainer, appliances);
  });

  //Ecouteur d'evenements sur la barre de recherche des ustensils
  ustensilSearchInput.addEventListener("input", (e) => {
    // Mettre à jour la valeur de la recherche
    ustensilQuerryValue = e.target.value.toLowerCase(); // Assurer une comparaison sans tenir compte de la casse
    ustensilSearchValue = handleChange(e, ustensilSearchValue);

    // Afficher/masquer le bouton 'X' selon la présence de texte dans le champ
    showXButton(ustensilClearButton, ustensilQuerryValue);

    // Filtrer les ingrédients selon la valeur de la recherche
    const filteredUstensils = ustensils.filter((ustensil) =>
      ustensil.toLowerCase().includes(ustensilQuerryValue)
    );

    // Afficher les options filtrées (mettre à jour l'interface utilisateur)
    displayOptions(ustensilOptionsContainer, filteredUstensils);

    console.log("Ingrédients filtrés:", filteredUstensils);
  });

  //Ecouteur d'evenements sur la croix de la barre de recherche des ingredients

  ustensilClearButton.addEventListener("click", () => {
    handleClear(ustensilSearchInput); // Efface l'input visuellement
    ingredientQuerryValue = ""; // Réinitialise la variable manuellement

    // Masquer le bouton "X" après l'effacement
    showXButton(ustensilClearButton, ustensilQuerryValue);

    displayOptions(ustensilOptionsContainer, ustensils);
  });
});
