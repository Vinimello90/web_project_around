// A classe FormValidator é responsável por válidar o formulário.
export default class FormValidator {
  constructor(classObj, formList) {
    // O constructor recebe 2 paramêtros, um objeto com as classes seletoras e uma array com a lista de elementos de formulário.
    this._classObj = classObj;
    // O método Array.from() gera um array a partir da lista de elemento de formulário.
    this._formList = Array.from(formList);
  }

  // Método público resetInputValidation() é responsável por resetar a válidação do formulário, fazendo uma nova validação inicial do formulário ao fechar a popup, e ocultando
  // a mensagem de erro e verificando se o botão vai estar desativado ou ativado ao reabrir a popup.
  resetInputValidation = (formElement) => {
    const inputList = Array.from(
      formElement.querySelectorAll(this._classObj.inputSelector)
    );
    this._toggleButtonState(formElement, inputList);
    inputList.forEach((inputElement) => {
      const errorElement = formElement.querySelector(
        `.popup__${inputElement.id}`
      );
      this._hideInputError(inputElement, errorElement, this._classObj);
    });
  };

  // Método privado _hideInputError() é responsável paramanipular e exibir a mensagem de erro caso o input esteja inválido.
  _showInputError = (inputElement, errorMessage, errorElement) => {
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._classObj.errorClass);
    inputElement.classList.add(this._classObj.inputErrorClass);
  };

  // Método privado _hideInputError() é responsável para manipular e esconder a mensagem de erro caso o input esteja válido.
  _hideInputError = (inputElement, errorElement) => {
    errorElement.textContent = "";
    errorElement.classList.remove(this._classObj.errorClass);
    inputElement.classList.remove(this._classObj.inputErrorClass);
  };

  // Método privado _checkInputValidity() é responsável por checar se os inputs dos formulários estão validos, caso invalidado exibirá uma mensagem de erro explicativa.
  _checkInputValidity = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(
      `.popup__${inputElement.id}`
    );
    if (!inputElement.validity.valid) {
      // É usado o método privado _showInputError(), passando 3 argumentos, o elemento do input, a mensagem de erro da validação e o elemento que exibe a mensagem.
      this._showInputError(
        inputElement,
        inputElement.validationMessage,
        errorElement
      );
    } else {
      // É usado o método privado _hideInputError(), passando 2 argumentos, o elemento do input e o elemento que exibe a mensagem.
      this._hideInputError(inputElement, errorElement);
    }
  };

  // Método privado _hasInvalidInput() é responsável por checar se os inputs dos formulários estão validos e retornar verdadeiro ou falso.
  _hasInvalidInput = (inputList) =>
    inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });

  // Método privado _toggleButtonState() é responsável por ativar e desativar o botão de submit caso o formulário esteja válido ou invalido, recebe 2 parâmetros, o elemento
  // do fieldset do formulário e a array com a lista de elementos de input.
  _toggleButtonState = (formElement, inputList) => {
    const btnElement = formElement.querySelector(
      this._classObj.submitButtonSelector
    );
    // É usado o método privado _hasInvalidInput() como condição para ativar o botão caso verdadeiro e desativar caso falso, é passado como argumento o array com a lista de elementos de input
    if (this._hasInvalidInput(inputList)) {
      btnElement.setAttribute("disabled", "disabled");
      btnElement.classList.add(this._classObj.inactiveButtonClass);
    } else {
      btnElement.removeAttribute("disabled");
      btnElement.classList.remove(this._classObj.inactiveButtonClass);
    }
  };

  // Método privado _setEventListeners é responsável por adicionar os ouvintes de evento que validarão os formulários, recebe como parâmetro o elemento fieldset do form.
  _setEventListeners = (formElement) => {
    // É gerado uma array com uma lista de elementos de input.
    const inputList = Array.from(
      formElement.querySelectorAll(this._classObj.inputSelector)
    );
    // É passado para o método privado toggleButtonState() 2 argumentos, o elemento do fieldset do formulário e a array com a lista de elementos de input.
    this._toggleButtonState(formElement, inputList);
    // É iterado a array da lista de elementos de input
    inputList.forEach((inputElement) => {
      // Adiciona o ouvinte de eventos "input" ao elemento do input, para verificar a validação do formulário a cada input.
      inputElement.addEventListener("input", () => {
        // É passado para o método privado _checkInputValidity() 2 argumentos, o elemento do fieldset do formulário e o elemento do input
        this._checkInputValidity(formElement, inputElement);
        this._toggleButtonState(formElement, inputList);
      });
    });
  };

  // Método público enableValidation é responsável de inicializar a validação dos formulários
  enableValidation = () => {
    // itera a array de elementos do formulário criando uma nova array de elementos de fieldset.
    this._formList.forEach((formElement) => {
      const fieldsetList = Array.from(
        formElement.querySelectorAll(this._classObj.fieldsetSelector)
      );
      // itera a array da lista de fieldset, passando o elemento do fieldset como argumento para o método _setEventListeners
      fieldsetList.forEach((fieldset) => {
        this._setEventListeners(fieldset);
      });
    });
  };
}
