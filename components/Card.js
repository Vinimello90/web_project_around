export default class Card {
  constructor({ title, link, handleCardEvents }, galleryCardElement) {
    this._title = title;
    this._link = link;
    this._containerElement = galleryCardElement;
    this.handleCardEvents = handleCardEvents;
  }

  handleRenderNoCards = () => {
    const cards = this._containerElement.querySelectorAll(".card");
    const noCards = this._containerElement.querySelector(".no-cards");
    if (cards.length === 0) {
      noCards.classList.remove("no-cards_hidden");
    } else {
      noCards.classList.add("no-cards_hidden");
    }
  };

  _handleCardEvents = (evt) => {
    this.handleCardEvents(evt);
  };

  _setEventListeners = () => {
    if (!this._containerElement._listenerAttached) {
      this._containerElement.addEventListener("click", this._handleCardEvents);
      this._containerElement._listenerAttached = true;
    }
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
