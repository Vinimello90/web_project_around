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
import UserInfo from "../components/UserInfo.js";

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

// Ouvinte de eventos de clique com com função anonima de callback,
// que instancia a classe PopupwithForm para abrir o popup do formulário
// para editar o perfil.
profileBtnElement.addEventListener("click", () => {
  const userInfo = new UserInfo({
    nameSelector: ".profile__name",
    jobSelector: ".profile__job",
  });
  const { currentName, currentJob } = userInfo.getUserInfo();
  document.forms.profile.name.value = currentName;
  document.forms.profile.job.value = currentJob;
  formValidator.resetInputValidation(popupProfileForm);
  const popupProfile = new PopupWithForm(
    {
      handleForm: ({ name, job }) => {
        userInfo.setUserInfo({ name, job });
        popupProfile.close();
      },
    },
    ".popup_form-profile"
  );
  popupProfile.setEventListeners();
  popupProfile.open();
});

// Ouvinte de eventos de clique com com função anonima de callback,
// que instancia classe PopupwithForm para abrir o popup do formulário
// para adicionar um novo card.
addBtnElement.addEventListener("click", () => {
  const popupAddCard = new PopupWithForm(
    {
      // handleForm é um callback passado como argumento, que recebe os valores como
      // paramentro e instancia a classe Section que fica responsável por
      // renderizar no site o card.
      handleForm: ({ title, link }) => {
        const addCard = new Section(
          {
            items: [
              {
                title,
                link,
              },
            ],
            // renderer é um callback passado como argumento, recebe um objeto como
            // parametro com os valores para o card, e instancia a classe Card para
            // criação dos cards.
            renderer: (item) => {
              const noCards = galleryCardsElement.querySelector(".no-cards");
              const createCard = new Card(
                {
                  title: item.title,
                  link: item.link,
                  // handleCardClick é um callback que manipula os cliques dos ouvintes
                  //  de eventos do card, passado como argumento e recebe como parametro
                  // o evento e os valores do card para adicionar a popup.
                  handleCardClick: (evt, title, link) => {
                    if (evt.target.classList.contains("button_remove")) {
                      // remove o card se clicado no botão de fechar,
                      // e chama o método da classe Card para verificar
                      // se contém card ainda na seção.
                      evt.target.parentElement.remove();
                      createCard.handleRenderNoCards();
                    }
                    if (evt.target.classList.contains("button_like")) {
                      // adiciona a classe para ativar o like caso clicado.
                      evt.target.classList.toggle("button_like_activate");
                    }
                    if (evt.target.classList.contains("card__image")) {
                      // Instancia a classe PopupWithImage passando como argumento
                      // os dados do card.
                      const popupWithImage = new PopupWithImage(
                        {
                          title: title,
                          link: link,
                        },
                        ".popup_image"
                      );
                      //metódo open da classe PopupWithImage para abrir a popup.
                      popupWithImage.open();
                    }
                  },
                },
                galleryCardsElement
              );
              // método da classe Section que é pasasdo como callback para criar o
              // elemento e receber como retorno o elemento para adicionar ao site.
              addCard.addItem(createCard.renderCard());
              // confere se no elemento na variavel noCards está ausente a classe que esconde ele,
              // caso verdadeiro chama a o método da classe Card que confere se há cards ou não para
              // para renderizar a mensagem caso não haja cards.
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

export { formValidator };
