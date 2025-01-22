const formListElement = document.querySelectorAll(".popup__form");
const profileElement = document.querySelector(".profile");
const profileBtnElement = profileElement.querySelector(".button_edit");
const addBtnElement = profileElement.querySelector(".button_add");
const AvatarBtnElement = document.querySelector(".profile__avatar-button");
const popupAvatarElement = document.querySelector(".popup_form-avatar");
const popupAvatarForm = popupAvatarElement.querySelector(".popup__form");
const popupProfileElement = document.querySelector(".popup_form-profile");
const popupProfileForm = popupProfileElement.querySelector(".popup__form");
const galleryCardsElement = document.querySelector(".gallery__cards");
const noCards = galleryCardsElement.querySelector(".no-cards");

export {
  formListElement,
  AvatarBtnElement,
  profileBtnElement,
  addBtnElement,
  popupAvatarForm,
  popupProfileForm,
  galleryCardsElement,
  noCards,
};
