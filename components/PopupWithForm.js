import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  // O constructor possui a função de retorno de chamada do envio do formulário como
  // parâmetro do construtor, assim como o seletor do pop-up.
  constructor({ handlerForm }, popupSelector) {
    super(popupSelector);
    this._popupElement = document.querySelector(popupSelector);
    this._handlerForm = handlerForm;
  }

  // Método privado chamado _getInputValues() que coleta dados
  // de todos os campos de entrada.
  _getInputValues(evt) {
    evt.preventDefault();
    this._inputValue1 = this._popupElement.querySelectorAll(".input")[0];
    this._inputValue2 = this._popupElement.querySelectorAll(".input")[1];
    this._handlerForm({
      [this._inputValue1.name]: this._inputValue1.value,
      [this._inputValue2.name]: this._inputValue2.value,
    });
  }

  // No método pai foi modificado o setEventListeners().
  // O método setEventListeners() adiciona o manipulador de eventos
  // Submit ao formulário.
  setEventListeners(evt) {
    super.setEventListeners(evt);
    this._handlerInput = (evt) => {
      this._getInputValues(evt);
    };
    this._popupElement
      .querySelector(".popup__form")
      .addEventListener("submit", this._handlerInput);
  }

  // No método pai foi modificado o close() para redefinir o formulário
  // assim que o pop-up for fechado e removido o ouvinte de submit para não
  // duplica-lo ao reabrir o popup.
  close() {
    super.close();
    this._popupElement
      .querySelector(".popup__form")
      .removeEventListener("submit", this._handlerInput);
    this._popupElement.querySelector(".popup__form").reset();
  }
}
