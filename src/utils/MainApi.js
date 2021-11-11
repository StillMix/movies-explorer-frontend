class Api {
  constructor(config) {
      this._url = config.url;
      this._headers = config.headers;
  }
  _check(res) {
      if (res.ok) {
          return res.json();
      } else {
          return Promise.reject("Произошла ошибка");
      }
  }

  getCards() {
      return fetch(`${this._url}/cards/`, {
          headers: this._headers,
      }).then((res) => {
          return this._check(res)

      });
  }

  addCard(data) {
      return fetch(`${this._url}/cards`, {
          method: 'POST',
          headers: this._headers,
          body: JSON.stringify(data),
      }).then((res) => {
          return this._check(res)
      });
  }

  deleteCard(id) {
      return fetch(`${this._url}/cards/${id}`, {
          method: 'DELETE',
          headers: this._headers,
      }).then((res) => {
          return this._check(res)
      });
  }
  setUserInfo(data) {
      return fetch(`${this._url}/users/me`, {
          method: 'PATCH',
          headers: this._headers,
          body: JSON.stringify(data),
      }).then((res) => {
          return this._check(res)
      });
  }


  getUserInfo() {
      return fetch(`${this._url}/users/me`, {
              headers: this._headers
          })
          .then((res) => {
              return this._check(res)
          })
  }
  register(password, email,name) {
    return fetch(`${this._url}/signup`, {
      method: 'POST',
        headers: this._headers,
        credentials: 'include',
        body: JSON.stringify({
          name: name,
          password: password,
          email: email,
        })
    }).then((response) => {
      return this._check(response)
  })
    .then((res) => {
      return res;
    })
}

authorize(password, email) {
  return fetch(`${this._url}/signin`, {
    method: 'POST',
    headers: this._headers,
    credentials: 'include',
      body: JSON.stringify({
        password: password,
        email: email,
      })
  }).then((response => {
    return response.json()
  }))
  .then((data) => {
    if (data.token){
      localStorage.setItem('token', data.token);
      return data;
    }else{
      return data
    }
  })
}

backUser() {
  return fetch(`${this._url}/signout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
  }).then((res) => {
      return this._check(res)
  });
}

getContent(){
  return fetch(`${this._url}/users/me`, {
    method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
  })
  .then(res => {return res.json()})
  .then(data => {return data})
}
}

const MainApi = new Api({
  url: 'https://backen-movies.nomoredomains.work',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
})

export default MainApi;
