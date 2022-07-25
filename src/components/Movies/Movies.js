import { useState } from "react";
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import moviesArray from '../../utils/moviesArray';

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
        <hr className="movies__line"/>
        <MoviesCardList moviesArray={moviesArray}/>
        <button className="movies__more-button">Ещё</button>
      </div>
    )
}

export default Movies;