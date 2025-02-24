import recipes from "./data/recipes.js";
import { handleChange, showXButton, handleClear } from "./utils/query_Utils.js";
import { filterRecipes } from "./utils/filterAndMapRecipes.js";
import {
  addTagToContainer,
  removeOptionFromDropdown,
} from "./utils/tag_Utils.js";
import { selectOptions, updateOptions } from "./utils/filter_Utils.js";
import { renderRecipesByMap } from "./utils/render_Utils.js";

//------------------------------------------------------

let selectedIngredients = [];
const ingredientOptionsContainer = document.querySelector(
  ".ingredients-options"
);

let selectedAppliances = [];
const applianceOptionsContainer = document.querySelector(".appliances-options");

let selectedUstensils = [];
const ustensilOptionsContainer = document.querySelector(".ustensils-options");

let mainSearchValue = "";
let mainQuerryValue = "";

let ingredientSearchValue = "";

let applianceSearchValue = "";

let ustensilSearchValue = "";

let ingredients = [];
let appliances = [];
let ustensils = [];

let filteredRecipes = filterRecipes(
  recipes,
  mainSearchValue,
  selectedIngredients,
  selectedAppliances,
  selectedUstensils
);
//------------------------------------------------------------------------------------------------------------

const displayOptions = (optionsContainer, options, category) => {
  optionsContainer.innerText = ""; // Effacer le contenu du conteneur

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
    const optionToTag = clickedOption.textContent.toLowerCase();

    if (clickedOption.classList.contains("dropdown-item")) {
      selectOptions(
        category,
        optionToTag,
        selectedIngredients,
        selectedAppliances,
        selectedUstensils
      );

      addTagToContainer(
        optionToTag,
        category,
        selectedIngredients,
        selectedAppliances,
        selectedUstensils,
        filteredRecipes,
        mainSearchValue,
        ingredients,
        appliances,
        ustensils,
        ingredientOptionsContainer,
        applianceOptionsContainer,
        ustensilOptionsContainer,
        displayOptions
      );

      //Initialiser filteredRecipes
      filteredRecipes = [];

      // Mettre à jour les recettes avec les nouveaux filtres
      filteredRecipes = filterRecipes(
        recipes,
        mainSearchValue,
        selectedIngredients,
        selectedAppliances,
        selectedUstensils
      );

      updateOptions(ingredients, appliances, ustensils, filteredRecipes);

      // Appeler displayOptions après avoir mis à jour les filtres
      displayOptions(ingredientOptionsContainer, ingredients, "ingredients");
      displayOptions(applianceOptionsContainer, appliances, "appliances");
      displayOptions(ustensilOptionsContainer, ustensils, "ustensils");
      removeOptionFromDropdown(optionToTag, category);
      renderRecipesByMap(filteredRecipes, mainSearchValue);
    }
  });
};

//------------------------------------------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
  //Affichage des recettes initiales
  renderRecipesByMap(filteredRecipes, mainSearchValue);
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

  //------------------------------ECOUTEURS D'EVENNEMENTS--------------------------------------------------------------

  //---------------------------------------la barre de recherche principale
  const mainSearchInput = document.getElementById("search-bar");
  const mainClearButton = document.getElementById("clear-button");

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
    filteredRecipes = filterRecipes(
      recipes,
      mainSearchValue,
      selectedIngredients,
      selectedAppliances,
      selectedUstensils
    );
    renderRecipesByMap(filteredRecipes, mainSearchValue);
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
    renderRecipesByMap(recipes, mainSearchValue);
    updateOptions(ingredients, appliances, ustensils, recipes);
    displayOptions(ingredientOptionsContainer, ingredients, "ingredients");
    displayOptions(applianceOptionsContainer, appliances, "appliances");
    displayOptions(ustensilOptionsContainer, ustensils, "ustensils");
  });

  //-----------------------------------------------------Les Catégories

  //la barre de recherche des ingredients
  const ingredientSearchInput = document.getElementById("ingredient-search");
  const ingredientClearButton = document.getElementById(
    "ingredient-clear-button"
  );
  const ingredientSearchGlass = document.getElementById(
    "ingredient-search-icon"
  );
  let ingredientQuerryValue = "";
  ingredientSearchInput.addEventListener("input", (e) => {
    // Mettre à jour la valeur de la recherche
    ingredientQuerryValue = e.target.value.toLowerCase(); // Assurer une comparaison sans tenir compte de la casse
    ingredientSearchValue = handleChange(e, ingredientSearchValue);

    // Afficher/masquer le bouton 'X' selon la présence de texte dans le champ
    showXButton(
      ingredientClearButton,
      ingredientQuerryValue,
      ingredientSearchGlass
    );

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
  });

  //la croix de la barre de recherche des ingredients

  ingredientClearButton.addEventListener("click", () => {
    handleClear(ingredientSearchInput); // Efface l'input visuellement
    ingredientQuerryValue = ""; // Réinitialise la variable manuellement

    // Masquer le bouton "X" après l'effacement
    showXButton(
      ingredientClearButton,
      ingredientQuerryValue,
      ingredientSearchGlass
    );

    displayOptions(ingredientOptionsContainer, ingredients, "ingredients");
  });

  //la barre de recherche des appliances
  const applianceSearchInput = document.getElementById("appliance-search");
  const applianceClearButton = document.getElementById(
    "appliance-clear-button"
  );
  const applianceSearchGlass = document.getElementById("appliance-search-icon");
  let applianceQuerryValue = "";
  applianceSearchInput.addEventListener("input", (e) => {
    applianceQuerryValue = e.target.value.toLowerCase();
    applianceSearchValue = handleChange(e, applianceSearchValue);

    showXButton(
      applianceClearButton,
      applianceQuerryValue,
      applianceSearchGlass
    );

    const filteredAppliances = appliances.filter((appliance) =>
      appliance.toLowerCase().includes(applianceQuerryValue)
    );
    displayOptions(applianceOptionsContainer, filteredAppliances, "appliances");
  });

  //la croix de la barre de recherche des appliances

  applianceClearButton.addEventListener("click", () => {
    handleClear(applianceSearchInput);
    applianceQuerryValue = "";

    showXButton(
      applianceClearButton,
      applianceQuerryValue,
      applianceSearchGlass
    );
    displayOptions(applianceOptionsContainer, appliances, "appliances");
  });

  //la barre de recherche des ustensils
  const ustensilSearchInput = document.getElementById("ustensil-search");
  const ustensilClearButton = document.getElementById("ustensil-clear-button");
  const ustensilSearchGlass = document.getElementById("ustensil-search-icon");
  let ustensilQuerryValue = "";
  ustensilSearchInput.addEventListener("input", (e) => {
    ustensilQuerryValue = e.target.value.toLowerCase();
    ustensilSearchValue = handleChange(e, ustensilSearchValue);

    showXButton(ustensilClearButton, ustensilQuerryValue, ustensilSearchGlass);
    const filteredUstensils = ustensils.filter((ustensil) =>
      ustensil.toLowerCase().includes(ustensilQuerryValue)
    );
    displayOptions(ustensilOptionsContainer, filteredUstensils, "ustensils");
  });

  //la croix de la barre de recherche des ustensils
  ustensilClearButton.addEventListener("click", () => {
    handleClear(ustensilSearchInput);
    ustensilQuerryValue = "";
    showXButton(ustensilClearButton, ustensilQuerryValue, ustensilSearchGlass);

    displayOptions(ustensilOptionsContainer, ustensils, "ustensils");
  });
});
