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
import Section from "../components/Section.js";
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

const addInitialCards = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const noCards = galleryCardsElement.querySelector(".no-cards");
      const createCard = new Card(item, galleryCardsElement);
      addInitialCards.addItem(createCard.renderCard());
      !noCards.classList.contains("no-cards_hidden")
        ? createCard.handleRenderNoCards()
        : null;
    },
  },
  ".gallery__cards"
);

addInitialCards.renderer();

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const title = document.forms.add.title.value;
  const link = document.forms.add.link.value;
  const addCard = new Section(
    {
      items: [{ title, link }],
      renderer: (item) => {
        const noCards = galleryCardsElement.querySelector(".no-cards");
        const createCard = new Card(item, galleryCardsElement);
        createCard.handleRenderNoCards();
        addCard.addItem(createCard.renderCard());
        !noCards.classList.contains("no-cards_hidden")
          ? createCard.handleRenderNoCards()
          : null;
      },
    },
    ".gallery__cards"
  );
  addCard.renderer();
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
