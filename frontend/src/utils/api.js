class Api {
  constructor(baseUrl, { headers }) {
    this._url = baseUrl;
    this._base_headers = headers;
  }

  static _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(res.status);
  }

  _headers() {
    const headers = {
      ...this._base_headers
    };
    const token = localStorage.getItem('token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    return headers;
  }

  getCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers()
    }).then(Api._handleResponse);
  }

  createCard(data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers(),
      body: JSON.stringify(data)
    }).then(Api._handleResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers()
    }).then(Api._handleResponse);
  }

  addLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers()
    }).then(Api._handleResponse);
  }

  deleteLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers()
    }).then(Api._handleResponse);
  }

  changeLikeStatus(cardId, like) {
    return like ? this.addLike(cardId) : this.deleteLike(cardId);
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers()
    }).then(Api._handleResponse);
  }

  updateUserInfo(info) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers(),
      body: JSON.stringify(info)
    }).then(Api._handleResponse);
  }

  updateUserAvatar(info) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers(),
      body: JSON.stringify(info)
    }).then(Api._handleResponse);
  }
}

const api = new Api('http://127.0.0.1:3001', {
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;
