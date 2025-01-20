import Popup from "./Popup.js";
export default class PopupWithConfirmation extends Popup {
  constructor({ handleConfirmation, popupSelector, submitButtonSelector }) {
    super(popupSelector);
    this._handleConfirmation = handleConfirmation;
    this._btnElement = this._popupElement.querySelector(submitButtonSelector);
  }

  open() {
    super.open();
    this._setEventListeners();
  }

  close() {
    super.close();
    this._btnElement.removeEventListener("click", this.confirmationButton);
  }

  _handleConfirmationButton() {
    this._handleConfirmation();
  }

  _setEventListeners() {
    super._setEventListeners();
    this.confirmationButton = () => {
      this._handleConfirmationButton();
    };
    this._btnElement.addEventListener("click", this.confirmationButton);
  }
}
