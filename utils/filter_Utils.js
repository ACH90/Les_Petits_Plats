// optionElements.forEach((optionElement) =>
//     optionElement.addEventListener("click", () => {
//       const option = optionElement.textContent.trim(); // Récupère le texte de l'option
//       const optionsList = optionElement.getAttribute("data-filter"); // Récupère la catégorie

//       selectOptions(option, optionsList);
//       // Mettre à jour l'affichage des recettes avec les nouveaux filtres
//       filteredRecipes = filterAndMapRecipes(
//         filteredRecipes,
//         mainSearchValue,
//         selectedIngredients,
//         selectedAppliances,
//         selectedUstensils
//       );
//       console.log("Voici filteredRecipes dans display", filteredRecipes);
//       renderRecipes(filteredRecipes);
//       updateOptions(ingredients, appliances, ustensils, filteredRecipes);

//       displayOptions(
//         ingredientOptionsContainer, // Conteneur pour les options des ingrédients
//         ingredients, // Liste des ingrédients
//         "ingredients" // La catégorie de filtre : ici 'ingredients'
//       );

//       displayOptions(
//         applianceOptionsContainer, // Conteneur pour les options des appareils
//         appliances, // Liste des appareils
//         "appliances" // La catégorie de filtre : ici 'appliances'
//       );

//       displayOptions(
//         ustensilOptionsContainer, // Conteneur pour les options des ustensiles
//         ustensils, // Liste des ustensiles
//         "ustensils" // La catégorie de filtre : ici 'ustensils'
//       );
//     })
//   );
