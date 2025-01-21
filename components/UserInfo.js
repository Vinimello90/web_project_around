// A classe UserInfo é responsável por renderizar a informação sobre o usuário na página.
export default class UserInfo {
  // Pegar um objeto com os seletores de dois elementos no construtor: um contendo o nome do usuário e o outro
  // contendo o trabalho do usuário.
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._NameElement = document.querySelector(nameSelector);
    this._JobElement = document.querySelector(jobSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }
  // Método público getUserInfo() que retorna um objeto com informação sobre o usuário.
  // usado para casos em que é necessário exibir os dados do usuário no formulário aberto.
  getUserInfo() {
    return {
      currentName: this._NameElement.textContent,
      currentJob: this._JobElement.textContent,
      currentAvatar: this._avatarElement.src,
    };
  }

  // Método público setUserInfo() que pega novos dados do usuário e adiciona à página.
  setUserInfo({ name, job }) {
    this._NameElement.textContent = name;
    this._JobElement.textContent = job;
  }

  setUserAvatar({ avatar }) {
    this._avatarElement.src = avatar;
    this._avatarElement.onerror = () => {
      this._avatarElement.src = "../images/imagem-nao-disponivel.png";
    };
  }
}
