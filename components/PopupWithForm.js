import Popup from "./Popup.js";
import { formValidator } from "../pages/index.js";
// classe PopupWithForm, que herda de Popup, é responsável pela abertura
// e fechamento da popup e manipular o formulário.
export default class PopupWithForm extends Popup {
  // O constructor possui a função de retorno de chamada do envio do formulário como
  // parâmetro do construtor, assim como o seletor do pop-up do formulário.
  constructor({ handleForm, popupSelector, buttonSelector }) {
    super(popupSelector);
    this._btnElement = this._popupElement.querySelector(buttonSelector);
    this._btnDefaultText = this._btnElement.textContent;
    this._handleForm = handleForm;
  }

  open() {
    super.open();
    this._setEventListeners();
  }

  // No método pai foi modificado o close() para redefinir o formulário
  // assim que o pop-up for fechar e remover o ouvinte de submit para não
  // duplica-lo ao reabrir o popup.
  close() {
    super.close();
    this._popupElement
      .querySelector(".popup__form")
      .removeEventListener("submit", this._handleInput);
    // Método reset() reseta os inputs apagando o que foi digitado.
    this._popupElement.querySelector(".popup__form").reset();
    //Chama o método público resetInputValidation() da classe FormValidator
    // para resetar a validação do formulário, é passado como argumento
    // o elemento do formulário.
    formValidator.resetInputValidation(
      this._popupElement.querySelector(".popup__form")
    );
  }

  // Método privado chamado _getInputValues() que coleta dados
  // de todos os campos de entrada e passa como argumento para _handleForm().
  _getInputValues(evt) {
    evt.preventDefault();
    this.inputValues = {};
    this._popupElement.querySelectorAll(".input").forEach((inputValue) => {
      this.inputValues[inputValue.name] = inputValue.value;
    });
    this._handleForm(this.inputValues);
  }

  // No método pai foi modificado o setEventListeners().
  // O método setEventListeners() adiciona o manipulador de eventos
  // Submit ao formulário.
  _setEventListeners() {
    super._setEventListeners();
    // foi criado a propriedade _handleInput que recebe uma função
    // que é um callback do ouvinte de evento para conseguir remover
    // o ouvinte ao fechar a popup.
    this._handleInput = (evt) => {
      this._getInputValues(evt);
    };
    this._popupElement
      .querySelector(".popup__form")
      .addEventListener("submit", this._handleInput);
  }
}
