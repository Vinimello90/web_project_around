// A classe Card que é responsável por estruturar e manipular os elemementos do card,
// antes de retornar o elemento para ser renderizado.
export default class Card {
  // O constructor recebe 2 parâmetros, o primeiro com 1 objeto com 2 valores
  // e uma função de callback, e o segundo o seletor do elemento seção da galleria de cards.

  constructor(
    { title, link, isLiked, userId, ownerId, cardId, handleCardClick },
    galleryCardElement
  ) {
    this._title = title;
    this._link = link;
    this._isLiked = isLiked;
    this._userId = userId;
    this._ownerId = ownerId;
    this._cardId = cardId;
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
    this._handleCardClick(evt, {
      title: this._title,
      link: this._link,
      id: this._cardId,
      isLiked: this._isLiked,
    });
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
    // Adiciona a id do card.
    this._cardElement.querySelector(".card").setAttribute("id", this._cardId);
    this._cardImageElement = this._cardElement.querySelector(".card__image");
    this._cardImageElement.src = this._link;
    this._cardImageElement.alt = this._title;
    // Caso haja algum erro ao carregar a imagem o evento onerror ser ativado
    // e chamara a função anonima para carregar um imagem indicando
    //  que a imagem original não está disponivel.
    this._cardImageElement.onerror = () => {
      this._cardImageElement.src = "../images/imagem-nao-disponivel.png";
    };
    this._cardElement.querySelector(".card__title").textContent = this._title;
    this.cardLikeElement = this._cardElement.querySelector(".button_like");
    // Verifica se a propriedade oculta é verdadeira para ativar o botão de like
    // ao carregar o card.
    if (this._isLiked) {
      this.cardLikeElement.classList.add("button_like_activate");
    }
    // Verifica se o id do proprietário do card é diferente do id do
    // usuário para remover o botão de deletar o card caso não seja do
    // usuário
    if (this._ownerId !== this._userId) {
      this._cardElement.querySelector(".button_remove").remove();
    }
    this._setEventListeners();
    return this._cardElement;
  };
}
