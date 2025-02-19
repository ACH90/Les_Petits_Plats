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

export const selectOptions = (
  optionElement,
  selectedIngredients,
  selectedAppliances,
  selectedUstensils
) => {
  if (!optionElement) {
    console.error("Erreur : optionElement est undefined !");
    return;
  }

  console.log("optionElement", optionElement);

  const category = optionElement.dataset.category;
  const option = optionElement.textContent.toLowerCase(); // Récupération du texte cliqué

  if (category === "ingredients") {
    if (!selectedIngredients.includes(option)) {
      selectedIngredients.push(option);
    }
  } else if (category === "appliances") {
    if (!selectedAppliances.includes(option)) {
      selectedAppliances.push(option);
    }
  } else if (category === "ustensils") {
    if (!selectedUstensils.includes(option)) {
      selectedUstensils.push(option);
    }
  } else {
    console.log("Il n'y a pas de catégorie trouvée pour", optionElement);
  }

  console.log("Voici selectedIngredients Validé", selectedIngredients);
  console.log("Voici selectedAppliances Validé", selectedAppliances);
  console.log("Voici selectedUstensils Validé", selectedUstensils);

  //   filterAndMapRecipes(
  //     filteredRecipes,
  //     mainSearchValue,
  //     selectedIngredients,
  //     selectedAppliances,
  //     selectedUstensils
  //   );
  //   renderRecipes(filteredRecipes);
};

const getOptionValues = (recipes, key) => {
  const valuesSet = new Set();

  recipes.forEach((recipe) => {
    if (Array.isArray(recipe[key])) {
      // Cas où c'est un tableau (ex: ingredients, ustensils)
      recipe[key].forEach((item) => {
        valuesSet.add(
          typeof item === "object"
            ? item.ingredient.toLowerCase()
            : item.toLowerCase()
        );
      });
    } else if (typeof recipe[key] === "string") {
      // Cas où c'est une simple string (ex: appliance)
      valuesSet.add(recipe[key].toLowerCase());
    }
  });

  return Array.from(valuesSet).sort();
};

export const updateOptions = (
  ingredients,
  appliances,
  ustensils,
  filteredRecipes
) => {
  // Effacer les options actuelles
  ingredients.length = 0;
  appliances.length = 0;
  ustensils.length = 0;

  // Ajouter les nouvelles options
  ingredients.push(...getOptionValues(filteredRecipes, "ingredients"));
  appliances.push(...getOptionValues(filteredRecipes, "appliance"));
  ustensils.push(...getOptionValues(filteredRecipes, "ustensils"));

  // Afficher les nouvelles options dans la console
  console.log("Voici ingredients", ingredients);
  console.log("Voici appliances", appliances);
  console.log("Voici ustensils", ustensils);
  console.log("Voici filteredRecipes", filteredRecipes);
};
