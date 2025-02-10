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
let selectedIngredients = [""];
const ingredientSearchInput = document.getElementById("ingredient-search");
const ingredientOptionsContainer = document.querySelector(
  ".ingredient-options"
);

let applianceOptions = [""];
let selectedAppliances = [];
const applianceSearchInput = document.getElementById("appliance-search");
const applianceOptionsContainer = document.querySelector(".appliance-options");

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

const updateOptions = () => {
  ingredientOptions = [""];
  applianceOptions = [""];
  ustensilOptions = [""];
  console.log("voici ingredientOptions initialisé", ingredientOptions);
  ingredientOptions = getAllIngredients(filteredRecipes);
  console.log("voici ingredientOptions", ingredientOptions);

  applianceOptions = getAllAppliances(filteredRecipes);
  console.log("voici applianceOptions", applianceOptions);

  ustensilOptions = getAllUstensils(filteredRecipes);
  console.log("voici ustensilOptions", ustensilOptions);

  //Afficher ingredientOptions
  ingredientOptionsContainer.innerText = "";
  ingredientOptions.forEach((option) => {
    const optionElement = document.createElement("li");
    optionElement.classList.add("dropdown-item");

    optionElement.textContent = option; // Correct
    ingredientOptionsContainer.appendChild(optionElement);

    optionElement.addEventListener("click", () => {
      console.log("Voici optionElement", optionElement.textContent);

      let value = optionElement.textContent.trim(); // Assurer une chaîne propre
      if (value && !selectedIngredients.includes(value)) {
        selectedIngredients.push(value); // Ajouter à selectedIngredients
      }

      console.log("Voici selectedIngredients", selectedIngredients);

      filteredRecipes = filterAndMapRecipes(
        filteredRecipes,
        mainSearchValue,
        selectedIngredients,
        selectedAppliances,
        selectedUstensils
      );

      console.log("Voici filteredRecipes dans updateOptions", filteredRecipes);
      renderRecipes(filteredRecipes);
    });
  });

  //Afficher applianceOptions
  applianceOptionsContainer.innerText = "";
  applianceOptions.forEach((option) => {
    const optionElement = document.createElement("li");
    optionElement.classList.add("dropdown-item");
    optionElement.textContent = option; // Correct
    applianceOptionsContainer.appendChild(optionElement);

    optionElement.addEventListener("click", () => {
      let value = optionElement.textContent.trim(); // Assurer une chaîne propre
      if (value && !selectedAppliances.includes(value)) {
        selectedAppliances.push(value); // Ajouter à selectedAppliances
      }

      console.log("Voici selectedAppliances", selectedAppliances);

      filteredRecipes = filterAndMapRecipes(
        filteredRecipes,
        mainSearchValue,
        selectedIngredients,
        selectedAppliances,
        selectedUstensils
      );

      console.log("Voici filteredRecipes dans updateOptions", filteredRecipes);
      renderRecipes(filteredRecipes);
    });
  });

  //Afficher ustensilOptions
  ustensilOptionsContainer.innerText = "";
  ustensilOptions.forEach((option) => {
    const optionElement = document.createElement("li");
    optionElement.classList.add("dropdown-item");
    optionElement.textContent = option; // Correct
    ustensilOptionsContainer.appendChild(optionElement);

    optionElement.addEventListener("click", () => {
      let value = optionElement.textContent.trim(); // Assurer une chaîne propre
      if (value && !selectedUstensils.includes(value)) {
        selectedUstensils.push(value); // Ajouter à selectedUstensils
      }

      console.log("Voici selectedUstensils", selectedUstensils);

      filteredRecipes = filterAndMapRecipes(
        filteredRecipes,
        mainSearchValue,
        selectedIngredients,
        selectedAppliances,
        selectedUstensils
      );

      console.log("Voici filteredRecipes dans updateOptions", filteredRecipes);
      renderRecipes(filteredRecipes);
    });
  });
};

//Affichage des recettes initiales
renderRecipes(filteredRecipes);

//Affichage des options de recherche
updateOptions();

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
  updateOptions();
  console.log(
    "Voici filteredIngredientOptions dans ecouteur d'event",
    filteredIngredientOptions
  );
});

ingredientClearButton.addEventListener("click", () => {
  handleClear(ingredientSearchInput); // Efface l'input visuellement
  ingredientQuerryValue = ""; // Réinitialise la variable manuellement

  // Masquer le bouton "X" après l'effacement
  showXButton(ingredientClearButton, ingredientQuerryValue);

  // Réafficher toutes les recettes après la réinitialisation
  getAllIngredients(filteredRecipes);
});
