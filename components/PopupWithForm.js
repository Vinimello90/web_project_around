import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  //Possuir a função de retorno de chamada do envio do formulário como parâmetro do construtor, assim como o seletor do pop-up.
  constructor({ handlerForm }, popupSelector) {
    super(popupSelector);
    this._popupElement = document.querySelector(popupSelector);
    this._handlerForm = handlerForm;
  }

  //Armazenar um método privado chamado _getInputValues() que coleta dados de todos os campos de entrada.
  _getInputValues(evt) {
    evt.preventDefault();
    this._inputValue1 = this._popupElement.querySelectorAll(".input")[0];
    this._inputValue2 = this._popupElement.querySelectorAll(".input")[1];
    this._handlerForm({
      [this._inputValue1.name]: this._inputValue1.value,
      [this._inputValue2.name]: this._inputValue2.value,
    });
  }

  //Modificar o método pai setEventListeners(). O método setEventListeners() da classe PopupWithForm precisa
  //adicionar o manipulador de eventos Submit ao formulário e o ouvinte de eventos click para o ícone de fechamento.
  setEventListeners(evt) {
    super.setEventListeners(evt);
    this._handlerInput = (evt) => {
      this._getInputValues(evt);
    };
    this._popupElement
      .querySelector(".popup__form")
      .addEventListener("submit", this._handlerInput);
  }

  //Modificar o método pai close() para redefinir o formulário assim que o pop-up for fechado.
  close() {
    super.close();
    this._popupElement
      .querySelector(".popup__form")
      .removeEventListener("submit", this._handlerInput);
    this._popupElement.querySelector(".popup__form").reset();
  }
  //Criar uma instância da classe PopupWithForm para cada pop-up.
}
