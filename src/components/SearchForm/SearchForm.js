import './SearchForm.css';
import { useState } from "react";

const SearchForm = ({onSubmit}) => {

    const [values, setValues] = useState({
        searchMovie: "",
      });
    const handleChange = (event) => {
      const { name, value } = event.target;
      setValues((prev) => ({
        ...prev,
        [name]: value,
      }));
    };
    
    const handleSubmit = (event) => {
      event.preventDefault();
      const isSomeFieldEmpty = Object.values(values).some((item) => item === "");
      if (isSomeFieldEmpty) {
          alert("Простите! Поле не должно быть пустым.")
      } else {
          onSubmit(values.searchMovie)
      }
    }
    
    return (
      <>
      <form className="search-movie__form" onSubmit={(e) => handleSubmit(e)}>
          <input
            className="search-movie__field"
            name="searchMovie"
            placeholder="Фильм"
            onChange={handleChange}
          />
          <button className="search-movie__submit" type="submit">
            Найти
          </button>
      </form>
      </>
    )
}

export default SearchForm;