import {
  formListElement,
  profileElement,
  popupProfileForm,
  popupAddCardForm,
  galleryCardsElement,
  initialCards,
} from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { closePopup } from "../utils/utils.js";

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
  const noCards = galleryCardsElement.querySelector(".no-cards");
  const addCard = new Card(card, galleryCardsElement);
  galleryCardsElement.prepend(addCard.renderCard());
  galleryCardsElement.querySelector(".no-cards");
  !noCards.classList.contains("no-cards_hidden")
    ? addCard.handleRenderNoCards()
    : null;
}

initialCards.forEach((card) => addCard(card));

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const title = document.forms.add.title.value;
  const link = document.forms.add.link.value;
  addCard({ title, link });
  closePopup(evt);
}

popupAddCardForm.addEventListener("submit", handleAddCardFormSubmit);

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

export { formValidator };
