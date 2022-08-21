class MoviesApi {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headeres = headers;
    }
    
    _checkResponse(res) {
        if (res.ok) {
          return res.json();
        }
    }

    getContent() {
        return (fetch(`${this._baseUrl}`, {
            headers: this._headeres,
          }).then(this._checkResponse));
    }
}

const moviesApi = new MoviesApi({
    baseUrl: "https://api.nomoreparties.co/beatfilm-movies",
    headers: {
        "Content-Type": "application/json",
      },
});

export default moviesApi;