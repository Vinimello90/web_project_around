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
  initialCards,
};
