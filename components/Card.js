// A classe Card que é responsável por estruturar e manipular os elemementos do card,
// antes de retornar o elemento para ser renderizado.
export default class Card {
  // O constructor recebe 2 parâmetros, o primeiro com 1 objeto com 2 valores
  // e uma função de callback, e o segundo o seletor do elemento seção da galleria de cards.
  constructor({ title, link, handleCardClick }, galleryCardElement) {
    this._title = title;
    this._link = link;
    this._containerElement = galleryCardElement;
    this._handleCardClick = handleCardClick;
  }
  // O método público handleRenderNoCards, verifica se existem ainda cards
  // na página para exibir a mensagem caso não tenha nenhum card.
  handleRenderNoCards = () => {
    const cards = this._containerElement.querySelectorAll(".card");
    const noCards = this._containerElement.querySelector(".no-cards");
    if (cards.length === 0) {
      noCards.classList.remove("no-cards_hidden");
    } else {
      noCards.classList.add("no-cards_hidden");
    }
  };
  // O método público handleCardClick, passa como argumento o evento e as informações do card
  // para o callback para verificar qual elemento foi clicado e qual função será ativada.
  handleCardClick = (evt) => {
    this._handleCardClick(evt, this._title, this._link);
  };
  // O método privado _setEventListeners() adiciona o ouvinte de evento de click ao card.
  _setEventListeners = () => {
    this._cardElement
      .querySelector(".card")
      .addEventListener("click", this.handleCardClick);
  };
  // O método público renderCard() estrutura o elemento do card template clonado antes de
  // retornar para ser renderizado na página.
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
