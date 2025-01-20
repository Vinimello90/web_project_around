class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

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

const api = new Api({
  baseUrl: "https://around-api.pt-br.tripleten-services.com/v1",
  headers: {
    authorization: "3104c43f-5c52-4781-879f-672ac8ed2b72",
    "Content-Type": "application/json",
  },
});

export function fetchDataApi() {
  return Promise.all([api.getUserInfo(), api.getInitialCards()]);
}

export function addNewCardApi({ title, link }) {
  return api.addNewCard({
    body: JSON.stringify({
      name: title,
      link: link,
    }),
  });
}

export function editLikeApi({ id, isLiked }) {
  return api.editLikeStatus({
    method: !isLiked ? "PUT" : "DELETE",
    id,
  });
}

export function editUserInfoApi(name, job) {
  return api.editUserInfo({
    body: JSON.stringify({
      name: name,
      about: job,
    }),
  });
}

export function editAvatarApi(avatar) {
  return api.editUserInfo({
    body: JSON.stringify({
      avatar: avatar,
    }),
  });
}

export function deleteCardApi(id) {
  return api.deleteCard(id);
}
