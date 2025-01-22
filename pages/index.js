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
import {
  fetchDataApi,
  addNewCardApi,
  editLikeApi,
  editUserInfoApi,
  deleteCardApi,
  editAvatarApi,
} from "../components/Api.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";

//instância classe FormValidator responsável na
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
  avatarSelector: ".profile__avatar",
});

// Ouvinte de eventos do botão de alterar o avatar para abrir a popup
// do formulário de edição da imagem do avatar.
AvatarBtnElement.addEventListener("click", () => {
  // instância a classe PopupWithForm() para abrir o popup do formulário
  // para editar a imagem do avatar.
  const popupAvatar = new PopupWithForm({
    handleForm: ({ link }) => {
      // Método loading("true") da classe Popup() que adiciona um aviso
      // de salvando ao botão de submit e desativa o botão enquanto aguarda a solicitação da API.
      popupAvatar.loading(true);
      // Chama a função que chama o método da classe API, que solicita a alteração da imagem do avatar
      // e retorna os dados alterados se tiver sucesso ao método then().
      editAvatarApi(link)
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

// Ouvinte de eventos de clique com com função anonima de callback,
// que instância classe PopupwithForm para abrir o popup do formulário
// para editar o perfil.
profileBtnElement.addEventListener("click", () => {
  const { currentName, currentJob } = userInfo.getUserInfo();
  document.forms.profile.name.value = currentName;
  document.forms.profile.job.value = currentJob;
  // Chama o método resetInputValidation() da classe FormValidator
  // para resetar e verificar novamente o formulário com as informações do perfil
  // adicionadas, é passado como argumento o elemento do formulário.
  formValidator.resetInputValidation(popupProfileForm);
  const popupProfile = new PopupWithForm({
    handleForm: ({ name, job }) => {
      popupProfile.loading(true);
      // Chama a função que chama o método da classe API, que solicita a alteração do perfil
      // e retorna os dados alterados se tiver sucesso ao método then().
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

// Função que instância a classe Section que é responsável por iniciar a construção do card e
// renderizar à página.
function generateCards(cards) {
  const addCard = new Section(
    {
      items: cards,
      // renderer é um callback passado como argumento, recebe um objeto como
      // parâmetro com os valores para o card, e instância classe Card para
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
                // Instância classe PopupWithConfirmation() responsável pela remoção
                // do cartã caso confirmado
                const popupConfirmation = new PopupWithConfirmation({
                  handleConfirmation: () => {
                    // Chama a função que chama o método da classe API, que solicita a remoção do cartão
                    // e retorna ao método then() se tiver sucesso.
                    deleteCardApi(id)
                      .then(() => {
                        // remove o card da página.
                        evt.target.parentElement.remove();
                        // verifica se contém card ainda na galeria.
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
                // Chama a função que chama o método da classe API, que solicita a alteração do status do like
                // e retorna ao método then() se tiver sucesso.
                editLikeApi({ id, isLiked }).then(({ isLiked: status }) => {
                  evt.target.classList.toggle("button_like_activate");
                  createCard.setLikeStatus(status);
                });
              }
              if (evt.target.classList.contains("card__image")) {
                // instância classe PopupWithImage passando como argumento
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

// Ouvinte de eventos do botão que abre a popup do formulário
// para adicionar um novo cartão.
addBtnElement.addEventListener("click", () => {
  const popupAddCard = new PopupWithForm({
    // handleForm é um callback passado como argumento, que recebe os valores como
    // parâmetro e instância classe Section que fica responsável por
    // renderizar na página o card.
    handleForm: ({ title, link }) => {
      popupAddCard.loading(true);
      // Chama a função que chama o método da classe API, que solicita adição dos dados
      // do novo cartão e retorna ao método then() se tiver sucesso.
      addNewCardApi({ title, link })
        .then((card) => {
          // função  instância a classe Section que é responsável por iniciar a construção do card e
          // renderizar à página.
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

// Função fetchDataApi() chama o método da classe Api, que solicita os dados
// do usuário e dos cartões e retorna ao método then().
fetchDataApi().then(([user, cards]) => {
  // Renderiza as informações do perfil à página.
  userInfo.setUserInfo({
    name: user.name,
    job: user.about,
  });
  // Renderiza o avatar do perfil à página.
  userInfo.setUserAvatar({ avatar: user.avatar });
  // função  instância a classe Section que é responsável por iniciar a construção do card e
  // renderizar à página, é passado como argumento a array com os dados dos cartões usando
  // o método reverse() para inveter a ordem da array e carregar os dados na ordem
  // correta.
  generateCards(cards.reverse());
});

export { formValidator };
