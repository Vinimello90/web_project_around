import {
  formListElement,
  profileElement,
  popupProfileForm,
  profileBtnElement,
  addBtnElement,
  popupAddCardForm,
  galleryCardsElement,
  initialCards,
} from "../utils/constants.js";
import Popup from "../components/Popup.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";

// Ouvinte do botão para abrir o popup do formulário para editar
// o perfil.
profileBtnElement.addEventListener("click", () => {
  const popupProfile = new PopupWithForm(
    { handlerForm: ({ name, job }) => {} },
    ".popup_form-profile"
  );
  popupProfile.setEventListeners();
  popupProfile.open();
});

// Ouvinte do botão para abrir o popup do formulário para adicionar um
// novo card.
addBtnElement.addEventListener("click", () => {
  const popupAddCard = new PopupWithForm(
    {
      handlerForm: ({ title, link }) => {
        const addCard = new Section(
          {
            items: [
              {
                title,
                link,
              },
            ],
            renderer: (item) => {
              const noCards = galleryCardsElement.querySelector(".no-cards");
              const createCard = new Card(
                {
                  title: item.title,
                  link: item.link,
                  handleCardClick: (evt, title, link) => {
                    if (evt.target.classList.contains("button_remove")) {
                      evt.target.parentElement.remove();
                      createCard.handleRenderNoCards();
                    }
                    if (evt.target.classList.contains("button_like")) {
                      evt.target.classList.toggle("button_like_activate");
                    }
                    if (evt.target.classList.contains("card__image")) {
                      const popupWithImage = new PopupWithImage(
                        {
                          title: title,
                          link: link,
                        },
                        ".popup_image"
                      );
                      popupWithImage.open();
                    }
                  },
                },
                galleryCardsElement
              );
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
        popupAddCard.close();
      },
    },
    ".popup_form-add-card"
  );

  popupAddCard.setEventListeners();
  popupAddCard.open();
});

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

// function handleProfileFormSubmit(evt) {
//   evt.preventDefault();
//   const nameValue = document.forms.profile.name.value;
//   const jobValue = document.forms.profile.job.value;
//   profileElement.querySelector(".profile__name").textContent = nameValue;
//   profileElement.querySelector(".profile__job").textContent = jobValue;
//   closePopup(evt);
// }

const addInitialCards = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const noCards = galleryCardsElement.querySelector(".no-cards");
      const createCard = new Card(
        {
          title: item.title,
          link: item.link,
          handleCardClick: (evt, title, link) => {
            if (evt.target.classList.contains("button_remove")) {
              evt.target.parentElement.remove();
              createCard.handleRenderNoCards();
            }
            if (evt.target.classList.contains("button_like")) {
              evt.target.classList.toggle("button_like_activate");
            }
            if (evt.target.classList.contains("card__image")) {
              const popupWithImage = new PopupWithImage(
                {
                  title: title,
                  link: link,
                },
                ".popup_image"
              );
              popupWithImage.open();
            }
          },
        },
        galleryCardsElement
      );
      addInitialCards.addItem(createCard.renderCard());
      !noCards.classList.contains("no-cards_hidden")
        ? createCard.handleRenderNoCards()
        : null;
    },
  },
  ".gallery__cards"
);

addInitialCards.renderer();

// function handleAddCardFormSubmit(evt) {
//   evt.preventDefault();
//   const title = document.forms.add.title.value;
//   const link = document.forms.add.link.value;
//   const addCard = new Section(
//     {
//       items: [
//         {
//           title,
//           link,
//         },
//       ],
//       renderer: (item) => {
//         const noCards = galleryCardsElement.querySelector(".no-cards");
//         const createCard = new Card(
//           {
//             title: item.title,
//             link: item.link,
//             handleCardClick: (evt, title, link) => {
//               if (evt.target.classList.contains("button_remove")) {
//                 evt.target.parentElement.remove();
//                 createCard.handleRenderNoCards();
//               }
//               if (evt.target.classList.contains("button_like")) {
//                 evt.target.classList.toggle("button_like_activate");
//               }
//               if (evt.target.classList.contains("card__image")) {
//                 const popupWithImage = new PopupWithImage(
//                   {
//                     title: title,
//                     link: link,
//                   },
//                   ".popup_image"
//                 );
//                 popupWithImage.open();
//               }
//             },
//           },
//           galleryCardsElement
//         );
//         createCard.handleRenderNoCards();
//         addCard.addItem(createCard.renderCard());
//         !noCards.classList.contains("no-cards_hidden")
//           ? createCard.handleRenderNoCards()
//           : null;
//       },
//     },
//     ".gallery__cards"
//   );
//   addCard.renderer();
//   closePopup(evt);
// }

// popupAddCardForm.addEventListener("submit", handleAddCardFormSubmit);

export { formValidator };
