import { openPopupImage } from "./utils.js";
export default class Card {
  constructor(card, galleryCardElement) {
    this._title = card.title;
    this._link = card.link;
    this._galleryElement = galleryCardElement;
  }

  handleRenderNoCards = () => {
    const cards = this._galleryElement.querySelectorAll(".card");
    const noCards = this._galleryElement.querySelector(".no-cards");
    if (cards.length === 0) {
      noCards.classList.remove("no-cards_hidden");
    } else {
      noCards.classList.add("no-cards_hidden");
    }
  };

  _handleCardButtons = (evt) => {
    if (evt.target.classList.contains("button_remove")) {
      evt.target.parentElement.remove();
      this.handleRenderNoCards();
    }
    if (evt.target.classList.contains("button_like")) {
      evt.target.classList.toggle("button_like_activate");
    }
  };

  _setEventListeners = () => {
    if (!this._galleryElement._listenerAttached) {
      this._galleryElement.addEventListener("click", this._handleCardButtons);
      this._galleryElement._listenerAttached = true;
    }
    this._cardImageElement.addEventListener("click", () =>
      openPopupImage(this._title, this._link)
    );
  };

  renderCard = () => {
    this._cardTemplate = document.querySelector("#card-template").content;
    this._cardElement = this._cardTemplate.cloneNode(true);
    this._cardImageElement = this._cardElement.querySelector(".card__image");
    this._cardImageElement.src = this._link;
    this._cardImageElement.alt = this._title;
    this._cardElement.querySelector(".card__title").textContent = this._title;
    this._setEventListeners(this._cardImageElement);
    return this._cardElement;
  };
}
