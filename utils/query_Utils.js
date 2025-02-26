export const handleChange = (e, inputValue) => {
  inputValue = "";
  const value = e.target.value;

  if (value.length > 2) {
    inputValue = e.target.value;
  }
  return inputValue;
};

export const showXButton = (ClearButton, inputValue, searchGlass) => {
  if (inputValue.length > 0) {
    ClearButton.style.display = "block";
    if (searchGlass) {
      searchGlass.style.display = "none";
    }
  }

  if (inputValue.length === 0) {
    ClearButton.style.display = "none";
    if (searchGlass) {
      searchGlass.style.display = "block";
    }
  }
};

export const handleClear = (inputElement, inputValue) => {
  if (inputElement instanceof HTMLInputElement) {
    inputElement.value = "";
    inputValue = "";
  }
};
