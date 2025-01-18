export default class GetCards {
  constructor() {}

  fetchCards() {
    return fetch("https://around-api.pt-br.tripleten-services.com/v1/cards/", {
      headers: {
        authorization: "3104c43f-5c52-4781-879f-672ac8ed2b72",
      },
    })
      .then((res) => res.json())
      .then((cards) => console.log(cards));
  }
}
