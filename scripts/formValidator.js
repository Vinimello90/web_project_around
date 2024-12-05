class FormValidator {
  constructor(classObj, formList) {
    this._classObj = classObj;
    this._formList = Array.from(formList);

    _resetInputValidation = () => {
      this.inputList = Array.from(
        this._formList.querySelectorAll(classObj.inputSelector)
      );
      _toggleButtonState();
      inputList.forEach((inputElement) => {
        const errorElement = formElement.querySelector(
          `.popup__${inputElement.id}`
        );
        _hideInputError(inputElement, errorElement, classObj);
      });
    };

    _showInputError = (inputElement, errorMessage, errorElement, classObj) => {
      errorElement.textContent = errorMessage;
      errorElement.classList.add(classObj.errorClass);
      inputElement.classList.add(classObj.inputErrorClass);
    };

    _hideInputError = (inputElement, errorElement, classObj) => {
      errorElement.textContent = "";
      errorElement.classList.remove(classObj.errorClass);
      inputElement.classList.remove(classObj.inputErrorClass);
    };

    _checkInputValidity = (formElement, inputElement, classObj) => {
      const errorElement = formElement.querySelector(
        `.popup__${inputElement.id}`
      );
      if (!inputElement.validity.valid) {
        showInputError(
          inputElement,
          inputElement.validationMessage,
          errorElement,
          classObj
        );
      } else {
        _hideInputError(inputElement, errorElement, classObj);
      }
    };

    _hasInvalidInput = (inputList) =>
      inputList.some((inputElement) => !inputElement.validity.valid);

    _toggleButtonState = (inputList) => {
      const btnElement = formElement.querySelector(
        classObj.submitButtonSelector
      );
      if (hasInvalidInput(inputList)) {
        btnElement.setAttribute("disabled", "disabled");
        btnElement.classList.add(classObj.inactiveButtonClass);
      } else {
        btnElement.removeAttribute("disabled");
        btnElement.classList.remove(classObj.inactiveButtonClass);
      }
    };

    __setEventListeners = () => {
      const inputList = Array.from(
        formElement.querySelectorAll(classObj.inputSelector)
      );
      _toggleButtonState(inputList);
      inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", () => {
          checkInputValidity(formElement, inputElement, classObj);
          _toggleButtonState(inputList);
        });
      });
    };

    _enableValidation = () => {
      this._formList = Array.from(document.querySelectorAll(".popup__form"));
      this._formList.forEach((formElement) => {
        this._fieldsetList = Array.from(
          formElement.querySelectorAll(classObj.fieldsetSelector)
        );
        this._fieldsetList.forEach((fieldset) =>
          _setEventListeners(fieldset, classObj)
        );
      });
    };

    _enableValidation({
      formSelector: ".popup__form",
      fieldsetSelector: ".popup__fieldset",
      inputSelector: ".input",
      submitButtonSelector: ".button_popup-submit",
      inactiveButtonClass: "button_popup-submit_disabled",
      inputErrorClass: "input__popup_type_error",
      errorClass: "popup__error_visible",
    });
  }
}
