export const handleChange = (e, inputValue) => {
  inputValue = "";
  const value = e.target.value;
  console.log("e.target.value", e.target.value);
  console.log("value", value);

  if (value.length > 2) {
    inputValue = e.target.value;
  }
  console.log("inputValue", inputValue);
  return inputValue;
};

export const showXButton = (element, inputValue) => {
  if (inputValue.length > 0) {
    element.style.display = "block";
  }

  if (inputValue.length === 0) {
    element.style.display = "none";
  }
};

export const handleClear = (inputElement) => {
  if (inputElement instanceof HTMLInputElement) {
    inputElement.value = "";
  }
};
