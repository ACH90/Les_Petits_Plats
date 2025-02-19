import RecipeCardFactory from "./factories/RecipeCardFactory.js";
import recipes from "./data/recipes.js";
import { handleChange, showXButton, handleClear } from "./utils/query_Utils.js";
import { filterAndMapRecipes } from "./utils/filterAndMapRecipes.js";
import { addTag, removeTag } from "./utils/tag_Utils.js";
import { selectOptions, updateOptions } from "./utils/filter_Utils.js";

const Cardscontainer = document.getElementById("recipes-container");
const mainSearchInput = document.getElementById("search-bar");
const mainClearButton = document.getElementById("clear-button");
const recipesCountContainer = document.getElementById("recipe-count");

const ingredientsSet = new Set();
let ingredientOptions = [""];
let selectedIngredients = [];
const ingredientSearchInput = document.getElementById("ingredient-search");
const ingredientOptionsContainer = document.querySelector(
  ".ingredients-options"
);

const appliancesSet = new Set();
let applianceOptions = [""];
let selectedAppliances = [];
const applianceSearchInput = document.getElementById("appliance-search");
const applianceOptionsContainer = document.querySelector(".appliances-options");

const ustensilsSet = new Set();
let ustensilOptions = [""];
let selectedUstensils = [];
const ustensilSearchInput = document.getElementById("ustensil-search");
const ustensilOptionsContainer = document.querySelector(".ustensils-options");
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

let filteredRecipes = filterAndMapRecipes(
  recipes,
  mainSearchValue,
  selectedIngredients,
  selectedAppliances,
  selectedUstensils
);
const recipeFactory = new RecipeCardFactory();
const selectedTagsContainer = document.getElementById("selectedTags");

let ingredients = [];
let appliances = [];
let ustensils = [];

const optionElement = "";
let optionsListes = "";

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

const displayOptions = (optionsContainer, options, category) => {
  optionsContainer.innerText = ""; // Effacer le contenu du conteneur
  console.log("category dans displayOptions:", category);

  options.forEach((option) => {
    const optionElement = document.createElement("li");
    optionElement.classList.add("dropdown-item");
    optionElement.textContent = option;
    optionElement.setAttribute("data-category", category);
    optionsContainer.appendChild(optionElement);
  });

  // Un seul écouteur d'événements pour tout le conteneur
  optionsContainer.addEventListener("click", (event) => {
    const clickedOption = event.target;
    const option = clickedOption.textContent.toLowerCase();

    console.log("option", option);
    if (clickedOption.classList.contains("dropdown-item")) {
      addTag(
        option,
        category,
        selectedIngredients,
        selectedTagsContainer,
        removeTag
        // updateFiltersCallback
      );
      selectOptions(
        clickedOption,
        selectedIngredients,
        selectedAppliances,
        selectedUstensils
      );

      // Mettre à jour les recettes avec les nouveaux filtres
      filteredRecipes = filterAndMapRecipes(
        filteredRecipes,
        mainSearchValue,
        selectedIngredients,
        selectedAppliances,
        selectedUstensils
      );
      console.log("filteredRecipes après le clic :", filteredRecipes);
      renderRecipes(filteredRecipes);
      updateOptions(ingredients, appliances, ustensils, filteredRecipes);

      // Appeler displayOptions après avoir mis à jour les filtres
      displayOptions(ingredientOptionsContainer, ingredients, "ingredients");
      displayOptions(applianceOptionsContainer, appliances, "appliances");
      displayOptions(ustensilOptionsContainer, ustensils, "ustensils");
    }
  });
};

//------------------------------------------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
  //Affichage des recettes initiales
  renderRecipes(filteredRecipes);

  console.log("Voici filteredRecipes", filteredRecipes);
  updateOptions(ingredients, appliances, ustensils, filteredRecipes);

  displayOptions(
    ingredientOptionsContainer, // Conteneur pour les options des ingrédients
    ingredients, // Liste des ingrédients
    "ingredients" // La catégorie de filtre : ici 'ingredients'
  );

  displayOptions(
    applianceOptionsContainer, // Conteneur pour les options des appareils
    appliances, // Liste des appareils
    "appliances" // La catégorie de filtre : ici 'appliances'
  );

  displayOptions(
    ustensilOptionsContainer, // Conteneur pour les options des ustensiles
    ustensils, // Liste des ustensiles
    "ustensils" // La catégorie de filtre : ici 'ustensils'
  );

  let optionElements = document.querySelectorAll(".dropdown-item");

  //------------------------------ECOUTEURS D'EVENNEMENTS--------------------------------------------------------------

  //---------------------------------------la barre de recherche principale

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
    filteredRecipes = filterAndMapRecipes(
      recipes,
      mainSearchValue,
      selectedIngredients,
      selectedAppliances,
      selectedUstensils
    );
    renderRecipes(filteredRecipes);
    console.log("Voici mainSearchValue dans App handleChange", mainSearchValue);
    console.log("Voici filteredRecipes dans ecouteur d'event", filteredRecipes);
    updateOptions(ingredients, appliances, ustensils, filteredRecipes);
    displayOptions(ingredientOptionsContainer, ingredients, "ingredients");
    displayOptions(applianceOptionsContainer, appliances, "appliances");
    displayOptions(ustensilOptionsContainer, ustensils, "ustensils");
  });

  mainClearButton.addEventListener("click", () => {
    handleClear(mainSearchInput); // Efface l'input visuellement
    mainQuerryValue = ""; // Réinitialise la variable manuellement

    // Masquer le bouton "X" après l'effacement
    showXButton(mainClearButton, mainQuerryValue);

    // Réafficher toutes les recettes après la réinitialisation
    renderRecipes(recipes);
    updateOptions(ingredients, appliances, ustensils, recipes);
    displayOptions(ingredientOptionsContainer, ingredients, "ingredients");
    displayOptions(applianceOptionsContainer, appliances, "appliances");
    displayOptions(ustensilOptionsContainer, ustensils, "ustensils");
  });

  //-----------------------------------------------------Les Catégories

  //la barre de recherche des ingredients
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
    displayOptions(
      ingredientOptionsContainer,
      filteredIngredients,
      "ingredients"
    );

    console.log("Ingrédients filtrés:", filteredIngredients);
  });

  //la croix de la barre de recherche des ingredients

  ingredientClearButton.addEventListener("click", () => {
    handleClear(ingredientSearchInput); // Efface l'input visuellement
    ingredientQuerryValue = ""; // Réinitialise la variable manuellement

    // Masquer le bouton "X" après l'effacement
    showXButton(ingredientClearButton, ingredientQuerryValue);

    displayOptions(ingredientOptionsContainer, ingredients, "ingredients");
  });

  //la barre de recherche des appliances
  applianceSearchInput.addEventListener("input", (e) => {
    applianceQuerryValue = e.target.value.toLowerCase();
    applianceSearchValue = handleChange(e, applianceSearchValue);

    showXButton(applianceClearButton, applianceQuerryValue);

    const filteredAppliances = appliances.filter((appliance) =>
      appliance.toLowerCase().includes(applianceQuerryValue)
    );
    displayOptions(applianceOptionsContainer, filteredAppliances, "appliances");

    console.log("Appareils filtrés:", filteredAppliances);
  });

  //la croix de la barre de recherche des appliances

  applianceClearButton.addEventListener("click", () => {
    handleClear(applianceSearchInput);
    applianceQuerryValue = "";

    showXButton(applianceClearButton, applianceQuerryValue);
    displayOptions(applianceOptionsContainer, appliances, "appliances");
  });

  //la barre de recherche des ustensils
  ustensilSearchInput.addEventListener("input", (e) => {
    ustensilQuerryValue = e.target.value.toLowerCase();
    ustensilSearchValue = handleChange(e, ustensilSearchValue);

    showXButton(ustensilClearButton, ustensilQuerryValue);
    const filteredUstensils = ustensils.filter((ustensil) =>
      ustensil.toLowerCase().includes(ustensilQuerryValue)
    );
    displayOptions(ustensilOptionsContainer, filteredUstensils, "ustensils");

    console.log("Ustensils filtrés:", filteredUstensils);
  });

  //la croix de la barre de recherche des ustensils

  ustensilClearButton.addEventListener("click", () => {
    handleClear(ustensilSearchInput);
    ingredientQuerryValue = "";
    showXButton(ustensilClearButton, ustensilQuerryValue);

    displayOptions(ustensilOptionsContainer, ustensils, "ustensils");
  });
});
