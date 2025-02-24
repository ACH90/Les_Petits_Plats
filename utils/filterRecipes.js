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
  const lowerInput = inputValue.toLowerCase();

  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];

    // Vérification si le terme de recherche est présent dans le titre, la description ou les ingrédients
    let matchesInputValue =
      recipe.name.toLowerCase().includes(lowerInput) ||
      recipe.description.toLowerCase().includes(lowerInput);

    if (!matchesInputValue) {
      for (let j = 0; j < recipe.ingredients.length; j++) {
        if (
          recipe.ingredients[j].ingredient.toLowerCase().includes(lowerInput)
        ) {
          matchesInputValue = true;
          break;
        }
      }
    }

    // Vérifier si chaque ingrédient sélectionné est présent dans la recette
    let matchesSelectedIngredients = selectedIngredients.length === 0;
    if (!matchesSelectedIngredients) {
      matchesSelectedIngredients = true;
      for (let j = 0; j < selectedIngredients.length; j++) {
        const selectedIngredient = selectedIngredients[j].toLowerCase();
        let found = false;
        for (let k = 0; k < recipe.ingredients.length; k++) {
          if (
            recipe.ingredients[k].ingredient
              .toLowerCase()
              .includes(selectedIngredient)
          ) {
            found = true;
            break;
          }
        }
        if (!found) {
          matchesSelectedIngredients = false;
          break;
        }
      }
    }

    // Vérifier si l'appareil sélectionné est dans la recette
    const matchesSelectedAppliances =
      selectedAppliances.length === 0 ||
      selectedAppliances.includes(recipe.appliance.toLowerCase());

    // Vérifier si chaque ustensile sélectionné est présent dans la recette
    let matchesSelectedUstensils = selectedUstensils.length === 0;
    if (!matchesSelectedUstensils) {
      matchesSelectedUstensils = true;
      for (let j = 0; j < selectedUstensils.length; j++) {
        const ustensil = selectedUstensils[j].toLowerCase();
        let found = false;
        for (let k = 0; k < recipe.ustensils.length; k++) {
          if (recipe.ustensils[k].toLowerCase().includes(ustensil)) {
            found = true;
            break;
          }
        }
        if (!found) {
          matchesSelectedUstensils = false;
          break;
        }
      }
    }

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
