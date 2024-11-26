const showInputError = (formElement, inputElement, errorMessage, classObj) => {
  const errorElement = formElement.querySelector(
    `.input__popup-${inputElement.id}`
  );
  errorElement.textContent = errorMessage;
  errorElement.classList.add(classObj.errorClass);
  inputElement.classList.add(classObj.inputErrorClass);
};

const hideInputError = (formElement, inputElement, classObj) => {
  const errorElement = formElement.querySelector(
    `.input__popup-${inputElement.id}`
  );
  inputElement.classList.remove(classObj.inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(classObj.errorClass);
};

const checkInputValidity = (formElement, inputElement, classObj) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      classObj
    );
  } else {
    hideInputError(formElement, inputElement, classObj);
  }
};

// const toggleButtonState = (inputList, btnElement) => {};

const setEventListeners = (formElement, classObj) => {
  const inputList = Array.from(
    formElement.querySelectorAll(classObj.inputSelector)
  );
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, classObj);
    });
  });
};

const enableValidation = (classObj) => {
  const fieldsetList = Array.from(
    document.querySelectorAll(classObj.fieldsetSelector)
  );
  fieldsetList.forEach((fieldset) => {
    setEventListeners(fieldset, classObj);
  });
};

enableValidation({
  fieldsetSelector: ".popup__fieldset",
  inputSelector: ".input",
  submitButtonSelector: "button_popup-submit",
  inactiveButtonClass: "button_popup-submit_disabled",
  inputErrorClass: "input__popup_type_error",
  errorClass: "input__popup-error_visible",
});
