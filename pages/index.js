import {
  formListElement,
  popupProfileForm,
  profileBtnElement,
  addBtnElement,
  galleryCardsElement,
} from "../utils/constants.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {
  fetchDataApi,
  addNewCardApi,
  editLikeApi,
  editUserInfoApi,
  deleteCardApi,
} from "../components/Api.js";

//instancia a classe FormValidator responsável na
//validação dos formulários.
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

// Instacia a classe UserInfo para manipular
// as informações do perfil do usuário.
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__job",
  avatarSelector: ".profile__picture",
});

// Ouvinte de eventos de clique com com função anonima de callback,
// que instancia a classe PopupwithForm para abrir o popup do formulário
// para editar o perfil.
profileBtnElement.addEventListener("click", () => {
  const { currentName, currentJob } = userInfo.getUserInfo();
  document.forms.profile.name.value = currentName;
  document.forms.profile.job.value = currentJob;
  //Chama o método público resetInputValidation() da classe FormValidator
  // para resetar e verificar novamente o formulário com as informações do perfil
  // adicionadas, é passado como argumento o elemento do formulário.
  formValidator.resetInputValidation(popupProfileForm);
  const popupProfile = new PopupWithForm({
    handleForm: ({ name, job }) => {
      popupProfile.loading(true);
      editUserInfoApi(name, job)
        .then(({ name, about: job }) => {
          userInfo.setUserInfo({ name, job });
          popupProfile.close();
        })
        .finally(() => popupProfile.loading(false));
    },
    popupSelector: ".popup_form-profile",
    buttonSelector: ".button_popup-submit",
  });
  popupProfile.setEventListeners();
  popupProfile.open();
});

// Ouvinte de eventos de clique com com função anonima de callback,
// que instancia classe PopupwithForm para abrir o popup do formulário
// para adicionar um novo card.
addBtnElement.addEventListener("click", () => {
  const popupAddCard = new PopupWithForm({
    // handleForm é um callback passado como argumento, que recebe os valores como
    // paramentro e instancia a classe Section que fica responsável por
    // renderizar na página o card.
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
          // parâmetro com os valores para o card, e instancia a classe Card para
          // criação dos cards.
          renderer: (item) => {
            const noCards = galleryCardsElement.querySelector(".no-cards");
            popupAddCard.loading(true);
            addNewCardApi(item)
              .then((card) => {
                const createCard = new Card(
                  {
                    title: card.name,
                    link: card.link,
                    isLiked: card.isLiked,
                    userId: card.owner,
                    ownerId: card.owner,
                    cardId: card._id,
                    // handleCardClick é um callback que manipula os cliques dos ouvintes
                    //  de eventos do card, passado como argumento e recebe como parâmetro
                    // o evento e os valores do card para adicionar a popup.
                    handleCardClick: (evt, { title, link, id, isLiked }) => {
                      if (evt.target.classList.contains("button_remove")) {
                        // remove o card se clicado no botão de fechar,
                        // e chama o método da classe Card para verificar
                        // se contém card ainda na seção.
                        deleteCardApi(id).then(() => {
                          evt.target.parentElement.remove();
                          createCard.handleRenderNoCards();
                        });
                      }
                      if (evt.target.classList.contains("button_like")) {
                        editLikeApi({ id, isLiked }).then(() =>
                          evt.target.classList.toggle("button_like_activate")
                        );
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
                // elemento e receber como retorno o elemento para renderizar o card na página.
                addCard.addItem(createCard.renderCard());
                // confere se no elemento na variavel noCards está ausente a classe que esconde ele,
                // caso verdadeiro chama a o método da classe Card que confere se há cards ou não para
                // para renderizar a mensagem caso não haja cards.
                !noCards.classList.contains("no-cards_hidden")
                  ? createCard.handleRenderNoCards()
                  : null;
                popupAddCard.close();
              })
              .finally(() => popupAddCard.loading(false));
          },
        },
        ".gallery__cards"
      );
      addCard.renderer();
    },
    popupSelector: ".popup_form-add-card",
    buttonSelector: ".button_popup-submit",
  });

  popupAddCard.setEventListeners();
  popupAddCard.open();
});

// Função fetchDataApi() requisita as informações do perfil
// e dos cards da API através da classe Api.
fetchDataApi().then(([user, cards]) => {
  // Renderiza as informações do perfil à página.
  userInfo.setUserInfo({
    name: user.name,
    job: user.about,
  });
  // Renderiza o avatar do perfil à página.
  userInfo.setUserAvatar({ avatar: user.avatar });
  const addInitialCards = new Section(
    {
      items: cards.reverse(),
      renderer: (item) => {
        const noCards = galleryCardsElement.querySelector(".no-cards");
        const createCard = new Card(
          {
            title: item.name,
            link: item.link,
            isLiked: item.isLiked,
            userId: user._id,
            ownerId: item.owner,
            cardId: item._id,
            handleCardClick: (evt, { title, link, id, isLiked }) => {
              if (evt.target.classList.contains("button_remove")) {
                deleteCardApi(id).then(() => {
                  evt.target.parentElement.remove();
                  createCard.handleRenderNoCards();
                });
              }
              if (evt.target.classList.contains("button_like")) {
                editLikeApi({ id, isLiked }).then(({ isLiked: status }) => {
                  console.log(status);
                  evt.target.classList.toggle("button_like_activate");
                  createCard.setLikeStatus(status);
                });
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
  //Renderiza os cards iniciais à página.
  addInitialCards.renderer();
});

//Inicializa a validação do formulário.
formValidator.enableValidation();

export { formValidator };
