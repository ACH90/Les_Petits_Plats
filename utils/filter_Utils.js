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
  category,
  option,
  selectedIngredients,
  selectedAppliances,
  selectedUstensils
) => {
  if (!category) {
    console.error("❌ Erreur : optionElement est undefined !");
    return;
  }

  //   console.log("🟡 optionElement.dataset:", optionElement.dataset);

  //   const category = optionElement.dataset.category; // Récupération de la catégorie
  //   const option = optionElement.textContent.trim().toLowerCase(); // Nettoyage du texte

  //   console.log("🟢 Catégorie détectée :", category);
  //   console.log("🟢 Texte de l'option :", option);

  if (!category) {
    console.warn("⚠️ Aucune catégorie détectée pour :", option);
    return; // On ne continue pas si la catégorie est manquante
  }

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
    console.warn("⚠️ Catégorie inconnue :", category);
    return;
  }

  console.log("✔️ selectedIngredients:", selectedIngredients);
  console.log("✔️ selectedAppliances:", selectedAppliances);
  console.log("✔️ selectedUstensils:", selectedUstensils);
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
