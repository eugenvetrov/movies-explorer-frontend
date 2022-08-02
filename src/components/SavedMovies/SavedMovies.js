import './SavedMovies.css';
import {useState} from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import SavedMoviesCardList from '../SavedMoviesCardList/SavedMoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

const SavedMovies = ({moviesArray, shortMoviesArray, onSubmit, saveAndUnsaveMovie, savedMoviesSearchResults, shortSavedMoviesSearchResults, savedLoadingEmpty, savedShortLoadingEmpty, savedSearchFormValue } ) => {

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
        <SearchForm onSubmit={onSubmit} savedSearchFormValue={savedSearchFormValue} />
        <FilterCheckbox 
           title="Короткометражки"
           name="shortFilm"
           handleChange={handleChange}
        />
        <hr className="movies__line"/>

        { 
        savedMoviesSearchResults.length > 0 && <SavedMoviesCardList moviesArray={savedMoviesSearchResults} shortMoviesArray={shortSavedMoviesSearchResults} isShort={!checked.shortFilm} saveAndUnsaveMovie={saveAndUnsaveMovie} />
        }
        {
        savedMoviesSearchResults.length === 0 && moviesArray.length > 0 && <SavedMoviesCardList moviesArray={moviesArray} shortMoviesArray={shortMoviesArray} isShort={!checked.shortFilm} saveAndUnsaveMovie={saveAndUnsaveMovie} />
        }
      </div>
    )
}

export default SavedMovies;