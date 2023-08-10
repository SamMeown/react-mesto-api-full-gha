class Auth {
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

  register(email, password) {
    console.log({email, password});
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({email, password})
    }).then(Auth._handleResponse);
  }

  authorize(email, password) {
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({email, password})
    })
    .then(Auth._handleResponse)
    .then(data => {
      console.log(data);
      if (data.token) {
        localStorage.setItem('token', data.token);
        return data;
      }
    });
  }
}

const auth = new Auth('https://auth.nomoreparties.co', {
  headers: {
    'Content-Type': 'application/json'
  }
});

export default auth;