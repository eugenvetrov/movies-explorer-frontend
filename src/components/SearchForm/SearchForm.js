import './SearchForm.css';
import { useState, useEffect } from "react";

const SearchForm = ({onSubmit, mainSearchFormValue, savedSearchFormValue}) => {

    const [values, setValues] = useState({
        searchMovie: "",
      });

    useEffect(() =>{
      savedSearchFormValue && setValues({searchMovie: savedSearchFormValue});
      mainSearchFormValue && setValues({searchMovie: mainSearchFormValue});
    }, [mainSearchFormValue, savedSearchFormValue]);

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
            value = {values.searchMovie}
          />
          <button className="search-movie__submit" type="submit">
            Найти
          </button>
      </form>
      </>
    )
}

export default SearchForm;