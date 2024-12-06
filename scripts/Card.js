import handleRenderNoCards from "./index.js";

export default class Card {
  constructor(card, galleryCardElement) {
    this._title = card.title;
    this._link = card.link;
    this.galleryElement = galleryCardElement;
  }

  _renderCard() {
    console.log(this._link);
    this._cardTemplate = document.querySelector("#card-template").content;
    this._cardElement = this._cardTemplate.cloneNode(true);
    this._cardImageElement = this._cardElement.querySelector(".card__image");
    this._cardImageElement.src = this._link;
    this._cardImageElement.alt = this._title;
    this._cardElement.querySelector(".card__title").textContent = this._title;
    this._cardImageElement.addEventListener("click", () => {
      this._popupImage = document.querySelector(".popup_image");
      this._imgElement = this._popupImage.querySelector(".popup__img");
      this._titleElement = this._popupImage.querySelector(".popup__title");
      this._imgElement.src = this._link;
      this._titleElement.textContent = this._title;
      this._popupImage.classList.add("popup_opened");
      this._popupImage.addEventListener("click", closePopup);
      document.addEventListener("keydown", closePopup);
    });
    return this._cardElement;
  }

  _handleCardButtons(evt) {
    if (evt.target.classList.contains("button_remove")) {
      evt.target.parentElement.remove();
      handleRenderNoCards();
    }
    if (evt.target.classList.contains("button_like")) {
      evt.target.classList.toggle("button_like_activate");
    }
  }

  enableRenderCards() {
    this.galleryElement.prepend(this._renderCard());
    this.galleryElement.addEventListener("click", this._handleCardButtons);
  }
}
