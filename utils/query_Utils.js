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
    searchGlass.style.display = "none";
  }

  if (inputValue.length === 0) {
    ClearButton.style.display = "none";
    searchGlass.style.display = "block";
  }
};

export const handleClear = (inputElement) => {
  if (inputElement instanceof HTMLInputElement) {
    inputElement.value = "";
  }
};
