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

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
          headers: this._headeres,
        }).then(this._checkResponse);
    }
    
}

const api = () => new MainApi({
    baseUrl: "https://api.evg.vetrow.movies.nomoredomains.sbs",
    headers: {
      authorization: `Bearer ${localStorage.getItem("jwt")}`,
      "Content-type": "application/json",
    },
});
  
const auth =  new MainApi({
    baseUrl: "https://api.evg.vetrow.movies.nomoredomains.sbs",
    headers: {
      "Content-Type": "application/json",
    },
});
  
export { api, auth };