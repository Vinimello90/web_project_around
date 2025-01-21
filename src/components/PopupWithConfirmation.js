import Popup from "./Popup.js";
// classe PopupWithConfirmation, que herda de Popup, é responsável pela abertura
// e fechamento da popup e manipular o botão de confirmação.
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
  //Método público herdado de popup modificado para remover o ouvinte de evento
  // assim que for fechado e evitar duplicidade do evento ao ser reaberto.
  close() {
    super.close();
    this._btnElement.removeEventListener("click", this.confirmationButton);
  }
  // Método privado _handleConfirmationButton() chama a função passada como callback
  // que executa o que vai ser feito após a confirmação.
  _handleConfirmationButton() {
    this._handleConfirmation();
  }
  // Método privado _setEventListeners() que adiciona o ouvinte devento ao
  // botão de confirmação.
  _setEventListeners() {
    super._setEventListeners();
    this.confirmationButton = () => {
      this._handleConfirmationButton();
    };
    this._btnElement.addEventListener("click", this.confirmationButton);
  }
}
