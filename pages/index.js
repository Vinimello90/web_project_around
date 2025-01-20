import {
  formListElement,
  popupProfileForm,
  profileBtnElement,
  addBtnElement,
  galleryCardsElement,
  noCards,
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
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";

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

//Inicializa a validação do formulário.
formValidator.enableValidation();

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
  popupProfile.open();
});

function generateCards(cards) {
  const addCard = new Section(
    {
      items: cards,
      // renderer é um callback passado como argumento, recebe um objeto como
      // parâmetro com os valores para o card, e instancia a classe Card para
      // criação dos cards.
      renderer: (card) => {
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
                const popupConfirmation = new PopupWithConfirmation({
                  handleConfirmation: () => {
                    deleteCardApi(id)
                      .then(() => {
                        evt.target.parentElement.remove();
                        createCard.handleRenderNoCards();
                      })
                      .finally(() => popupConfirmation.close());
                  },
                  popupSelector: ".popup_confirmation",
                  submitButtonSelector: ".button_popup-submit",
                });
                popupConfirmation.open();
              }
              if (evt.target.classList.contains("button_like")) {
                editLikeApi({ id, isLiked }).then(({ isLiked: status }) => {
                  evt.target.classList.toggle("button_like_activate");
                  createCard.setLikeStatus(status);
                });
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
      },
    },
    ".gallery__cards"
  );
  addCard.renderer();
}

// Ouvinte de eventos de clique com com função anonima de callback,
// que instancia classe PopupwithForm para abrir o popup do formulário
// para adicionar um novo card.
addBtnElement.addEventListener("click", () => {
  const popupAddCard = new PopupWithForm({
    // handleForm é um callback passado como argumento, que recebe os valores como
    // paramentro e instancia a classe Section que fica responsável por
    // renderizar na página o card.
    handleForm: ({ title, link }) => {
      popupAddCard.loading(true);
      addNewCardApi({ title, link })
        .then((card) => {
          generateCards([card]);
          popupAddCard.close();
        })
        .finally(() => popupAddCard.loading(false));
    },
    popupSelector: ".popup_form-add-card",
    buttonSelector: ".button_popup-submit",
  });
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
  generateCards(cards.reverse());
});

export { formValidator };
