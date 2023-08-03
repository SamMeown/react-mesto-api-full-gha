class Api {
  constructor(baseUrl, { headers }) {
    this._url = baseUrl;
    this._headers = headers;
  }

  static _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(res.status);
  }

  getCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers
    }).then(Api._handleResponse);
  }

  createCard(data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
    }).then(Api._handleResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    }).then(Api._handleResponse);
  }

  addLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers
    }).then(Api._handleResponse);
  }

  deleteLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers
    }).then(Api._handleResponse);
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers
    }).then(Api._handleResponse);
  }

  updateUserInfo(info) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(info)
    }).then(Api._handleResponse);
  }

  updateUserAvatar(info) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(info)
    }).then(Api._handleResponse);
  }
}

const api = new Api('https://mesto.nomoreparties.co/v1/cohort-42', {
  headers: {
    authorization: '6d35ec1d-6d86-4d5b-9eab-6ccf0735e2e6',
    'Content-Type': 'application/json'
  }
});

export default api;
