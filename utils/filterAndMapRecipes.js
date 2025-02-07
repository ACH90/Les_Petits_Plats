export const filterAndMapRecipes = (
  recipes,
  inputValue = "",
  selectedIngredients = [],
  selectedAppliances = [],
  selectedUstensils = []
) => {
  // Vérifier que les filtres sont bien sous forme de tableaux
  if (!Array.isArray(selectedIngredients)) selectedIngredients = [];
  if (!Array.isArray(selectedAppliances)) selectedAppliances = [];
  if (!Array.isArray(selectedUstensils)) selectedUstensils = [];

  return recipes.filter((recipe) => {
    const lowerInput = inputValue.toLowerCase();

    // Vérification si le terme de recherche est présent dans le titre, la description ou les ingrédients
    const matchesInputValue =
      recipe.name.toLowerCase().includes(lowerInput) ||
      recipe.description.toLowerCase().includes(lowerInput) ||
      recipe.ingredients.some((ingredientObj) =>
        ingredientObj.ingredient.toLowerCase().includes(lowerInput)
      );

    // Vérifier si chaque ingrédient sélectionné est présent dans la recette
    const matchesSelectedIngredients =
      selectedIngredients.length === 0 ||
      selectedIngredients.every((selectedIngredient) =>
        recipe.ingredients.some((ingredientObj) =>
          ingredientObj.ingredient
            .toLowerCase()
            .includes(selectedIngredient.toLowerCase())
        )
      );

    // Vérifier si l'appareil sélectionné est dans la recette
    const matchesSelectedAppliances =
      selectedAppliances.length === 0 ||
      selectedAppliances.includes(recipe.appliance.toLowerCase());

    // Vérifier si chaque ustensile sélectionné est présent dans la recette
    const matchesSelectedUstensils =
      selectedUstensils.length === 0 ||
      selectedUstensils.every((ustensil) =>
        recipe.ustensils.some((ust) =>
          ust.toLowerCase().includes(ustensil.toLowerCase())
        )
      );

    return (
      matchesInputValue &&
      matchesSelectedIngredients &&
      matchesSelectedAppliances &&
      matchesSelectedUstensils
    );
  });
};
