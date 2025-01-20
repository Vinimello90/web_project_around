const formListElement = document.querySelectorAll(".popup__form");
const profileElement = document.querySelector(".profile");
const profileBtnElement = profileElement.querySelector(".button_edit");
const addBtnElement = profileElement.querySelector(".button_add");
const popupProfileElement = document.querySelector(".popup_form-profile");
const popupProfileForm = popupProfileElement.querySelector(".popup__form");
const popupAddCardElement = document.querySelector(".popup_form-add-card");
const popupAddCardForm = popupAddCardElement.querySelector(".popup__form");
const galleryCardsElement = document.querySelector(".gallery__cards");
const noCards = galleryCardsElement.querySelector(".no-cards");

export {
  formListElement,
  profileElement,
  profileBtnElement,
  addBtnElement,
  popupProfileElement,
  popupProfileForm,
  popupAddCardElement,
  popupAddCardForm,
  galleryCardsElement,
  noCards,
};
