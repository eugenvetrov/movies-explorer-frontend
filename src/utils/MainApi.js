class MainApi {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headeres = headers;
    }
    
    _checkResponse(res) {
        if (res.ok) {
          return res.json();
        }
    }

    deleteMovie(movie) {
      console.log(movie._id);
      return fetch(`${this._baseUrl}/movies/${movie._id}`, {
        method: 'DELETE',
        headers: this._headeres,
      }).then(this._checkResponse);
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
          headers: this._headeres,
        }).then(this._checkResponse);
    }

    getSavedMovies() {
      return fetch(`${this._baseUrl}/movies`, {
        headers: this._headeres,
      }).then(this._checkResponse);
    }

    register(user) {
      return fetch(`${this._baseUrl}/signup`, {
        method: "POST",
        headers: this._headeres,
        body: JSON.stringify({
          password: `${user.password}`,
          email: `${user.email}`,
        }),
      })
        .then((res) => {
          if (res.status === 400) {
            console.log("некорректно заполнено одно из полей");
            return res;
          }
          return res;
        })
        .then(this._checkResponse);
    }

    saveMovie(movie) {
      console.log(movie);
      return fetch(`${this._baseUrl}/movies`, {
        method: "POST",
        headers: this._headeres,
        body: JSON.stringify({
          country: `${movie.country}`,
          director: `${movie.director}`,
          duration: `${movie.duration}`,
          description: `${movie.description}`,
          image: `https://api.nomoreparties.co${movie.image.url}`,
          movieId: `${movie.id}`,
          nameRU: `${movie.nameRU}`,
          nameEN: `${movie.nameEN}`,
          thumbnail: `https://api.nomoreparties.co${movie.thumbnail}`,
          trailerLink: `${movie.trailerLink}`,
          year: `${movie.year}`,
        })
      }).then(this._checkResponse);
    }
  
    authorize(user) {
      return fetch(`${this._baseUrl}/signin`, {
        method: "POST",
        headers: this._headeres,
        body: JSON.stringify({
          password: `${user.password}`,
          email: `${user.email}`,
        }),
      })
        .then((res) => {
          if (res.status === 400) {
            console.log("не передано одно из полей");
          } else if (res.status === 401) {
            console.log("пользователь с email не найден");
          }
          return res;
        })
        .then(this._checkResponse);
    }

    validateUser(token) {
      return fetch(`${this._baseUrl}/users/me`, {
        method: "GET",
        headers: {
          ...this._headers,
          Authorization: `Bearer ${token}`,
        },
      }).then(this._checkResponse);
    }
}

const mainApi = () => new MainApi({
    baseUrl: "https://api.evg.vetrow.movies.nomoredomains.sbs",
    headers: {
      authorization: `Bearer ${localStorage.getItem("jwt")}`,
      "Content-type": "application/json",
    },
});
  
const mainApiAuth =  new MainApi({
    baseUrl: "https://api.evg.vetrow.movies.nomoredomains.sbs",
    headers: {
      "Content-Type": "application/json",
    },
});
  
export { mainApi, mainApiAuth };