import Popup from "./Popup.js";
import { formValidator } from "../pages/index.js";
// classe PopupWithForm, que herda de Popup, é responsável por
// pela abertura e fechamento da popup e manipular o formulário.
export default class PopupWithForm extends Popup {
  // O constructor possui a função de retorno de chamada do envio do formulário como
  // parâmetro do construtor, assim como o seletor do pop-up do formulário.
  constructor({ handleForm }, popupSelector) {
    super(popupSelector);
    this._popupElement = document.querySelector(popupSelector);
    this._handleForm = handleForm;
  }

  // Método privado chamado _getInputValues() que coleta dados
  // de todos os campos de entrada e passa como argumento para _handleForm().
  _getInputValues(evt) {
    evt.preventDefault();
    this._inputValue1 = this._popupElement.querySelectorAll(".input")[0];
    this._inputValue2 = this._popupElement.querySelectorAll(".input")[1];
    this._handleForm({
      [this._inputValue1.name]: this._inputValue1.value,
      [this._inputValue2.name]: this._inputValue2.value,
    });
  }

  // No método pai foi modificado o setEventListeners().
  // O método setEventListeners() adiciona o manipulador de eventos
  // Submit ao formulário.
  setEventListeners(evt) {
    super.setEventListeners(evt);
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

  // No método pai foi modificado o close() para redefinir o formulário
  // assim que o pop-up for fechar e remover o ouvinte de submit para não
  // duplica-lo ao reabrir o popup.
  close() {
    super.close();
    this._popupElement
      .querySelector(".popup__form")
      .removeEventListener("submit", this._handleInput);
    //Chama o método público resetInputValidation() da classe FormValidator
    // para resetar a validação do formulário, é passado como argumento
    // o elemento do formulário.
    formValidator.resetInputValidation(
      this._popupElement.querySelector(".popup__form")
    );
    this._popupElement.querySelector(".popup__form").reset();
  }
}
