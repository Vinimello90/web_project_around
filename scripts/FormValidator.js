export default class FormValidator {
  constructor(classObj, formList) {
    this._classObj = classObj;
    this._formList = Array.from(formList);
  }

  resetInputValidation = (formElement) => {
    this.inputList = Array.from(
      formElement.querySelectorAll(this._classObj.inputSelector)
    );
    this._toggleButtonState(formElement, this.inputList);
    this.inputList.forEach((inputElement) => {
      const errorElement = formElement.querySelector(
        `.popup__${inputElement.id}`
      );
      this._hideInputError(inputElement, errorElement, this._classObj);
    });
  };

  _showInputError = (inputElement, errorMessage, errorElement) => {
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._classObj.errorClass);
    inputElement.classList.add(this._classObj.inputErrorClass);
  };

  _hideInputError = (inputElement, errorElement) => {
    errorElement.textContent = "";
    errorElement.classList.remove(this._classObj.errorClass);
    inputElement.classList.remove(this._classObj.inputErrorClass);
  };

  _checkInputValidity = (formElement, inputElement) => {
    this._errorElement = formElement.querySelector(
      `.popup__${inputElement.id}`
    );
    if (!inputElement.validity.valid) {
      this._showInputError(
        inputElement,
        inputElement.validationMessage,
        this._errorElement
      );
    } else {
      this._hideInputError(inputElement, this._errorElement);
    }
  };

  _hasInvalidInput = (inputList) =>
    inputList.some((inputElement) => !inputElement.validity.valid);

  _toggleButtonState = (formElement, inputList) => {
    this.btnElement = formElement.querySelector(
      this._classObj.submitButtonSelector
    );
    if (this._hasInvalidInput(inputList)) {
      this.btnElement.setAttribute("disabled", "disabled");
      this.btnElement.classList.add(this._classObj.inactiveButtonClass);
    } else {
      this.btnElement.removeAttribute("disabled");
      this.btnElement.classList.remove(this._classObj.inactiveButtonClass);
    }
  };

  _setEventListeners = (formElement) => {
    this.inputList = Array.from(
      formElement.querySelectorAll(this._classObj.inputSelector)
    );
    this._toggleButtonState(formElement, this.inputList);
    this.inputList.forEach((inputElement) => {
      console.log(inputElement.value);
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(formElement, inputElement);
        this._toggleButtonState(formElement, this.inputList);
      });
    });
  };

  enableValidation = () => {
    this._formList.forEach((formElement) => {
      this._fieldsetList = Array.from(
        formElement.querySelectorAll(this._classObj.fieldsetSelector)
      );
      this._fieldsetList.forEach((fieldset) =>
        this._setEventListeners(fieldset)
      );
    });
  };
}
