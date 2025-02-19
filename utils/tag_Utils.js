// Function to add a tag to the selected tags array and update the UI
import { UnselectOptions, updateOptions } from "./filter_Utils.js";
import { filterAndMapRecipes } from "./filterAndMapRecipes.js";
import { renderRecipes } from "./../App.js";
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
  updateFiltersCallback
  // updateFiltersCallback
) {
  if (selectedTags.includes(tagText)) {
    return;
  } // If the tag is already selected, return

  selectedTags.push(tagText); // Add tag to the selected tags array
  console.log("selectedTags", selectedTags);

  const tagElement = document.createElement("div");
  tagElement.classList.add("tag");
  tagElement.innerHTML = `<span>${tagText}</span><button>x</button>`; // Add the tag text and a remove button

  console.log("selectedIngredients avant le addTag", selectedIngredients);
  // Add event listener to the remove button
  tagElement.querySelector("button").addEventListener("click", (event) => {
    const tagText =
      event.target.parentElement.querySelector("span").textContent;
    console.log("tagText apres le clic sur la croix", tagText);
    console.log("selector apres le clic sur la croix", selector);

    removeTagFromContainer(
      tagText,
      selector,
      selectedTags,
      tagContainerUnified,
      tagElement,
      selectedIngredients,
      selectedAppliances,
      selectedUstensils
    );

    UnselectOptions(
      selector,
      tagText,
      selectedIngredients,
      selectedAppliances,
      selectedUstensils
    );

    filteredRecipes = filterAndMapRecipes(
      recipes,
      mainSearchValue,
      selectedIngredients,
      selectedAppliances,
      selectedUstensils
    );

    console.log("filteredRecipes dans addTag", filteredRecipes);
    renderRecipes(filteredRecipes);

    // filterAndMapRecipes();
    // renderRecipes();
    // updateOptions();
    // displayOptions();
  });

  tagContainerUnified.appendChild(tagElement); // Append the tag to the tag container
}

// Function to remove an option from the dropdown after selecting it as a tag
export function removeOptionFromDropdown(tagText, selector) {
  console.log("Voici la category", selector);
  console.log("Voici tagText", tagText);
  const dropdownContainer = document.querySelector(`.${selector}-options`); // Get dropdown container by selector
  console.log("dropdownContainer", dropdownContainer, selector);

  const options = Array.from(dropdownContainer.children); // Get all dropdown options
  console.log("options", options);

  // Find the option matching the selected tag text
  const optionToRemove = options.find(
    (option) => option.textContent.trim() === tagText.trim()
  );
  console.log("optionToRemove", optionToRemove);
  if (optionToRemove) {
    dropdownContainer.removeChild(optionToRemove); // Remove the option from the dropdown
  }
}

// Function to remove a tag and update the UI
export function removeTagFromContainer(
  tagText,
  selector,
  selectedTags,
  tagContainerUnified,
  tagElement
) {
  selectedTags = selectedTags.filter((tag) => tag !== tagText); // Remove the tag from the selected tags array
  tagContainerUnified.removeChild(tagElement); // Remove the tag from the tag container

  console.log(tagText, " supprimé du Container");

  return selectedTags; // Return updated selectedTags
}

// Function to re-add an option to the dropdown after removing the tag
export function addOptionToDropdown(tagText, selector, addTagCallback) {
  const dropdownContainer = document.querySelector(`.${selector}-options`);
  console.log(
    "Voici dropdownContainer",
    dropdownContainer,
    "Voici selector",
    selector
  );
  const option = document.createElement("li");
  option.textContent = tagText;
  option.classList.add("dropdown-item");
  option.addEventListener("click", () => addTagCallback(tagText, selector));

  dropdownContainer.appendChild(option);
}
