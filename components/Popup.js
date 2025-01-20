// A classe Popup é responsável para adicionar e manipular os ouvintes
// de eventos de abrir e fechar a popup.
export default class Popup {
  // O constructor recebe como parâmetro a classe seletora do
  // elemento da popup
  constructor(popupSelector, buttonSelector) {
    this._popupElement = document.querySelector(popupSelector);
  }
  // O método público open() adiciona a classe que vai mostrar a popup ná pagina.
  open() {
    this._popupElement.classList.add("popup_opened");
  }
  // O método público close() remove a classe que deixa a popup visivel do elemento da popup
  // e remove os ouvites de eventos para não duplicar os ouvintes quando reaberto.
  close() {
    document.removeEventListener("keydown", this._keyHandler);
    this._popupElement.removeEventListener("click", this._clickHandler);
    this._popupElement.classList.remove("popup_opened");
  }

  loading(status) {
    if (status) {
      this._btnElement.textContent = "Salvando...";
      this._btnElement.setAttribute("disabled", "disabled");
    } else {
      this._btnElement.textContent = this._btnDefaultText;
    }
  }
  // O método privado _handleEscClose() verifica a tecla pressionada
  // para fechar a popup.
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close(evt);
    }
  }
  // O método privado _handleEscClose() verifica se o elemento clicado
  // tem a classe correta para fechar a popup.
  _handleClickClose(evt) {
    if (
      evt.target.classList.contains("button_close") ||
      evt.target.classList.contains("popup_opened")
    ) {
      this.close(evt);
    }
  }
  // O método público setEventListeners() adiciona os ouvintes de eventos que
  // irão fechar a popup se ativados.
  _setEventListeners() {
    this._clickHandler = (evt) => {
      this._handleClickClose(evt);
    };
    this._popupElement.addEventListener("click", this._clickHandler);
    this._keyHandler = (evt) => {
      this._handleEscClose(evt);
    };
    document.addEventListener("keydown", this._keyHandler);
  }
}
