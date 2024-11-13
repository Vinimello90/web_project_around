const element = document.querySelector(".profile");
const editBtnElement = element.querySelector(".button_edit");
const addBtnElement = element.querySelector(".button_add");
const popupElement = document.querySelector(".popup");
const closeBtnElement = popupElement.querySelector(".button_close");
const formElement = popupElement.querySelector(".pop__form");
const galleryCardsElement = document.querySelector(".gallery__cards");
const initialCards = [
  {
    title: "Lago tenaya",
    link: "https://images.unsplash.com/photo-1670844699961-f1eb1793987a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Parque Nacional de Yosemite",
    link: "https://images.unsplash.com/photo-1721697310377-1a70ae366cb2?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Monte Baker",
    link: "https://images.unsplash.com/photo-1670601520822-b4f0180b6815?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Árvore de Josué",
    link: "https://images.unsplash.com/photo-1596625820723-f0f481ff80be?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Cume da montanha cinzenta",
    link: "https://images.unsplash.com/photo-1506318164473-2dfd3ede3623?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Jardim dos Deuses",
    link: "https://images.unsplash.com/photo-1648515391046-078cc3b4be92?q=80&w=1996&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

function openPopup(evt) {
  const nameInput = popupElement.querySelector(".input_popup-name");
  const jobInput = popupElement.querySelector(".input_popup-job");
  if (evt.target.classList.contains("button_edit")) {
    nameInput.value = element.querySelector(".profile__name").textContent;
    jobInput.value = element.querySelector(".profile__job").textContent;
    popupElement.classList.add("popup_opened");
  } else {
    popupElement.querySelector(".popup__title").textContent = "Novo local";
    popupElement
      .querySelector(".input_popup-name")
      .setAttribute("placeholder", "Título");
    popupElement
      .querySelector(".input_popup-job")
      .setAttribute("placeholder", "Link de imagem");
    popupElement.querySelector(".button_popup-save").textContent = "Criar";
    popupElement.classList.add("popup_opened");
  }
}

editBtnElement.addEventListener("click", openPopup);
addBtnElement.addEventListener("click", openPopup);

function closePopup() {
  const nameInput = popupElement.querySelector(".input_popup-name");
  const jobInput = popupElement.querySelector(".input_popup-job");
  popupElement.classList.remove("popup_opened");
  nameInput.value = "";
  jobInput.value = "";
  popupElement.querySelector(".popup__title").textContent = "Editar perfil";
  popupElement.querySelector(".button_popup-save").textContent = "Salvar";
  popupElement
    .querySelector(".input_popup-name")
    .setAttribute("placeholder", "Nome");
  popupElement
    .querySelector(".input_popup-job")
    .setAttribute("placeholder", "Sobre mim");
}

closeBtnElement.addEventListener("click", closePopup);

function addCard(titleValue, linkValue) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.cloneNode(true);
  cardElement
    .querySelector(".card__picture")
    .setAttribute("src", `${linkValue}`);
  cardElement
    .querySelector(".card__picture")
    .setAttribute("alt", `Imagem de ${titleValue}`);
  cardElement.querySelector(".card__title").textContent = titleValue;
  const removeButton = cardElement.querySelector(".button_remove");
  removeButton.addEventListener("click", function (evt) {
    evt.target.parentElement.remove();
    handleRenderNoCards();
  });
  const likeBtn = cardElement.querySelector(".button_like");
  likeBtn.addEventListener("click", function (evt) {
    evt.target.classList.toggle("button_like_activate");
  });
  return cardElement;
}

initialCards.forEach(function (card) {
  galleryCardsElement.prepend(addCard(card.title, card.link));
});

function handleFormSubmit(evt) {
  const popUpTitle = popupElement.querySelector(".popup__title").textContent;
  evt.preventDefault();
  switch (popUpTitle) {
    case "Editar perfil":
      const nameInput = popupElement.querySelector(".input_popup-name").value;
      const jobInput = popupElement.querySelector(".input_popup-job").value;
      element.querySelector(".profile__name").textContent = nameInput;
      element.querySelector(".profile__job").textContent = jobInput;
      break;
    case "Novo local":
      const titleInput = popupElement.querySelector(".input_popup-name").value;
      const linkInput = popupElement.querySelector(".input_popup-job").value;
      const cardElement = addCard(titleInput, linkInput);
      galleryCardsElement.prepend(cardElement);
      break;
  }
  closePopup();
}

formElement.addEventListener("submit", handleFormSubmit);

function handleRenderNoCards() {
  const cards = galleryCardsElement.querySelectorAll(".card");
  const noCards = galleryCardsElement.querySelector(".no-cards");
  if (cards.length === 0) {
    noCards.classList.remove("no-cards_hidden");
  } else {
    noCards.classList.add("no-cards_hidden");
  }
}

handleRenderNoCards();
