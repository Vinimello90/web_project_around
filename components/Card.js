export default class Card {
  constructor({ title, link, handleCardClick }, galleryCardElement) {
    this._title = title;
    this._link = link;
    this._containerElement = galleryCardElement;
    this.handleCardClick = handleCardClick;
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

  _handleCardClick = (evt) => {
    this.handleCardClick(evt, this._title, this._link);
  };

  _setEventListeners = () => {
    this._cardElement
      .querySelector(".card")
      .addEventListener("click", (evt) => {
        this._handleCardClick(evt);
      });
  };

  renderCard = () => {
    this._cardTemplate = document.querySelector("#card-template").content;
    this._cardElement = this._cardTemplate.cloneNode(true);
    this._cardImageElement = this._cardElement.querySelector(".card__image");
    this._cardImageElement.src = this._link;
    this._cardImageElement.alt = this._title;
    this._cardElement.querySelector(".card__title").textContent = this._title;
    this._setEventListeners();
    return this._cardElement;
  };
}
