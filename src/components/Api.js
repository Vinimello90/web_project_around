// Classe Api é responsável por manipular os dados enviados e recebidos do perfil e dos cartões pela API
export default class Api {
  constructor(options) {
    // Constructor recebe o options do fetch como parâmetro
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  }

  // Método público getInitialCards() é responsável por enviar a solicitação das informações dos cartões utilizando e retornando o método fetch com o método de solicitação "GET"
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: this._headers.authorization,
      },
    })
      .then(this._checkResponse)
      .catch((err) => console.log(err));
  }

  // Método público addNewCard() é responsável por enviar a solicitação dos dados do novo cartão adicionado utilizando e retornando o método fetch com o método de solicitação "POST"
  addNewCard(data) {
    return fetch(`${this._baseUrl}/cards/`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    })
      .then(this._checkResponse)
      .catch((err) => console.log(err));
  }

  // Método público editLikeStatus() é responsável por enviar a solicitação para alterar o status do like utilizando e retornando o método fetch com os métodos de solicitações "PUT"
  // para adicionar "true" e "DELETE" para remover mudando para "false".
  editLikeStatus({ method, id }) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: method,
      headers: {
        authorization: this._headers.authorization,
      },
    })
      .then(this._checkResponse)
      .catch((err) => console.log(err));
  }

  // Método público deleteCard() é responsável por enviar a solicitação para remover o card através do id do cartão utilizando e retornando o método fetch com o método de solicitação "DELETE".
  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: {
        authorization: this._headers.authorization,
      },
    })
      .then(this._checkResponse)
      .catch((err) => console.log(err));
  }

  // Método público getUserInfo() é responsável por enviar a solicitação das informações do perfil do usuário utilizando e retornando o método fetch com o método de solicitação "GET"
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: this._headers.authorization,
      },
    })
      .then(this._checkResponse)
      .catch((err) => console.log(err));
  }

  // Método público editUserAvatar() é responsável  por enviar a solicitação da alteração do link da imagem do avatar do perfil do usuário utilizando e retornando o método fetch com o método
  // de solicitação "PATCH"
  updateUserAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    })
      .then(this._checkResponse)
      .catch((err) => console.log(err));
  }

  // Método público editUserInfo() é responsável  por enviar a solicitação da alteração das informações do perfil do usuário utilizando e retornando o método fetch com o método de solicitação "PATCH"
  updateUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    })
      .then(this._checkResponse)
      .catch((err) => console.log(err));
  }
}
