import Popup from "./Popup.js";
// classe PopupWithForm, que herda de Popup, é responsável pela
// abertura e fechamento da popup e renderizar as informações
// do card à popup.
export default class PopupWithImage extends Popup {
  // O constructor recebe 2 parâmetros, 1 objeto com as informações
  // do card e 1 seletor de classe do elemento da popup com imagem.
  constructor({ title, link }, popupSelector) {
    super(popupSelector);
    this._title = title;
    this._link = link;
  }
  // Método público que abre e adicionar os ouvintes para fechamento
  // e renderiza as informações do card ao elemento da popup na página.
  open() {
    super.open();
    super._setEventListeners();
    this.imgElement = this._popupElement.querySelector(".popup__img");
    this.imgElement.src = this._link;
    this.imgElement.alt = this._title;
    this.imgElement.onerror = () => {
      this.imgElement.src = "./images/no_image_avaible.png";
    };
    this._popupElement.querySelector(".popup__title").textContent = this._title;
  }
}
