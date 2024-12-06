import {
  profileElement,
  profileBtnElement,
  addBtnElement,
  popupProfileElement,
  popupProfileForm,
  popupAddCardElement,
} from "./data.js";
import { formValidator } from "./index.js";

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

function openPopupImage(title, link) {
  const popupImage = document.querySelector(".popup_image");
  const imgElement = popupImage.querySelector(".popup__img");
  const titleElement = popupImage.querySelector(".popup__title");
  imgElement.src = link;
  imgElement.alt = title;
  titleElement.textContent = title;
  popupImage.classList.add("popup_opened");
  popupImage.addEventListener("click", closePopup);
  document.addEventListener("keydown", closePopup);
}

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

export { openPopupImage, closePopup };
