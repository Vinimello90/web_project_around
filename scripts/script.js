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
  const inputList = Array.from(popupProfileForm.querySelectorAll(".input"));
  toggleButtonState(inputList, popupProfileForm, {
    submitButtonSelector: ".button_popup-submit",
    inactiveButtonClass: "button_popup-submit_disabled",
  });
  popupProfileElement.classList.add("popup_opened");
  popupProfileElement.addEventListener("click", closePopup);
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
  if (
    evt.key === "Escape" ||
    evt.target.classList.contains("button_close") ||
    evt.target.classList.contains("popup_opened") ||
    evt.type === "submit"
  ) {
    popupElement.classList.remove("popup_opened");
    popupElement.removeEventListener("click", closePopup);
    document.removeEventListener("keydown", closePopup);
    document.forms.add.reset();
    resetInputValidation(formElement, {
      inputSelector: ".input",
      submitButtonSelector: ".button_popup-submit",
      inactiveButtonClass: "button_popup-submit_disabled",
      inputErrorClass: "input__popup_type_error",
      errorClass: "input__popup-error_visible",
    });
  }
}

function addCard(titleValue, linkValue) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageElement = cardElement.querySelector(".card__image");
  cardImageElement.src = linkValue;
  cardImageElement.alt = titleValue;
  cardElement.querySelector(".card__title").textContent = titleValue;
  cardImageElement.addEventListener("click", () => {
    const popupImage = document.querySelector(".popup_image");
    const imgElement = popupImage.querySelector(".popup__img");
    const titleElement = popupImage.querySelector(".popup__title");
    imgElement.src = linkValue;
    titleElement.textContent = titleValue;
    popupImage.classList.add("popup_opened");
    popupImage.addEventListener("click", closePopup);
    document.addEventListener("keydown", closePopup);
  });
  return cardElement;
}

initialCards.forEach((card) => {
  galleryCardsElement.prepend(addCard(card.title, card.link));
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const nameValue = document.forms.profile.name.value;
  const jobValue = document.forms.profile.job.value;
  profileElement.querySelector(".profile__name").textContent = nameValue;
  profileElement.querySelector(".profile__job").textContent = jobValue;
  closePopup(evt);
}

popupProfileForm.addEventListener("submit", handleProfileFormSubmit);

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const titleValue = document.forms.add.title.value;
  const linkValue = document.forms.add.link.value;
  galleryCardsElement.prepend(addCard(titleValue, linkValue));
  closePopup(evt);
}

popupAddCardForm.addEventListener("submit", handleAddCardFormSubmit);

function handleCardButtons(evt) {
  if (evt.target.classList.contains("button_remove")) {
    evt.target.parentElement.remove();
    handleRenderNoCards();
  }
  if (evt.target.classList.contains("button_like")) {
    evt.target.classList.toggle("button_like_activate");
  }
}

galleryCardsElement.addEventListener("click", handleCardButtons);

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
