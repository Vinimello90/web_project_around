const element = document.querySelector(".profile");
const editBtnElement = element.querySelector(".button_edit");
const addBtnElement = element.querySelector(".button_add");
const popupEditProfileElement = document.querySelector(
  ".popup_form-edit-profile"
);
const popupAddCardElement = document.querySelector(".popup_form-add-card");
const popupEditProfileForm =
  popupEditProfileElement.querySelector(".popup__form");
const popupAddCardForm = popupAddCardElement.querySelector(".popup__form");
const closeBtnElement = document.querySelectorAll(".button_close");
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

editBtnElement.addEventListener("click", () => {
  popupEditProfileElement.classList.add("popup_opened");
  const nameValue = element.querySelector(".profile__name").textContent;
  const jobValue = element.querySelector(".profile__job").textContent;
  const nameInput = popupEditProfileElement.querySelector(".input_popup-name");
  const jobInput = popupEditProfileElement.querySelector(".input_popup-job");
  nameInput.value = nameValue;
  jobInput.value = jobValue;
});

addBtnElement.addEventListener("click", () => {
  popupAddCardElement.classList.add("popup_opened");
});

closeBtnElement.forEach(function (btn) {
  btn.addEventListener("click", (evt) => {
    const popupElement = evt.target.parentElement.parentElement;
    popupElement.classList.remove("popup_opened");
  });
});

function addCard(titleValue, linkValue) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageElement = cardElement.querySelector(".card__image");
  cardImageElement.setAttribute("src", `${linkValue}`);
  cardImageElement.setAttribute("alt", `Imagem de ${titleValue}`);
  cardElement.querySelector(".card__title").textContent = titleValue;
  const removeButton = cardElement.querySelector(".button_remove");
  removeButton.addEventListener("click", function (evt) {
    evt.target.parentElement.remove();
    handleRenderNoCards();
  });
  cardImageElement.addEventListener("click", () => {
    const popupImage = document.querySelector(".popup_image");
    const imgElement = popupImage.querySelector(".popup__img");
    const titleElement = popupImage.querySelector(".popup__title");
    imgElement.setAttribute("src", `${linkValue}`);
    titleElement.textContent = titleValue;
    popupImage.classList.add("popup_opened");
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

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const nameInput =
    popupEditProfileForm.querySelector(".input_popup-name").value;
  const jobInput = popupEditProfileForm.querySelector(".input_popup-job").value;
  element.querySelector(".profile__name").textContent = nameInput;
  element.querySelector(".profile__job").textContent = jobInput;
  popupEditProfileElement.classList.remove("popup_opened");
}

popupEditProfileForm.addEventListener("submit", handleProfileFormSubmit);

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const titleValue =
    popupAddCardElement.querySelector(".input_popup-title").value;
  const linkValue =
    popupAddCardElement.querySelector(".input_popup-link").value;
  galleryCardsElement.prepend(addCard(titleValue, linkValue));
  popupAddCardElement.classList.remove("popup_opened");
}

popupAddCardForm.addEventListener("submit", handleAddCardFormSubmit);

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
