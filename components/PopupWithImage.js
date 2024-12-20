import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor({ title, link }, popupSelector) {
    super(popupSelector);
    this._title = title;
    this._link = link;
    this._popupElement = document.querySelector(popupSelector);
  }

  open() {
    super.open();
    super.setEventListeners();
    this._popupElement.querySelector(".popup__img").src = this._link;
    this._popupElement.querySelector(".popup__img").alt = this._title;
    this._popupElement.querySelector(".popup__title").textContent = this._title;
  }
}
