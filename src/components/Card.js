// A classe Card é responsável por estruturar e manipular os elemementos do cartão antes de retornar o elemento para ser renderizado.
export default class Card {
  // O constructor recebe 2 parâmetros, o primeiro com 1 objeto com 2 valores e uma função de callback, e o segundo o seletor do elemento seção da galleria dos cartões.
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

  // O método público handleRenderNoCards, verifica se existem ainda há cartões na página para exibir a mensagem caso não tenha nenhum cartão.
  handleRenderNoCards = () => {
    const cards = this._containerElement.querySelectorAll(".card");
    const noCards = this._containerElement.querySelector(".no-cards");
    if (cards.length === 0) {
      noCards.classList.remove("no-cards_hidden");
    } else {
      noCards.classList.add("no-cards_hidden");
    }
  };

  // O método público handleCardClick, passa como argumento o evento e as informações do cartão para o callback para verificar qual elemento foi clicado e qual função será ativada.
  handleCardClick = (evt) => {
    this._handleCardClick(evt, {
      title: this._title,
      link: this._link,
      id: this._cardId,
      isLiked: this._isLiked,
    });
  };

  // O método público setLikeStatus() recebe como parâmetro um boolean para mudar o status da propriedade privada _isLiked para verdadeiroou falso para conseguir alterar mais de uma
  // vez o status sem precisar recarregar a página.
  setLikeStatus(status) {
    this._isLiked = status;
  }

  // O método privado _setEventListeners() adiciona o ouvinte de evento de click ao cartão.
  _setEventListeners = () => {
    this._cardElement
      .querySelector(".card")
      .addEventListener("click", this.handleCardClick);
  };

  // O método público renderCard() estrutura o elemento do card template clonado antes de retornar para ser renderizado na página.
  renderCard = () => {
    this._cardTemplate = document.querySelector("#card-template").content;
    this._cardElement = this._cardTemplate.cloneNode(true);
    this._cardImageElement = this._cardElement.querySelector(".card__image");
    this._cardImageElement.src = this._link;
    this._cardImageElement.alt = this._title;
    // Caso haja algum erro ao carregar a imagem o evento onerror ser ativado e chamara a função anonima para carregar um imagem indicando que a imagem original não está disponivel.
    this._cardImageElement.onerror = () => {
      this._cardImageElement.src = "./images/no_image_avaible.png";
    };
    this._cardElement.querySelector(".card__title").textContent = this._title;
    this.cardLikeElement = this._cardElement.querySelector(".button_like");
    // Verifica se a propriedade oculta é verdadeira para ativar o botão de like ao carregar o cartão.
    if (this._isLiked) {
      this.cardLikeElement.classList.add("button_like_activate");
    }
    // Verifica se o id do proprietário do cartão é diferente do id do usuário para remover o botão de deletar o cartão caso não seja do usuário
    if (this._ownerId !== this._userId) {
      this._cardElement.querySelector(".button_remove").remove();
    }
    this._setEventListeners();
    return this._cardElement;
  };
}
