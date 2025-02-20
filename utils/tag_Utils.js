// Function to add a tag to the selected tags array and update the UI
import { UnselectOptions, updateOptions } from "./filter_Utils.js";
import { filterAndMapRecipes } from "./filterAndMapRecipes.js";
import { renderRecipes } from "./render_Utils.js";
import recipes from "./../data/recipes.js";
export function addTagToContainer(
  tagText,
  selector,
  selectedTags,
  tagContainerUnified,
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
  // updateFiltersCallback
) {
  if (selectedTags.includes(tagText)) {
    return;
  } // If the tag is already selected, return

  selectedTags.push(tagText); // Add tag to the selected tags array

  const tagElement = document.createElement("div");
  tagElement.classList.add("tag");
  tagElement.innerHTML = `<span>${tagText}</span><button>x</button>`; // Add the tag text and a remove button

  // Add event listener to the remove button
  tagElement.querySelector("button").addEventListener("click", (event) => {
    const tagTextToDelete =
      event.target.parentElement.querySelector("span").textContent;
    console.log("tagTextToDelete", tagTextToDelete);

    removeTagFromContainer(
      tagTextToDelete,
      selectedTags,
      tagContainerUnified,
      tagElement
    );
    console.log(
      "✔️ selectedIngredients dans addToContainer 1:",
      selectedIngredients
    );
    console.log(
      "✔️ selectedAppliances dans addToContainer 1:",
      selectedAppliances
    );
    console.log(
      "✔️ selectedUstensils dans addToContainer 1:",
      selectedUstensils
    );

    UnselectOptions(
      selector,
      tagTextToDelete,
      selectedIngredients,
      selectedAppliances,
      selectedUstensils
    );
    console.log(
      "✔️ selectedIngredients dans addToContainer 2:",
      selectedIngredients
    );
    console.log(
      "✔️ selectedAppliances dans addToContainer 2:",
      selectedAppliances
    );
    console.log(
      "✔️ selectedUstensils dans addToContainer 2:",
      selectedUstensils
    );

    filteredRecipes = filterAndMapRecipes(
      recipes,
      mainSearchValue,
      selectedIngredients,
      selectedAppliances,
      selectedUstensils
    );

    renderRecipes(filteredRecipes, Cardscontainer);

    updateOptions(ingredients, appliances, ustensils, filteredRecipes);
    displayOptions(ingredientOptionsContainer, ingredients, "ingredients");
    displayOptions(applianceOptionsContainer, appliances, "appliances");
    displayOptions(ustensilOptionsContainer, ustensils, "ustensils");
    console.log("SelectedTags", selectedTags);
    console.log(
      "✔️ selectedIngredients dans addToContainer 3:",
      selectedIngredients
    );
    console.log(
      "✔️ selectedAppliances dans addToContainer 3:",
      selectedAppliances
    );
    console.log(
      "✔️ selectedUstensils dans addToContainer 3:",
      selectedUstensils
    );
  });

  tagContainerUnified.appendChild(tagElement); // Append the tag to the tag container
}

// Function to remove an option from the dropdown after selecting it as a tag
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

// Function to remove a tag and update the UI
export function removeTagFromContainer(
  tagText,
  selectedTags,
  tagContainerUnified,
  tagElement
) {
  const index = selectedTags.indexOf(tagText);
  if (index !== -1) {
    selectedTags.splice(index, 1);
  }

  // selectedTags = selectedTags.filter((tag) => tag !== tagText); // Remove the tag from the selected tags array
  tagContainerUnified.removeChild(tagElement); // Remove the tag from the tag container

  // console.log(tagText, " supprimé du Container");
  // console.log("Maintenant =>>>> selectedTags", selectedTags);

  return selectedTags; // Return updated selectedTags
}

// Function to re-add an option to the dropdown after removing the tag
export function addOptionToDropdown(tagText, selector, addTagCallback) {
  const dropdownContainer = document.querySelector(`.${selector}-options`);
  // console.log(
  //   "Voici dropdownContainer",
  //   dropdownContainer,
  //   "Voici selector",
  //   selector
  // );
  const option = document.createElement("li");
  option.textContent = tagText;
  option.classList.add("dropdown-item");
  option.addEventListener("click", () => addTagCallback(tagText, selector));

  dropdownContainer.appendChild(option);
}
