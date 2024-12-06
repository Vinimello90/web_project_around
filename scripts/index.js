import FormValidator from "./formValidator.js";
import Card from "./Card.js";
const formListElement = document.querySelectorAll(".popup__form");
const profileElement = document.querySelector(".profile");
const profileBtnElement = profileElement.querySelector(".button_edit");
const addBtnElement = profileElement.querySelector(".button_add");
const popupProfileElement = document.querySelector(".popup_form-profile");
const popupProfileForm = popupProfileElement.querySelector(".popup__form");
const popupAddCardElement = document.querySelector(".popup_form-add-card");
const popupAddCardForm = popupAddCardElement.querySelector(".popup__form");
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

//

profileBtnElement.addEventListener("click", () => {
  const nameInput = document.forms.profile.name;
  const jobInput = document.forms.profile.job;
  nameInput.value = profileElement.querySelector(".profile__name").textContent;
  jobInput.value = profileElement.querySelector(".profile__job").textContent;
  popupProfileElement.classList.add("popup_opened");
  popupProfileElement.addEventListener("click", closePopup);
  formValidator.resetInputValidation(popupProfileForm);
  document.addEventListener("keydown", closePopup);
});

addBtnElement.addEventListener("click", () => {
  popupAddCardElement.classList.add("popup_opened");
  popupAddCardElement.addEventListener("click", closePopup);
  document.addEventListener("keydown", closePopup);
});

function closePopup(evt) {
  const popupElement = document.querySelector(".popup_opened");
  const formElement = popupElement.querySelector(".popup__form");
  if (popupElement.classList.contains("popup_image")) {
    popupElement.classList.remove("popup_opened");
    popupElement.removeEventListener("click", closePopup);
    document.removeEventListener("keydown", closePopup);
    return;
  } else if (
    evt.key === "Escape" ||
    evt.target.classList.contains("button_close") ||
    evt.target.classList.contains("popup_opened") ||
    evt.type === "submit"
  ) {
    popupElement.classList.remove("popup_opened");
    popupElement.removeEventListener("click", closePopup);
    document.removeEventListener("keydown", closePopup);
    document.forms.add.reset();
    formValidator.resetInputValidation(formElement);
  }
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const nameValue = document.forms.profile.name.value;
  const jobValue = document.forms.profile.job.value;
  profileElement.querySelector(".profile__name").textContent = nameValue;
  profileElement.querySelector(".profile__job").textContent = jobValue;
  closePopup(evt);
}

popupProfileForm.addEventListener("submit", handleProfileFormSubmit);

function addCard(card) {
  const addCard = new Card(card, galleryCardsElement);
  addCard.enableRenderCards();
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const title = document.forms.add.title.value;
  const link = document.forms.add.link.value;
  addCard({ title, link });
  closePopup(evt);
}

popupAddCardForm.addEventListener("submit", handleAddCardFormSubmit);

initialCards.forEach((card) => addCard(card));

export default function handleRenderNoCards() {
  const cards = galleryCardsElement.querySelectorAll(".card");
  const noCards = galleryCardsElement.querySelector(".no-cards");
  if (cards.length === 0) {
    noCards.classList.remove("no-cards_hidden");
  } else {
    noCards.classList.add("no-cards_hidden");
  }
}

handleRenderNoCards();

const formValidator = new FormValidator(
  {
    formSelector: ".popup__form",
    fieldsetSelector: ".popup__fieldset",
    inputSelector: ".input",
    submitButtonSelector: ".button_popup-submit",
    inactiveButtonClass: "button_popup-submit_disabled",
    inputErrorClass: "input__popup_type_error",
    errorClass: "popup__error_visible",
  },
  formListElement
);

formValidator.enableValidation();
