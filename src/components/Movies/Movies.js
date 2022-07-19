import { useState } from "react";
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

const Movies = () => {

    const [checked, setChecked] = useState({
        name: true,
      });

    const handleChange = (event) => {
      const { name } = event.target;
      setChecked((prev) => ({
        ...prev,
        [name]: !checked[name],
      }));
    };

    return (
      <div className="movies">
        <SearchForm />
        <FilterCheckbox 
           title="Короткометражки"
           name="shortFilm"
           handleChange={handleChange}
        />
      </div>
    )
}

export default Movies;