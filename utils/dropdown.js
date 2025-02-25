// export const selectOptions = (
//   optionElement,
//   filteredRecipes,
//   selectedIngredients,
//   selectedAppliances,
//   selectedUstensils,
//   filterRecipes,
//   renderRecipes,
//   mainSearchValue
// ) => {
//   if (!optionElement) {
//     console.error("Erreur : optionElement est undefined !");
//     return;
//   }

//   console.log("optionElement", optionElement);

//   const category = optionElement.dataset.category;
//   const option = optionElement.textContent.toLowerCase(); // Récupération du texte cliqué

//   if (category === "ingredients") {
//     if (!selectedIngredients.includes(option)) {
//       selectedIngredients.push(option);
//     }
//   } else if (category === "appliances") {
//     if (!selectedAppliances.includes(option)) {
//       selectedAppliances.push(option);
//     }
//   } else if (category === "ustensils") {
//     if (!selectedUstensils.includes(option)) {
//       selectedUstensils.push(option);
//     }
//   } else {
//     console.log("Il n'y a pas de catégorie trouvée pour", optionElement);
//   }

//   console.log("Voici selectedIngredients Validé", selectedIngredients);
//   console.log("Voici selectedAppliances Validé", selectedAppliances);
//   console.log("Voici selectedUstensils Validé", selectedUstensils);

//   filterRecipes(
//     filteredRecipes,
//     mainSearchValue,
//     selectedIngredients,
//     selectedAppliances,
//     selectedUstensils
//   );
//   renderRecipes(filteredRecipes);
// };

// export const displayOptions = (
//   optionsContainer,
//   options,
//   category,
//   filteredRecipes,
//   selectedIngredients,
//   selectedAppliances,
//   selectedUstensils,
//   filterRecipes,
//   mainSearchValue
// ) => {
//   optionsContainer.innerText = ""; // Effacer le contenu du conteneur
//   console.log("category dans displayOptions:", category);

//   options.forEach((option) => {
//     const optionElement = document.createElement("li");
//     optionElement.classList.add("dropdown-item");
//     optionElement.textContent = option;
//     optionElement.setAttribute("data-category", category);
//     optionsContainer.appendChild(optionElement);
//   });

//   // Un seul écouteur d'événements pour tout le conteneur
//   optionsContainer.addEventListener("click", (event) => {
//     const clickedOption = event.target;
//     if (clickedOption.classList.contains("dropdown-item")) {
//       selectOptions(
//         clickedOption,
//         filteredRecipes,
//         selectedIngredients,
//         selectedAppliances,
//         selectedUstensils,
//         filterRecipes,
//         mainSearchValue
//       );

//       // Mettre à jour les recettes avec les nouveaux filtres
//       filteredRecipes = filterRecipes(
//         filteredRecipes,
//         mainSearchValue,
//         selectedIngredients,
//         selectedAppliances,
//         selectedUstensils
//       );
//       console.log("filteredRecipes après le clic :", filteredRecipes);
//       renderRecipes(filteredRecipes);
//       updateOptions(ingredients, appliances, ustensils, filteredRecipes);

//       // Appeler displayOptions après avoir mis à jour les filtres
//       displayOptions(
//         ingredientOptionsContainer,
//         ingredients,
//         "ingredients",
//         filteredRecipes
//       );
//       displayOptions(
//         applianceOptionsContainer,
//         appliances,
//         "appliances",
//         filteredRecipes
//       );
//       displayOptions(
//         ustensilOptionsContainer,
//         ustensils,
//         "ustensils",
//         filteredRecipes
//       );
//     }
//   });
// };
