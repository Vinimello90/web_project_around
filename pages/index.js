import {
  formListElement,
  AvatarBtnElement,
  profileBtnElement,
  addBtnElement,
  popupProfileForm,
  galleryCardsElement,
  noCards,
} from "../utils/constants.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";

// instância a classe Api para fazer as solicitações da API.
const api = new Api({
  baseUrl: "https://around-api.pt-br.tripleten-services.com/v1",
  headers: {
    authorization: "3104c43f-5c52-4781-879f-672ac8ed2b72",
    "Content-Type": "application/json",
  },
});

//instância classe FormValidator responsável na validação dos formulários.
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

//Chama o método público da classe FormValidator que inicializa a validação dos formulários.
formValidator.enableValidation();

// Instacia a classe UserInfo para manipular as informações do perfil do usuário.
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__job",
  avatarSelector: ".profile__avatar",
});

// Ouvinte de eventos do botão de alterar o avatar para abrir a popup do formulário de edição da imagem do avatar.
AvatarBtnElement.addEventListener("click", () => {
  // instância a classe PopupWithForm() para abrir o popup do formulário para editar a imagem do avatar.
  const popupAvatar = new PopupWithForm({
    handleForm: ({ link }) => {
      // Método loading("true") da classe Popup() que adiciona um aviso de salvando ao botão de submit e desativa o botão enquanto aguarda a solicitação da API.
      popupAvatar.loading(true);
      // Chama o método da classe Api, que solicita a alteração da imagem do avatar e retorna os dados alterados se tiver sucesso ao método then().
      api
        .updateUserAvatar({ avatar: link })
        .then((link) => {
          userInfo.setUserAvatar(link);
          popupAvatar.close();
        })
        // Método loading("false") da classe Popup() volta o texto padrão do botão
        .finally(() => popupAvatar.loading(false));
    },
    popupSelector: ".popup_form-avatar",
    buttonSelector: ".button_popup-submit",
  });
  popupAvatar.open();
});

// Ouvinte de eventos de clique com função anonima de callback, que instância a classe PopupwithForm para abrir o popup do formulário para editar o perfil.
profileBtnElement.addEventListener("click", () => {
  const { currentName, currentJob } = userInfo.getUserInfo();
  document.forms.profile.name.value = currentName;
  document.forms.profile.job.value = currentJob;
  // Chama o método público da classe FormValidator com as informações do perfil adicionadas, é passado como argumento o elemento do formulário.
  formValidator.resetInputValidation(popupProfileForm);
  const popupProfile = new PopupWithForm({
    handleForm: ({ name, job: about }) => {
      popupProfile.loading(true);
      // Chama o método público da classe Api, que solicita a alteração do perfil e retorna os dados alterados se tiver sucesso ao método then().
      api
        .updateUserInfo({
          name,
          about,
        })
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

// Função que instância a classe Section que é responsável por iniciar a construção dos cartões e renderizar à página.
function generateCards(cards) {
  const addCard = new Section(
    {
      items: cards,
      // renderer é um callback passado como argumento, recebe um objeto como parâmetro com os valores para o card, e instância classe Card para criação dos cards.
      renderer: (card) => {
        const createCard = new Card(
          {
            title: card.name,
            link: card.link,
            isLiked: card.isLiked,
            userId: card.owner,
            ownerId: card.owner,
            cardId: card._id,
            // handleCardClick é um callback que manipula os cliques dos ouvintes de eventos do card, passado como argumento e recebe como parâmetro o evento
            // e os valores do card para adicionar a popup.
            handleCardClick: (evt, { title, link, id, isLiked }) => {
              if (evt.target.classList.contains("button_remove")) {
                // Instância classe PopupWithConfirmation() responsável pela remoção do cartão caso confirmado
                const popupConfirmation = new PopupWithConfirmation({
                  handleConfirmation: () => {
                    // Chama o método público da classe Api, que solicita a remoção do cartão e retorna ao método then() se tiver sucesso.
                    api
                      .deleteCard(id)
                      .then(() => {
                        // remove o card da página.
                        evt.target.parentElement.remove();
                        // verifica se contém cartões ainda na galeria.
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
                // Chama o método público da classe API, que solicita a alteração do status do like e retorna ao método then() se tiver sucesso.
                api
                  .editLikeStatus({
                    method: !isLiked ? "PUT" : "DELETE",
                    id,
                  })
                  .then(({ isLiked: status }) => {
                    evt.target.classList.toggle("button_like_activate");
                    createCard.setLikeStatus(status);
                  });
              }
              if (evt.target.classList.contains("card__image")) {
                // instância classe PopupWithImage passando como argumento os dados do card.
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
        // método da classe Section que é passado como callback para criar o elemento e receber como retorno o elemento para renderizar o card na página.
        addCard.addItem(createCard.renderCard());
        // confere se esta ausente a classe no elemento, caso verdadeiro chama a o método da classe Card que verifica se contém cartões ainda na galeria para renderizar a mensagem caso não haja.
        !noCards.classList.contains("no-cards_hidden")
          ? createCard.handleRenderNoCards()
          : null;
      },
    },
    ".gallery__cards"
  );
  addCard.renderer();
}

// Ouvinte de eventos do botão que abre a popup do formulário para adicionar um novo cartão.
addBtnElement.addEventListener("click", () => {
  const popupAddCard = new PopupWithForm({
    // handleForm é um callback passado como argumento, que instância classe Section responsável por renderizar na página o card.
    handleForm: ({ title: name, link }) => {
      popupAddCard.loading(true);
      // Chama o método público da classe Api que solicita adição dos dados do novo cartão à API e retorna ao método then() se tiver sucesso.
      api
        .addNewCard({
          name,
          link,
        })
        .then((card) => {
          // função  instância a classe Section que é responsável por iniciar a construção do card e renderizar à página.
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

// Chama o método público da classe Api que solicita os dados do perfil e retorna ao método then() se tiver sucesso.
api.getUserInfo().then((user) => {
  // Renderiza as informações do perfil à página.
  userInfo.setUserInfo({
    name: user.name,
    job: user.about,
  });
  // Renderiza o avatar do perfil à página.
  userInfo.setUserAvatar({ avatar: user.avatar });
});

// Chama o método público da classe Api que solicita os dados dos cartões iniciais e retorna ao método then() se tiver sucesso.
api.getInitialCards().then((cards) => {
  // função generateCards() instância a classe Section que é responsável por iniciar a construção do card e renderizar à página.
  generateCards(cards.reverse());
});

export { formValidator };
