import { UnselectOptions, updateOptions } from "./filter_Utils.js";
import { filterRecipes } from "./filterAndMapRecipes.js";
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
  });
  selectedTagsContainer.appendChild(tagElement);
}

export function removeOptionFromDropdown(tagText, selector) {
  const dropdownContainer = document.querySelector(`.${selector}-options`); // Get dropdown container by selector

  const options = Array.from(dropdownContainer.children); // Get all dropdown options
  // Find the option matching the selected tag text
  const optionToRemove = options.find(
    (option) => option.textContent.trim() === tagText.trim()
  );

  if (optionToRemove) {
    dropdownContainer.removeChild(optionToRemove); // Remove the option from the dropdown
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
