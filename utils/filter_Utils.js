export const getAllIngredients = (recipes) => {
  const ingredientsSet = new Set(); // Utiliser un Set pour éviter les doublons

  recipes.forEach((recipe) => {
    recipe.ingredients.forEach((ing) => {
      ingredientsSet.add(ing.ingredient.toLowerCase()); // Stocker en minuscules pour éviter les variations
    });
  });

  return Array.from(ingredientsSet).sort(); // Convertir en tableau et trier par ordre alphabétique
};

export const getAllAppliances = (recipes) => {
  const appliancesSet = new Set();

  recipes.forEach((recipe) => {
    appliancesSet.add(recipe.appliance.toLowerCase());
  });

  return Array.from(appliancesSet).sort();
};

export const getAllUstensils = (recipes) => {
  const ustensilsSet = new Set();

  recipes.forEach((recipe) => {
    recipe.ustensils.forEach((ustensil) => {
      ustensilsSet.add(ustensil.toLowerCase());
    });
  });

  return Array.from(ustensilsSet).sort();
};
