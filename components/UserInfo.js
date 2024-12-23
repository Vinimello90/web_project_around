// A classe UserInfo é responsável por renderizar a informação sobre o usuário na página.
export default class UserInfo {
  // Pegar um objeto com os seletores de dois elementos no construtor: um contendo o nome do usuário e o outro
  // contendo o trabalho do usuário.
  constructor({ nameSelector, jobSelector }) {
    this._NameElement = document.querySelector(nameSelector);
    this._JobElement = document.querySelector(jobSelector);
  }
  // Método público getUserInfo() que retorna um objeto com informação sobre o usuário.
  // Esse método será útil para casos em que é necessário exibir os dados do usuário no formulário aberto.
  getUserInfo() {
    return {
      currentName: this._NameElement.textContent,
      currentJob: this._JobElement.textContent,
    };
  }

  // Método público setUserInfo() que pega novos dados do usuário e adiciona à página.
  setUserInfo({ name, job }) {
    this._NameElement.textContent = name;
    this._JobElement.textContent = job;
  }
}
