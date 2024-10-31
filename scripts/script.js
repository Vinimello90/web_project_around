let element = document.querySelector(".profile");
let editBtnElement = element.querySelector(".button_edit");
let popupElement = document.querySelector(".popup");
let closeBtnElement = popupElement.querySelector(".button_close");
let FormElement = popupElement.querySelector(".button_popup-save");

function HandleProfileEditPopup() {
  if (!popupElement.classList.contains("popup__opened")) {
    let nameInput = popupElement.querySelector(".input_popup-name");
    let jobInput = popupElement.querySelector(".input_popup-job");
    nameInput.value = element.querySelector(".profile__name").textContent;
    jobInput.value = element.querySelector(".profile__job").textContent;
    popupElement.classList.toggle("popup__opened");
  } else {
    popupElement.classList.toggle("popup__opened");
  }
}

editBtnElement.addEventListener("click", HandleProfileEditPopup);
closeBtnElement.addEventListener("click", HandleProfileEditPopup);

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  let nameInput = popupElement.querySelector(".input_popup-name").value;
  let jobInput = popupElement.querySelector(".input_popup-job").value;
  element.querySelector(".profile__name").textContent = nameInput;
  element.querySelector(".profile__job").textContent = jobInput;
  HandleProfileEditPopup();
}

FormElement.addEventListener("click", handleProfileFormSubmit);
