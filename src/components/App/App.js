import './App.css';
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useFormValidation } from "../../customHooks/useFormValidation.js";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import Header from '../Header/Header';
import Promo from '../Promo/Promo';
import NavTab from '../NavTab/NavTab';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import moviesApi from '../../utils/MoviesApi';
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.js";
import PopupInform from "../PopupInform/PopupInform.js";
import { mainApi, mainApiAuth } from '../../utils/MainApi';
import { DURATION_OF_SHORT_MOVIE } from "../../utils/Constants"

const App = () => {

  const [activeHeaderLink, setActiveHeaderLink] = useState("signin")
  const [activeMoviesLink, setActiveMoviesLink] = useState('movies')
  const [movies, setMovies] = useState([])
  const [savedMovies, setSavedMovies] = useState([])
  const [mainSearchResults, setMainSearchResults] = useState([]);
  const [shortMainSearchResults, setShortMainSearchResults] = useState([])
  const [savedMoviesSearchResults, setSavedMoviesSearchResults] = useState([]);
  const [shortSavedMoviesSearchResults, setShortSavedMoviesSearchResults] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const [isMoviesLoading, setIsMoviesLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(true);
  const [savedLoadingEmpty, setSavedLoadingEmpty] = useState(false)
  const [savedShortLoadingEmpty, setSavedShortLoadingEmpty] = useState(false)
  const [mainSearchFormValue, setMainSearchFormValue] = useState();
  const [savedSearchFormValue, setSavedSearchFormValue] = useState();
  const [popupInformErrorMessage, setPopupInformErrorMessage] = useState();
  const [isPopupInformActive, setIsPopupInformActive] = useState(false);
  const [moreMoviesButtonVisible, setMoreMoviesButtonVisible] = useState(false);
  const [moreShortMoviesButtonVisible, setMoreShortMoviesButtonVisible] = useState(false);

  const {  formErrors, formValid, setFormValid, validateField, clearErrors, lockInputs, unLockInputs, inputsIsUnlock  } =
  useFormValidation();
  
  const location = useLocation();
  const navigate = useNavigate();
  const durationOfShortMovie = DURATION_OF_SHORT_MOVIE;

  const fetchMovies = () => {
    moviesApi.getContent()
    .then(movies => {
      localStorage.setItem('movies', JSON.stringify(movies))
      setMovies(movies)
    })
      .catch((err) => {
      console.log(err);
    });
  }

  const openPopupInform = (errorMessage) => {
    setPopupInformErrorMessage(errorMessage)
    setIsPopupInformActive(true)
  }

  useEffect(() => {
    const localMovies = localStorage.getItem("movies");

    if(localMovies) {
      try {
        const parsedMovies = JSON.parse(localMovies)
        if(!Array.isArray(parsedMovies)){
          console.log("Ошибка при получении локальных данных");
        }
        setMovies(parsedMovies)
      } catch(err) {
        console.log(err);
        localStorage.removeItem("movies");
        fetchMovies()
      }
    } else {
      fetchMovies()
    }
  }, []);

  useEffect(() => {

    const mainSearchLocalValue = localStorage.getItem("mainSearchFormValue");

    if(mainSearchLocalValue) {
      try {
        setMainSearchFormValue(JSON.parse(mainSearchLocalValue));
      } catch (e) {
        localStorage.removeItem("mainSearchFormValue")
      }
    }
  }, [])

  useEffect(() => {

    const mainLocalSearchResults = localStorage.getItem("mainSearchResults");
    
    if(mainLocalSearchResults) {
      try {
        setMainSearchResults(JSON.parse(mainLocalSearchResults));
      } catch (e) {
        localStorage.removeItem("mainSearchResults")
      }
    }
  }, [])

  useEffect(() => {

    const shortMainLocalSearchResults = localStorage.getItem("shortMainSearchResults");

    if(shortMainLocalSearchResults) {
      try {
        setShortMainSearchResults(JSON.parse(shortMainLocalSearchResults));
      } catch (e) {
        localStorage.removeItem("shortMainSearchResults")
      }
    }
  }, [])

  useEffect(() => {

    const localSavedMovies = localStorage.getItem("savedMovies");
    
    if(localSavedMovies) {
      try {
        setSavedMovies(JSON.parse(localSavedMovies));
      } catch (e) {
        localStorage.removeItem("savedMovies")
      }
    }
  }, [])

  const getSavedMovies = () => {
    tokenCheck().then((res) => {
      if(res) {
      mainApi().getSavedMovies()
      .then((movies) => {
        setSavedMovies(movies.data)
      })
        .catch((err) =>{
        console.log(err);
      });
    }
  })
  }


  useEffect(() => {
    getSavedMovies()}, [location]); /*eslint-disable-line */

  useEffect(() => {
    tokenCheck();
    clearErrors();
    setSavedMoviesSearchResults([]);
    setShortSavedMoviesSearchResults([]);
    setSavedSearchFormValue("");
  }, [location]); /* eslint-disable-line */

  useEffect(() => {
    setFormValid(!Object.values(formErrors).some((item) => item !== ""));
  }, [formErrors, setFormValid]);
  
  const handleMainSearchResults = (value) => {
    localStorage.setItem("mainSearchFormValue", JSON.stringify(value))
    setMainSearchFormValue(value);
    const mainResult = movies.filter((movie) => {
      return (
      Object.values(movie).some((field) => {
        if (typeof(field) === 'string' && typeof(value) === 'string' && field.toLowerCase().includes(value.toLowerCase())) {
          return true;
        } else {
          return false;
        }
      }))
    }
    )
    const shortResult = mainResult.filter(movie => {
      return movie.duration <= durationOfShortMovie;
    })
    if (mainResult.length === 0) {
      setMoreMoviesButtonVisible(false);
      setMoreShortMoviesButtonVisible(false);
    } else if (mainResult.length > 0) {
      setMoreMoviesButtonVisible(true);
      setMoreShortMoviesButtonVisible(true);
    }
    setIsMoviesLoading(false);
    setMainSearchResults(mainResult);
    setShortMainSearchResults(shortResult);
    localStorage.setItem("mainSearchResults", JSON.stringify(mainResult));
    localStorage.setItem("shortMainSearchResults", JSON.stringify(shortResult));
  }

  const handleSavedMoviesSearchResults = (value) => {
    setSavedSearchFormValue(value);
    const savedMoviesResult = savedMovies.filter((movie) => {
      return (
        Object.values(movie).some((field) => {
          if (typeof(field) === 'string' && typeof(value) === 'string' && field.toLowerCase().includes(value.toLowerCase())) {
            return true;
          } else {
            return false;
          }
        }))
    })
    const savedShortMoviesResult = savedMoviesResult.filter(movie => {
      return movie.duration <= durationOfShortMovie;
    })
    setSavedMoviesSearchResults(savedMoviesResult);
    setShortSavedMoviesSearchResults(savedShortMoviesResult);
    setSavedLoadingEmpty(savedMoviesResult.length === 0);
    setSavedShortLoadingEmpty(savedShortMoviesResult.length === 0);
  }

  const handleSaveAndUnsaveMovie = (movie) => {
    mainApi().getSavedMovies().then((savedMovies) => {
      setSavedMovies(savedMovies.data);
    }).then(() => {
      const movieTempArray = savedMovies.filter(item => item.movieId === movie.id);
      let saveMovie
      movieTempArray.length > 0 ? saveMovie = movieTempArray[0] : saveMovie = undefined;
      if(saveMovie) {
        mainApi().deleteMovie(saveMovie)
        .then(() => {
            setSavedMovies(savedMovies.filter((m) => m.movieId !== movie.id))
            localStorage.setItem("savedMovies", JSON.stringify(savedMovies.filter((m) => m.movieId !== movie.id)));
            if(savedMoviesSearchResults.length > 0){
              setSavedMoviesSearchResults(savedMoviesSearchResults.filter((m) => m.movieId !== movie.id))
            }
        })
        .catch((err) => {
          openPopupInform('Не удалось удалить фильм')
          console.log(err);}
          )
      } else {
        mainApi().saveMovie(movie)
        .then((newMovie) => {
          savedMovies ? 
          setSavedMovies([newMovie.movie, ...savedMovies]) : setSavedMovies([newMovie.movie]);
          localStorage.setItem("savedMovies", JSON.stringify(savedMovies));
        })
        .catch((err) => {
          openPopupInform('Не удалось сохранить фильм')
          console.log(err);
        })
      }
    })
    .catch((err) => {
      openPopupInform('Ошибка при обновлении фильма')
      console.log(err);
    })

  }

  const handleDeleteMovie = (movie) => {
    mainApi().deleteMovie(movie)
      .then(() => {
          setSavedMovies(savedMovies.filter((m) => m !== movie))
          setSavedMoviesSearchResults(savedMoviesSearchResults.filter((m) => m !== movie))
          localStorage.setItem("savedMovies", JSON.stringify(savedMovies));
      })
      .catch((err) => {
        openPopupInform('Не удалось удалить фильм')
        console.log(err);
      })
  }

  const handlePopupInformActiveOff = () => {
    setIsPopupInformActive(false);
    setPopupInformErrorMessage(null);
  }

  const login = (user) => {
    setFormValid(false);
    lockInputs();
    return mainApiAuth
      .authorize(user)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);   
          return res.token;     
        } else {
          openPopupInform('Авторизация не удалась')
          console.log("Неизвестная ошибка");
        }
      })
      .then((token) => {
        mainApiAuth
        .validateUser(token)
        .then((res) => {
          setCurrentUser(res.data);
          setLoggedIn(true);
        })
        .then(() => {
          setActiveHeaderLink("movies")
          clearErrors();
          navigate("/movies");
          setFormValid(true);
          unLockInputs()
        })
        .catch((err) => {
          if (err.status === 400) {
            console.log("Токен не передан или передан не в том формате");
            openPopupInform('Токен не передан');
          } else if (err.status === 401) {
            console.log("Переданный токен некорректен");
            openPopupInform('Переданный токен некорректен')
          }
          console.log(err);
          openPopupInform('Авторизация не удалась')
          setLoggedIn(false);
          setCurrentUser(null);
          setFormValid(true);
          unLockInputs()
        });
      })
      .catch((err) => {
        console.log(err);
        openPopupInform('Не удалось авторизоваться')
        setLoggedIn(false);
        setCurrentUser(null);
        setFormValid(true);
        unLockInputs()
      });
  }

  const handleLogin = (user) => {
    login(user);
  };

  const handleRegister = (user) => {
    setFormValid(false);
    lockInputs()
    mainApiAuth
      .register(user)
      .then((res) => {
        login({ 
          email: res.data.email,
          password: user.password
        })
        setFormValid(true);
        unLockInputs()
      })
      .catch((err) => {
        setFormValid(true);
        unLockInputs();
        openPopupInform('Регистрация не удалась')
        console.log(err);
      });
  };

  const clearLocalStorage = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("mainSearchResults");
    localStorage.removeItem("movies");
    localStorage.removeItem("shortMainSearchResults");
    localStorage.removeItem("savedMovies");
    localStorage.removeItem("mainSearchFormValue");
    localStorage.removeItem("savedSearchFormValue");
    localStorage.removeItem("savedMoviesSearchResults");
    localStorage.removeItem("savedLoadingEmpty");
    localStorage.removeItem("savedShortLoadingEmpty");
    localStorage.removeItem("cardCount");
    localStorage.removeItem("cardShortCount");
    localStorage.removeItem("shortSavedMoviesSearchResults");
    localStorage.removeItem("moreMoviesButtonVisible");
    localStorage.removeItem("moreShortMoviesButtonVisible");
  }

  const setStateToDefault = () => {
    setActiveHeaderLink("signin");
    setActiveMoviesLink('movies');
    setSavedMovies([]);
    setMainSearchResults([]);
    setShortMainSearchResults([]);
    setSavedMoviesSearchResults([]);
    setShortSavedMoviesSearchResults([]);
    setIsMoviesLoading(false);
    setSavedLoadingEmpty(false);
    setSavedShortLoadingEmpty(false);
    setMainSearchFormValue(null);
    setSavedSearchFormValue(null);
    setPopupInformErrorMessage("");
    setIsPopupInformActive(false);
  }

  const handleSignOut = () => {
    setStateToDefault();
    setCurrentUser(null);
    setLoggedIn(false);
    clearLocalStorage();
    navigate("/");
  }
  

  const  tokenCheck = () => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
       return mainApiAuth
        .validateUser(jwt)
        .then((res) => {
          setCurrentUser(res.data);
          setLoggedIn(true);
          setActiveHeaderLink("movies")
          return res.data
        })
        .catch((err) => {
          if (err.status === 400) {
            console.log("Токен не передан или передан не в том формате");
          } else if (err.status === 401) {
            console.log("Переданный токен некорректен");
          }
          console.log(err);
        });  
    } else {
      return new Promise((resolve, reject) => {
        setCurrentUser(null);
        setLoggedIn(false);
      })
    }
  };

  const handleUpdateUser = ({name, email}) => {
    setFormValid(false);
    lockInputs();
      mainApi()
      .setUserInfo(name, email)
      .then((user) => {
        setCurrentUser(user.data);
        openPopupInform();
        clearErrors()
        setFormValid(true);
        unLockInputs();
      })
      .catch((err) => {
        setFormValid(true);
        unLockInputs();
        openPopupInform("Не удалось изменить данные");
        console.log(err)
      })
  };

  const handleHeaderMouseOver = (button) => {
    setActiveHeaderLink(button);
  }

  const handleActiveMoviesLink = (button) => {
    setActiveMoviesLink(button);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
    {<div className="page">
      <Header activeHeaderLink={activeHeaderLink} onHeaderMouthOver={handleHeaderMouseOver} activeMoviesLink={activeMoviesLink} onActiveMoviesLink={handleActiveMoviesLink}/>
      <main className="main">
        <Routes>
         <Route
            path="/"
            element={
              <>
              <Promo />
              <NavTab />
              <AboutProject />
              <Techs />
              <AboutMe />
              <Portfolio />
              </>
            }
          />
          <Route
             path="/movies"
             element={
              <ProtectedRoute loggedIn={loggedIn} redirectTo={"/"} >
                <Movies moviesArray={mainSearchResults} shortMoviesArray={shortMainSearchResults} onSubmit={handleMainSearchResults} isLoading={isMoviesLoading} setIsLoading={setIsMoviesLoading} saveAndUnsaveMovie={handleSaveAndUnsaveMovie} savedMovies={savedMovies} mainSearchFormValue={mainSearchFormValue} moreMoviesButtonVisible={moreMoviesButtonVisible} moreShortMoviesButtonVisible={moreShortMoviesButtonVisible} setMoreMoviesButtonVisible={setMoreMoviesButtonVisible} setMoreShortMoviesButtonVisible={setMoreShortMoviesButtonVisible} />
              </ProtectedRoute>
             }
          />
          <Route
             path="/saved-movies"
             element={
                <ProtectedRoute loggedIn={loggedIn}  redirectTo={"/"}>
                  <SavedMovies moviesArray={savedMovies} shortMoviesArray={shortSavedMoviesSearchResults} onSubmit={handleSavedMoviesSearchResults}  
                  saveAndUnsaveMovie={handleDeleteMovie} savedMoviesSearchResults={savedMoviesSearchResults} shortSavedMoviesSearchResults={shortSavedMoviesSearchResults} savedLoadingEmpty={savedLoadingEmpty} savedShortLoadingEmpty={savedShortLoadingEmpty} savedSearchFormValue={savedSearchFormValue} 
                   />
                </ProtectedRoute>
             }
          />
          <Route
             path="/profile"
             element={
              <ProtectedRoute loggedIn={loggedIn} redirectTo={"/"} >
               <Profile signOut={handleSignOut}
                        onEditUser={handleUpdateUser}
                        formErrors={formErrors}
                        validateField={validateField}
                        formValid={formValid}
                        inputsIsUnlock={inputsIsUnlock}
                        />
              </ProtectedRoute>
             }
          />
          <Route
             path="/signup"
             element={
               <Register
                 onRegister={handleRegister}
                 formErrors={formErrors}
                 validateField={validateField}
                 formValid={formValid}
                 inputsIsUnlock={inputsIsUnlock}
               />
             }
          />
          <Route
             path="/signin"
             element={
               <Login 
                 onLogin={handleLogin}
                 formErrors={formErrors}
                 validateField={validateField}
                 formValid={formValid}
                 inputsIsUnlock={inputsIsUnlock}
               />
             }
          />
          <Route
             path="/*"
             element={
               <NotFound />
             }
          />
        </Routes>
      </main>
      <PopupInform isActive={isPopupInformActive} ActiveOff={handlePopupInformActiveOff} errorMessage={popupInformErrorMessage}/>
      <Footer />
    </div>}
    </CurrentUserContext.Provider>
  );
}

export default App;
