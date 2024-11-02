const element = document.querySelector(".profile");
const editBtnElement = element.querySelector(".button_edit");
const popupElement = document.querySelector(".popup");
const closeBtnElement = popupElement.querySelector(".button_close");
const FormElement = popupElement.querySelector(".pop__form");
const galleryCardsElement = document.querySelector(".gallery__cards");

function OpenProfileEditPopup() {
  const nameInput = popupElement.querySelector(".input_popup-name");
  const jobInput = popupElement.querySelector(".input_popup-job");
  nameInput.value = element.querySelector(".profile__name").textContent;
  jobInput.value = element.querySelector(".profile__job").textContent;
  popupElement.classList.add("popup_opened");
}

editBtnElement.addEventListener("click", OpenProfileEditPopup);

// Separei a função de abrir da função de fechar a popup pois estava fechando caso desse mais de 1 cliquei rapido no botão de editar.

function CloseProfileEditPopup() {
  popupElement.classList.remove("popup_opened");
}

closeBtnElement.addEventListener("click", CloseProfileEditPopup);

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const nameInput = popupElement.querySelector(".input_popup-name").value;
  const jobInput = popupElement.querySelector(".input_popup-job").value;
  element.querySelector(".profile__name").textContent = nameInput;
  element.querySelector(".profile__job").textContent = jobInput;
  CloseProfileEditPopup();
}

FormElement.addEventListener("submit", handleProfileFormSubmit);

function handleGalleryCards() {
  const cards = galleryCardsElement.querySelectorAll(".card");
  const noCards = galleryCardsElement.querySelector(".no-cards");
  if (cards.length === 0) {
    noCards.classList.remove("no-cards_hidden");
  } else {
    noCards.classList.add("no-cards_hidden");
  }
}

handleGalleryCards();
