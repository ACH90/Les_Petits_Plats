export const filterRecipes = (
  recipes,
  inputValue = "",
  selectedIngredients = [""],
  selectedAppliances = [],
  selectedUstensils = []
) => {
  // Vérifier que les filtres sont bien sous forme de tableaux
  if (!Array.isArray(selectedIngredients)) selectedIngredients = [];
  if (!Array.isArray(selectedAppliances)) selectedAppliances = [];
  if (!Array.isArray(selectedUstensils)) selectedUstensils = [];

  const filteredRecipes = [];
  const lowerInputValue = inputValue.toLowerCase();

  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    let matchesInputValue = false;

    // Vérifie si le nom correspond
    const nameLower = recipe.name.toLowerCase();
    for (let j = 0; j <= nameLower.length - lowerInputValue.length; j++) {
      if (
        nameLower.substring(j, j + lowerInputValue.length) === lowerInputValue
      ) {
        matchesInputValue = true;
        break;
      }
    }

    // Vérifie si la description correspond
    if (!matchesInputValue) {
      const descriptionLower = recipe.description.toLowerCase();
      for (
        let j = 0;
        j <= descriptionLower.length - lowerInputValue.length;
        j++
      ) {
        if (
          descriptionLower.substring(j, j + lowerInputValue.length) ===
          lowerInputValue
        ) {
          matchesInputValue = true;
          break;
        }
      }
    }

    // Vérifie si un ingrédient correspond
    if (!matchesInputValue) {
      for (let j = 0; j < recipe.ingredients.length; j++) {
        const ingredientLower = recipe.ingredients[j].ingredient.toLowerCase();
        for (
          let k = 0;
          k <= ingredientLower.length - lowerInputValue.length;
          k++
        ) {
          if (
            ingredientLower.substring(k, k + lowerInputValue.length) ===
            lowerInputValue
          ) {
            matchesInputValue = true;
            break;
          }
        }
        if (matchesInputValue) break;
      }
    }

    // Vérifie si tous les ingrédients sélectionnés sont présents (garde .every et .some)
    const matchesSelectedIngredients =
      selectedIngredients.length === 0 ||
      selectedIngredients.every((selectedIngredient) =>
        recipe.ingredients.some((ingredientObj) =>
          ingredientObj.ingredient
            .toLowerCase()
            .includes(selectedIngredient.toLowerCase())
        )
      );

    // Vérifie si tous les appareils sélectionnés sont présents
    const matchesSelectedAppliances =
      selectedAppliances.length === 0 ||
      selectedAppliances.every((appliance) =>
        recipe.appliance.toLowerCase().includes(appliance.toLowerCase())
      );

    // Vérifie si tous les ustensiles sélectionnés sont présents
    const matchesSelectedUstensils =
      selectedUstensils.length === 0 ||
      selectedUstensils.every((ustensil) =>
        recipe.ustensils.some((ust) =>
          ust.toLowerCase().includes(ustensil.toLowerCase())
        )
      );

    // Ajoute la recette si elle correspond à tous les filtres
    if (
      matchesInputValue &&
      matchesSelectedIngredients &&
      matchesSelectedAppliances &&
      matchesSelectedUstensils
    ) {
      filteredRecipes.push(recipe);
    }
  }

  return filteredRecipes;
};
