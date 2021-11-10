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

  getMovies() {
      return fetch(`${this._url}`, {
          headers: this._headers,
      }).then((res) => {
          return this._check(res)

      });
  }

}

const MoviesApi = new Api({
  url: 'https://api.nomoreparties.co/beatfilm-movies',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
})

export default MoviesApi;
