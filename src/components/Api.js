// Classe Api é responsável por manipular os dados
// enviados e recebidos do perfil e dos cartões pela API
class Api {
  constructor(options) {
    // Constructor recebe o options do fetch como parâmetro
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }
  // Método público getInitialCards() é responsável por enviar a solicitação das informações
  // dos cartões utilizando e retornando o método fetch com o método de solicitação "GET"
  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: {
        authorization: this.headers.authorization,
      },
    })
      .then((res) =>
        res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
      )
      .then((cards) => {
        return cards;
      })
      .catch((err) => console.log(err));
  }
  // Método público addNewCard() é responsável por enviar a solicitação
  // dos dados do novo car adicionado utilizando e retornando o método fetch com o método
  // de solicitação "POST"
  addNewCard({ body }) {
    return fetch(`${this.baseUrl}/cards/`, {
      method: "POST",
      headers: this.headers,
      body: body,
    })
      .then((res) =>
        res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
      )
      .then((card) => card)
      .catch((err) => console.log(err));
  }
  // Método público editLikeStatus() é responsável por enviar a solicitação
  // para alterar o status do like utilizando e retornando o método fetch com os
  // métodos de solicitações "PUT" para adicionar "true" e "DELETE" para remover
  // mudando para "false".
  editLikeStatus({ method, id }) {
    return fetch(`${this.baseUrl}/cards/${id}/likes`, {
      method: method,
      headers: {
        authorization: this.headers.authorization,
      },
    })
      .then((res) =>
        res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
      )
      .then((userInfo) => userInfo)
      .catch((err) => console.log(err));
  }
  // Método público deleteCard() é responsável por enviar a solicitação
  // para remover o card através do id do cartão utilizando e retornando o método
  // fetch com o método de solicitação "DELETE".
  deleteCard(id) {
    return fetch(`${this.baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: {
        authorization: this.headers.authorization,
      },
    })
      .then((res) =>
        res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
      )
      .then((res) => res)
      .catch((err) => console.log(err));
  }
  // Método público getUserInfo() é responsável por enviar a solicitação das informações
  // do perfil do usuário utilizando e retornando o método fetch com o método
  // de solicitação "GET"
  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: {
        authorization: this.headers.authorization,
      },
    })
      .then((res) =>
        res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
      )
      .then((user) => {
        return user;
      })
      .catch((err) => console.log(err));
  }
  // Método público editUserAvatar() é responsável  por enviar a solicitação da alteração
  // do link da imagem do avatar do perfil do usuário utilizando e retornando o método fetch com o método
  // de solicitação "PATCH"
  editUserAvatar({ body }) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: body,
    })
      .then((res) =>
        res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
      )
      .then((userInfo) => userInfo)
      .catch((err) => console.log(err));
  }
  // Método público editUserInfo() é responsável  por enviar a solicitação da alteração
  // das informações do perfil do usuário utilizando e retornando o método fetch com o método
  // de solicitação "PATCH"
  editUserInfo({ body }) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: body,
    })
      .then((res) =>
        res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
      )
      .then((userInfo) => userInfo)
      .catch((err) => console.log(err));
  }
}

// instância a classe Api para fazer as solicitações da API.
const api = new Api({
  baseUrl: "https://around-api.pt-br.tripleten-services.com/v1",
  headers: {
    authorization: "3104c43f-5c52-4781-879f-672ac8ed2b72",
    "Content-Type": "application/json",
  },
});

// Função fetchDataApi() retorna o método Promise.all() que tem como
// parâmetro 2 métodos como callback da classe Api para solicitar
// os dados do usuário e dos cartões
function fetchDataApi() {
  return Promise.all([api.getUserInfo(), api.getInitialCards()]);
}

// Função addNewCardApi() recebe um objeto com titulo e link do novo card como parâmetro
// e retorna um método da classe Api que solicita para adicionar um novo cartão.
function addNewCardApi({ title, link }) {
  return api.addNewCard({
    body: JSON.stringify({
      name: title,
      link: link,
    }),
  });
}

// Função editLikeApi() recebe um objeto com a id do cartão e o status do like como parâmetro
// e retorna o método da Api que solicita para editar o status do like.
function editLikeApi({ id, isLiked }) {
  return api.editLikeStatus({
    // verifica o status do like atual para definir o método de solicitação no parâmetro
    method: !isLiked ? "PUT" : "DELETE",
    id,
  });
}

// Função editUserInfoApi() recebe um objeto com o nome e profissão como parâmetro
// e retorna o método da Api que solicita para editar o perfil.
function editUserInfoApi(name, job) {
  return api.editUserInfo({
    body: JSON.stringify({
      name: name,
      about: job,
    }),
  });
}
// Função editAvatarApi() recebe o link da imagem como parâmetro
// e retorna o método da Api que solicita para editar o link do avatar.
function editAvatarApi(avatar) {
  return api.editUserAvatar({
    body: JSON.stringify({
      avatar: avatar,
    }),
  });
}
// Função deleteCardApi() recebe a id do cartão como parâmetro
// e retorna o método da Api que solicita para editar o link do avatar.
function deleteCardApi(id) {
  return api.deleteCard(id);
}

export {
  fetchDataApi,
  addNewCardApi,
  editLikeApi,
  editUserInfoApi,
  editAvatarApi,
  deleteCardApi,
};
