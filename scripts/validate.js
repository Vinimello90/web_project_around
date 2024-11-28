const resetInputValidation = (formElement, classObj) => {
  const inputList = Array.from(
    formElement.querySelectorAll(classObj.inputSelector)
  );
  toggleButtonState(inputList, formElement, classObj);
  inputList.forEach((inputElement) => {
    const errorElement = formElement.querySelector(
      `.popup__${inputElement.id}`
    );
    hideInputError(inputElement, errorElement, classObj);
  });
};

const showInputError = (inputElement, errorMessage, errorElement, classObj) => {
  errorElement.textContent = errorMessage;
  errorElement.classList.add(classObj.errorClass);
  inputElement.classList.add(classObj.inputErrorClass);
};

/* Corrigido, foi um erro com o nome da classe da mensagem de erro, 
estava com o nome do bloco do input, e antes de enviar o projeto mudei 
para ficar com nome correto seguindo a metologia BEM e acabou mudando o 
nome da classe do CSS para deixar a mensagem visivel junto, resultando 
nesse bug */

const hideInputError = (inputElement, errorElement, classObj) => {
  inputElement.classList.remove(classObj.inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(classObj.errorClass);
};

const checkInputValidity = (formElement, inputElement, classObj) => {
  const errorElement = formElement.querySelector(`.popup__${inputElement.id}`);
  if (!inputElement.validity.valid) {
    showInputError(
      inputElement,
      inputElement.validationMessage,
      errorElement,
      classObj
    );
  } else {
    hideInputError(inputElement, errorElement, classObj);
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
  errorClass: "popup__error_visible",
});
