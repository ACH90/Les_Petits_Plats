import recipes from "./data/recipes.js";
import { handleChange, showXButton, handleClear } from "./utils/query_Utils.js";
import { filterAndMapRecipes } from "./utils/filterAndMapRecipes.js";
import {
  addTagToContainer,
  removeOptionFromDropdown,
} from "./utils/tag_Utils.js";
import { selectOptions, updateOptions } from "./utils/filter_Utils.js";
import { renderRecipes } from "./utils/render_Utils.js";

const mainSearchInput = document.getElementById("search-bar");
const mainClearButton = document.getElementById("clear-button");

let selectedIngredients = [];

const ingredientOptionsContainer = document.querySelector(
  ".ingredients-options"
);

let selectedAppliances = [];

const applianceOptionsContainer = document.querySelector(".appliances-options");

let selectedUstensils = [];

const ustensilOptionsContainer = document.querySelector(".ustensils-options");
let mainQuerryValue = "";
let mainSearchValue = "";

let ingredientQuerryValue = "";
let ingredientSearchValue = "";

let applianceQuerryValue = "";
let applianceSearchValue = "";

let ustensilQuerryValue = "";
let ustensilSearchValue = "";

let filteredRecipes = filterAndMapRecipes(
  recipes,
  mainSearchValue,
  selectedIngredients,
  selectedAppliances,
  selectedUstensils
);

let ingredients = [];
let appliances = [];
let ustensils = [];

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

        // renderRecipes
      );
      //Initialiser filteredRecipes

      filteredRecipes = [];
      // Mettre à jour les recettes avec les nouveaux filtres
      filteredRecipes = filterAndMapRecipes(
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
      renderRecipes(filteredRecipes);
    }
  });
};

//------------------------------------------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
  //Affichage des recettes initiales
  renderRecipes(filteredRecipes);
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
  const ingredientSearchInput = document.getElementById("ingredient-search");
  const ingredientClearButton = document.getElementById(
    "ingredient-clear-button"
  );
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
  const applianceSearchInput = document.getElementById("appliance-search");
  const applianceClearButton = document.getElementById(
    "appliance-clear-button"
  );
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
  const ustensilSearchInput = document.getElementById("ustensil-search");
  const ustensilClearButton = document.getElementById("ustensil-clear-button");
  ustensilSearchInput.addEventListener("input", (e) => {
    ustensilQuerryValue = e.target.value.toLowerCase();
    ustensilSearchValue = handleChange(e, ustensilSearchValue);

    showXButton(ustensilClearButton, ustensilQuerryValue);
    const filteredUstensils = ustensils.filter((ustensil) =>
      ustensil.toLowerCase().includes(ustensilQuerryValue)
    );
    displayOptions(ustensilOptionsContainer, filteredUstensils, "ustensils");
  });

  //la croix de la barre de recherche des ustensils

  ustensilClearButton.addEventListener("click", () => {
    handleClear(ustensilSearchInput);
    ingredientQuerryValue = "";
    showXButton(ustensilClearButton, ustensilQuerryValue);

    displayOptions(ustensilOptionsContainer, ustensils, "ustensils");
  });
});
