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

  if (!category) {
    console.warn("⚠️ Aucune catégorie détectée pour :", option);
    return; // On ne continue pas si la catégorie est manquante
  }

  console.log("✔️ Catégorie :", category);

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

  console.log("✔️ selectedIngredients after:", selectedIngredients);
  console.log("✔️ selectedAppliances after:", selectedAppliances);
  console.log("✔️ selectedUstensils after:", selectedUstensils);
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
