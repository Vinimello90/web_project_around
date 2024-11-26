const resetInputValidation = (formElement, classObj) => {
  const inputList = Array.from(
    formElement.querySelectorAll(classObj.inputSelector)
  );
  toggleButtonState(inputList, formElement, classObj);
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, classObj);
  });
};

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

const hasInvalidInput = (inputList) =>
  inputList.some((inputElement) => !inputElement.validity.valid);

const toggleButtonState = (inputList, formElement, classObj) => {
  const btnElement = formElement.querySelector(classObj.submitButtonSelector);
  if (hasInvalidInput(inputList)) {
    btnElement.setAttribute("disabled", "disabled");
    btnElement.classList.add(classObj.inactiveButtonClass);
  } else {
    btnElement.removeAttribute("disabled");
    btnElement.classList.remove(classObj.inactiveButtonClass);
  }
};

const setEventListeners = (formElement, classObj) => {
  const inputList = Array.from(
    formElement.querySelectorAll(classObj.inputSelector)
  );
  toggleButtonState(inputList, formElement, classObj);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, classObj);
      toggleButtonState(inputList, formElement, classObj);
    });
  });
};

const enableValidation = (classObj) => {
  const formList = Array.from(document.querySelectorAll(".popup__form"));
  formList.forEach((formElement) => {
    const fieldsetList = Array.from(
      formElement.querySelectorAll(classObj.fieldsetSelector)
    );
    fieldsetList.forEach((fieldset) => setEventListeners(fieldset, classObj));
  });
};

enableValidation({
  formSelector: ".popup__form",
  fieldsetSelector: ".popup__fieldset",
  inputSelector: ".input",
  submitButtonSelector: ".button_popup-submit",
  inactiveButtonClass: "button_popup-submit_disabled",
  inputErrorClass: "input__popup_type_error",
  errorClass: "input__popup-error_visible",
});
