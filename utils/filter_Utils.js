//------------------------------------------------------------------------------------------------------------

// export const displayOptions = () => {
//   //Afficher ingredientOptions
//   ingredientOptionsContainer.innerText = "";
//   ingredientOptions.forEach((option) => {
//     const optionElement = document.createElement("li");
//     optionElement.classList.add("dropdown-item");
//     optionElement.textContent = option;
//     ingredientOptionsContainer.appendChild(optionElement);

//     optionElement.addEventListener("click", () => {
//       let value = optionElement.textContent.trim(); // Assurer une chaîne propre
//       if (value && !selectedIngredients.includes(value)) {
//         selectedIngredients.push(value); // Ajouter à selectedIngredients
//       }
//     });
//   });

//   //Afficher applianceOptions
//   applianceOptionsContainer.innerText = "";
//   applianceOptions.forEach((option) => {
//     const optionElement = document.createElement("li");
//     optionElement.classList.add("dropdown-item");
//     optionElement.textContent = option;
//     applianceOptionsContainer.appendChild(optionElement);

//     optionElement.addEventListener("click", () => {
//       let value = optionElement.textContent.trim(); // Assurer une chaîne propre
//       if (value && !selectedAppliances.includes(value)) {
//         selectedAppliances.push(value); // Ajouter à selectedAppliances
//       }
//     });
//   });

//   //Afficher ustensilOptions
//   ustensilOptionsContainer.innerText = "";
//   ustensilOptions.forEach((option) => {
//     const optionElement = document.createElement("li");
//     optionElement.classList.add("dropdown-item");
//     optionElement.textContent = option;
//     ustensilOptionsContainer.appendChild(optionElement);

//     optionElement.addEventListener("click", () => {
//       let value = optionElement.textContent.trim(); // Assurer une chaîne propre
//       if (value && !selectedUstensils.includes(value)) {
//         selectedUstensils.push(value); // Ajouter à selectedUstensils
//       }
//     });
//   });

//   //Affichage des recettes initiales
//   if (
//     selectedIngredients.length === 0 &&
//     selectedAppliances.length === 0 &&
//     selectedUstensils.length === 0
//   ) {
//     renderRecipes(filteredRecipes);
//   } else {
//     filteredRecipes = filterAndMapRecipes(
//       recipes,
//       mainSearchValue,
//       selectedIngredients,
//       selectedAppliances,
//       selectedUstensils
//     );
//     renderRecipes(filteredRecipes);
//     console.log("Voici mainSearchValue dans App handleChange", mainSearchValue);
//     console.log(
//       "Voici selectedIngredients dans App handleChange",
//       selectedIngredients
//     );
//     console.log(
//       "Voici selectedAppliances dans App handleChange",
//       selectedAppliances
//     );
//     console.log(
//       "Voici selectedUstensils dans App handleChange",
//       selectedUstensils
//     );
//     console.log("Voici filteredRecipes dans ecouteur d'event", filteredRecipes);
//     if (filteredRecipes.length === 0) {
//       console.log("Il n'y a pas de recettes qui correspondent aux critères.");
//     }
//   }
// };

export const getOptionValues = (recipes, key) => {
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
  ingredients.length = 0;
  appliances.length = 0;
  ustensils.length = 0;

  ingredients.push(...getOptionValues(filteredRecipes, "ingredients"));
  appliances.push(...getOptionValues(filteredRecipes, "appliance"));
  ustensils.push(...getOptionValues(filteredRecipes, "ustensils"));

  console.log("Voici ingredients", ingredients);
  console.log("Voici appliances", appliances);
  console.log("Voici ustensils", ustensils);
};

// export const displayOptions = (
//   ingredientOptionsContainer,
//   ingredients,
//   selectedIngredients,
//   applianceOptionsContainer,
//   appliances,
//   selectedAppliances,
//   ustensilOptionsContainer,
//   ustensils,
//   selectedUstensils,
//   filteredRecipes,
//   mainSearchValue,
//   filterAndMapRecipes,
//   updateOptions,
//   renderRecipes
// ) => {
//   //Afficher ingredientOptions
//   ingredientOptionsContainer.innerText = "";
//   ingredients.forEach((option) => {
//     const optionElement = document.createElement("li");
//     optionElement.classList.add("dropdown-item");
//     optionElement.textContent = option;
//     ingredientOptionsContainer.appendChild(optionElement);

//     optionElement.addEventListener("click", () => {
//       let value = optionElement.textContent.trim(); // Assurer une chaîne propre
//       if (value && !selectedIngredients.includes(value)) {
//         selectedIngredients.push(value); // Ajouter à selectedIngredients
//       }

//       //   Créer un tag visuel à partir de selectedIngredients
//       const tag = document.createElement("div");
//       tag.classList.add("tag");
//       tag.textContent = value;

//       filteredRecipes = filterAndMapRecipes(
//         filteredRecipes,
//         mainSearchValue,
//         selectedIngredients,
//         selectedAppliances,
//         selectedUstensils
//       );

//       console.log("Voici filteredRecipes dans updateOptions", filteredRecipes);
//       updateOptions(ingredients, appliances, ustensils, filteredRecipes);
//       renderRecipes(filteredRecipes);
//       //   updateOptions();
//     });
//   });

//   //Afficher applianceOptions
//   applianceOptionsContainer.innerText = "";
//   appliances.forEach((option) => {
//     const optionElement = document.createElement("li");
//     optionElement.classList.add("dropdown-item");
//     optionElement.textContent = option; // Correct
//     applianceOptionsContainer.appendChild(optionElement);

//     optionElement.addEventListener("click", () => {
//       let value = optionElement.textContent.trim(); // Assurer une chaîne propre
//       if (value && !selectedAppliances.includes(value)) {
//         selectedAppliances.push(value); // Ajouter à selectedAppliances
//       }

//       console.log("Voici selectedAppliances", selectedAppliances);

//       filteredRecipes = filterAndMapRecipes(
//         filteredRecipes,
//         mainSearchValue,
//         selectedIngredients,
//         selectedAppliances,
//         selectedUstensils
//       );

//       console.log("Voici filteredRecipes dans updateOptions", filteredRecipes);
//       renderRecipes(filteredRecipes);
//     });
//   });

//   //Afficher ustensilOptions
//   ustensilOptionsContainer.innerText = "";
//   ustensils.forEach((option) => {
//     const optionElement = document.createElement("li");
//     optionElement.classList.add("dropdown-item");
//     optionElement.textContent = option; // Correct
//     ustensilOptionsContainer.appendChild(optionElement);

//     optionElement.addEventListener("click", () => {
//       let value = optionElement.textContent.trim(); // Assurer une chaîne propre
//       if (value && !selectedUstensils.includes(value)) {
//         selectedUstensils.push(value); // Ajouter à selectedUstensils
//       }

//       console.log("Voici selectedUstensils", selectedUstensils);

//       filteredRecipes = filterAndMapRecipes(
//         filteredRecipes,
//         mainSearchValue,
//         selectedIngredients,
//         selectedAppliances,
//         selectedUstensils
//       );

//       console.log("Voici filteredRecipes dans updateOptions", filteredRecipes);
//       renderRecipes(filteredRecipes);
//     });
//   });
// };

// export const selectOptions = () => {
//   selectedIngredients = [];
//   selectedAppliances = [];
//   selectedUstensils = [];
//   renderRecipes(recipes);
// };

export const displayOptions = (optionsContainer, options) => {
  // Afficher ingredientOptions
  optionsContainer.innerText = "";
  options.forEach((option) => {
    const optionElement = document.createElement("li");
    optionElement.classList.add("dropdown-item");
    optionElement.textContent = option;
    optionsContainer.appendChild(optionElement);
  });
};

// export const displayOptions = () => {
//     // Afficher ingredientOptions
//     ingredientOptionsContainer.innerText = "";
//     ingredients.forEach((option) => {
//       const optionElement = document.createElement("li");
//       optionElement.classList.add("dropdown-item");
//       optionElement.textContent = option;
//       ingredientOptionsContainer.appendChild(optionElement);
//     });
//   };
