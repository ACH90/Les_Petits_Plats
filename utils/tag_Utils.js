import { UnselectOptions, updateOptions } from "./filter_Utils.js";
import { filterRecipes } from "./filterRecipes.js";
import { renderRecipesByMap } from "./render_Utils.js";
import recipes from "./../data/recipes.js";

const selectedTagsContainer = document.getElementById("selectedTags");
let selectedTags = [];
export function addTagToContainer(
  tagText,
  selector,
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
  displayOptions,
  Cardscontainer
) {
  if (selectedTags.includes(tagText)) {
    return;
  } // Si le tag existe déja, on ne fait rien

  selectedTags.push(tagText);

  const tagElement = document.createElement("div");
  tagElement.classList.add("tag");
  tagElement.innerHTML = `<span>${tagText}</span><button>x</button>`;

  tagElement.querySelector("button").addEventListener("click", (event) => {
    const tagTextToDelete =
      event.target.parentElement.querySelector("span").textContent;

    removeTagFromContainer(tagTextToDelete, tagElement);

    UnselectOptions(
      selector,
      tagTextToDelete,
      selectedIngredients,
      selectedAppliances,
      selectedUstensils
    );

    filteredRecipes = filterRecipes(
      recipes,
      mainSearchValue,
      selectedIngredients,
      selectedAppliances,
      selectedUstensils
    );

    renderRecipesByMap(filteredRecipes, Cardscontainer);

    updateOptions(ingredients, appliances, ustensils, filteredRecipes);
    displayOptions(ingredientOptionsContainer, ingredients, "ingredients");
    displayOptions(applianceOptionsContainer, appliances, "appliances");
    displayOptions(ustensilOptionsContainer, ustensils, "ustensils");
    removeOptionFromDropdown(
      selectedIngredients,
      selectedAppliances,
      selectedUstensils
    );
  });
  selectedTagsContainer.appendChild(tagElement);
}

export function removeOptionFromDropdown(
  selectedIngredients,
  selectedAppliances,
  selectedUstensils
) {
  // Sélection des containers des dropdowns
  const ingredientOptionsContainer = document.querySelector(
    ".ingredients-options"
  );
  const applianceOptionsContainer = document.querySelector(
    ".appliances-options"
  );
  const ustensilOptionsContainer = document.querySelector(".ustensils-options");

  // Supprimer les ingrédients sélectionnés du dropdown des ingrédients
  removeMultipleOptions(ingredientOptionsContainer, selectedIngredients);

  // Supprimer les appareils sélectionnés du dropdown des appareils
  removeMultipleOptions(applianceOptionsContainer, selectedAppliances);

  // Supprimer les ustensiles sélectionnés du dropdown des ustensiles
  removeMultipleOptions(ustensilOptionsContainer, selectedUstensils);
}

// Fonction pour supprimer plusieurs options d'un dropdown donné
function removeMultipleOptions(dropdownContainer, selectedItems) {
  if (!dropdownContainer) return; // Sécurité si le conteneur n'existe pas

  const options = Array.from(dropdownContainer.children);

  for (const item of selectedItems) {
    for (let i = 0; i < options.length; i++) {
      if (options[i].textContent.trim() === item.trim()) {
        dropdownContainer.removeChild(options[i]);
        break; // Supprime uniquement la première occurrence pour éviter des doublons
      }
    }
  }
}

export function removeTagFromContainer(tagText, tagElement) {
  const index = selectedTags.indexOf(tagText);
  if (index !== -1) {
    selectedTags.splice(index, 1);
  }
  selectedTagsContainer.removeChild(tagElement); // Remove the tag from the tag container
  return selectedTags; // Return updated selectedTags
}

export function addOptionToDropdown(tagText, selector, addTagCallback) {
  const dropdownContainer = document.querySelector(`.${selector}-options`);
  const option = document.createElement("li");
  option.textContent = tagText;
  option.classList.add("dropdown-item");
  option.addEventListener("click", () => addTagCallback(tagText, selector));

  dropdownContainer.appendChild(option);
}
