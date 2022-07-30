import './SavedMovies.css';
import {useState } from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import SavedMoviesCardList from '../SavedMoviesCardList/SavedMoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

const SavedMovies = ({moviesArray, shortMoviesArray, onSubmit, deleteMovie}) => {

  const [checked, setChecked] = useState({
    shortFilm: true,
    });

  const handleChange = (event) => {
    const { name } = event.target;
    setChecked((prev) => ({
      ...prev,
      [name]: !checked[name],
    }));
  }
  
    return (
      <div className="saved-movies">
        <SearchForm />
        <FilterCheckbox 
           title="Короткометражки"
           name="shortFilm"
           handleChange={handleChange}
        />
        <hr className="movies__line"/>
        <SavedMoviesCardList moviesArray={moviesArray} shortMoviesArray={shortMoviesArray} isShort={!checked.shortFilm} deleteMovie={deleteMovie} />
      </div>
    )
}

export default SavedMovies;