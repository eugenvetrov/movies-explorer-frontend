import './SavedMovies.css';
import {useState } from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import moviesArray from '../../utils/moviesArray';

const SavedMovies = () => {

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
        <div className="saved-movies">
        <FilterCheckbox 
           title="Короткометражки"
           name="shortFilm"
           handleChange={handleChange}
        />
        <hr className="saved-movies__line"/>
        <MoviesCardList moviesArray={moviesArray}/>
      </div>
    )
}

export default SavedMovies;