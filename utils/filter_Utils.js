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
};

export const UnselectOptions = (
  category,
  option,
  selectedIngredients,
  selectedAppliances,
  selectedUstensils
) => {
  if (!category) {
    console.error("❌ Erreur : category est undefined !");
    return;
  }

  let selectedArray;
  if (category === "ingredients") {
    selectedArray = selectedIngredients;
  } else if (category === "appliances") {
    selectedArray = selectedAppliances;
  } else if (category === "ustensils") {
    selectedArray = selectedUstensils;
  } else {
    console.warn("⚠️ Aucune catégorie détectée pour :", option);
    return;
  }

  // Suppression de l'option si elle existe dans le tableau
  const index = selectedArray.indexOf(option);
  if (index !== -1) {
    selectedArray.splice(index, 1);
  }
};

const getOptionValues = (recipes, key) => {
  const valuesSet = new Set();

  recipes.forEach((recipe) => {
    if (Array.isArray(recipe[key])) {
      // Vérif si c'est un tableau (ex: ingredients, ustensils)
      //If else sous forme d'operation ternaire
      recipe[key].forEach((item) => {
        valuesSet.add(
          typeof item === "object" //Si item est un objet on recupère item.ingredient
            ? item.ingredient.toLowerCase()
            : item.toLowerCase() //Sinon on recupère item et on le met directement en lowercase
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
};
