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
import ProtectedRoute from "../ProtectedRoute//ProtectedRoute.js";
import PopupInform from "../PopupInform/PopupInform.js";
import { mainApi, mainApiAuth } from '../../utils/MainApi';

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
  const [isMoviesLoading ,setIsMoviesLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(true);
  const [savedLoadingEmpty, setSavedLoadingEmpty] = useState(false)
  const [savedShortLoadingEmpty, setSavedShortLoadingEmpty] = useState(false)
  const [mainSearchFormValue, setMainSearchFormValue] = useState();
  const [savedSearchFormValue, setSavedSearchFormValue] = useState();
  const [popupInformErrorMessage, setPopupInformErrorMessage] = useState();
  const [isPopupInformActive, setIsPopupInformActive] = useState(false);

  const { formErrors, formValid, setFormValid, validateField, clearErrors } =
  useFormValidation();
  
  const location = useLocation();
  const navigate = useNavigate();

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

  // useEffect(() => {openPopupInform('Ошибка при обновлении фильма')},[]);

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

    const savedSearchLocalValue = localStorage.getItem("savedSearchFormValue");

    if(savedSearchLocalValue) {
      try {
        setSavedSearchFormValue(JSON.parse(savedSearchLocalValue));
      } catch (e) {
        localStorage.removeItem("savedSearchFormValue")
      }
    }
  }, [])

  useEffect(() => {

    const savedLocalMoviesSearchResults = localStorage.getItem("savedMoviesSearchResults");

    if(savedLocalMoviesSearchResults) {
      try {
        setSavedMoviesSearchResults(JSON.parse(savedLocalMoviesSearchResults));
      } catch (e) {
        localStorage.removeItem("savedMoviesSearchResults")
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

    const shortSavedMoviesLocalSearchResults = localStorage.getItem("shortSavedMoviesSearchResults");

    if(shortSavedMoviesLocalSearchResults) {
      try {
        setShortSavedMoviesSearchResults(JSON.parse(shortSavedMoviesLocalSearchResults));
      } catch (e) {
        localStorage.removeItem("shortSavedMoviesSearchResults")
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

  useEffect(() => {

    const savedLocalLoadingEmpty = localStorage.getItem("savedLoadingEmpty");

    if(savedLocalLoadingEmpty) {
      try {
        setSavedLoadingEmpty(JSON.parse(savedLocalLoadingEmpty));
      } catch (e) {
        localStorage.removeItem("savedLoadingEmpty")
      }
    }
  }, [])

  useEffect(() => {

    const savedShortLocalLoadingEmpty = localStorage.getItem("savedShortLoadingEmpty");

    if(savedShortLocalLoadingEmpty) {
      try {
        setSavedShortLoadingEmpty(JSON.parse(savedShortLocalLoadingEmpty));
      } catch (e) {
        localStorage.removeItem("savedShortLoadingEmpty")
      }
    }
  }, [])

  useEffect(() => {
    tokenCheck().then((res) => {
      if(res) {
      mainApi().getSavedMovies()
      .then((movies) => {
        setSavedMovies(movies.data)
      })
        .catch((err) =>{
        console.log(err);
      });
  }})}, []);

  useEffect(() => {
    tokenCheck()
    clearErrors()
  }, [location]); /* eslint-disable-line */

  useEffect(() => {
    setFormValid(!Object.values(formErrors).some((item) => item !== ""));
  }, [formErrors, setFormValid]);
  
  const handleMainSearchResults = (value) => {
    localStorage.setItem("mainSearchFormValue", JSON.stringify(value))
    setMainSearchFormValue(value)
    setIsMoviesLoading(true);
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
      return movie.duration <= 40;
    })
    setIsMoviesLoading(false);
    setMainSearchResults(mainResult);
    setShortMainSearchResults(shortResult);
    localStorage.setItem("mainSearchResults", JSON.stringify(mainResult));
    localStorage.setItem("shortMainSearchResults", JSON.stringify(shortResult));
  }

  const handleSavedMoviesSearchResults = (value) => {
    localStorage.setItem("savedSearchFormValue", JSON.stringify(value))
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
      return movie.duration <= 40;
    })
    setSavedMoviesSearchResults(savedMoviesResult);
    setShortSavedMoviesSearchResults(savedShortMoviesResult);
    setSavedLoadingEmpty(() => savedMoviesResult.length === 0);
    setSavedShortLoadingEmpty(() => savedShortMoviesResult.length === 0);
    if(savedMoviesSearchResults.length === 0) {
      localStorage.setItem("savedLoadingEmpty", JSON.stringify(true));
    } else {
      localStorage.setItem("savedLoadingEmpty", JSON.stringify(false));
    }
    if(shortSavedMoviesSearchResults.length === 0) {
      localStorage.setItem("savedShortLoadingEmpty", JSON.stringify(true));
    } else {
      localStorage.setItem("savedShortLoadingEmpty", JSON.stringify(false));
    }
    localStorage.setItem("savedMoviesSearchResults", JSON.stringify(savedMoviesResult));
    localStorage.setItem("shortSavedMoviesSearchResults", JSON.stringify(savedShortMoviesResult));
  }

  const handleSaveAndUnsaveMovie = (movie) => {
    mainApi().getSavedMovies().then((savedMovies) => {
      setSavedMovies(savedMovies);
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
              localStorage.setItem("savedMoviesSearchResults", JSON.stringify(savedMoviesSearchResults.filter((m) => m.movieId !== movie.id)));
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
          localStorage.setItem("savedMoviesSearchResults", JSON.stringify(savedMoviesSearchResults));
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
          setLoggedIn(true)
        })
        .then(() => {
          setActiveHeaderLink("movies")
          navigate("/movies")
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
        });
      })
      .catch((err) => {
        console.log(err);
        openPopupInform('Не удалось авторизоваться')
        setLoggedIn(false);
        setCurrentUser(null);
      });
  }

  const handleLogin = (user) => {
    clearErrors();
    login(user);
  };

  const handleRegister = (user) => {
    clearErrors();
    mainApiAuth
      .register(user)
      .then((res) => {
        login({ 
          email: res.data.email,
          password: user.password
        })
      })
      .catch((err) => {
        openPopupInform('Регистрация не удалась')
        console.log(err);
      });
  };

  const clearLocalStorage = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("savedSearchFormValue");
    localStorage.removeItem("savedMoviesSearchResults");
    localStorage.removeItem("mainSearchResults");
    localStorage.removeItem("savedLoadingEmpty");
    localStorage.removeItem("savedShortLoadingEmpty");
    localStorage.removeItem("movies");
    localStorage.removeItem("shortMainSearchResults");
    localStorage.removeItem("shortSavedMoviesSearchResults");
    localStorage.removeItem("savedMovies");
    localStorage.removeItem("mainSearchFormValue");
  }

  const setStateToDefault = () => {
    setActiveHeaderLink("signin")
    setActiveMoviesLink('movies')
    setMovies([])
    setSavedMovies([])
    setMainSearchResults([]);
    setShortMainSearchResults([])
    setSavedMoviesSearchResults([]);
    setShortSavedMoviesSearchResults([]);
    setIsMoviesLoading(false);
    setSavedLoadingEmpty(false)
    setSavedShortLoadingEmpty(false)
    setMainSearchFormValue();
    setSavedSearchFormValue();
    setPopupInformErrorMessage();
    setIsPopupInformActive(false);
  }

  const handleSignOut = () => {
    clearLocalStorage();
    setCurrentUser(null);
    setLoggedIn(false);
    setStateToDefault();
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
    clearErrors();
    return mainApi()
      .setUserInfo(name, email)
      .then((user) => {
        setCurrentUser(user.data);
        openPopupInform();
      })
      .catch((err) => {
        openPopupInform(err.message);
        console.log(err)
      });
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
                <Movies moviesArray={mainSearchResults} shortMoviesArray={shortMainSearchResults} onSubmit={handleMainSearchResults} isLoading={isMoviesLoading} saveAndUnsaveMovie={handleSaveAndUnsaveMovie} savedMovies={savedMovies} mainSearchFormValue={mainSearchFormValue} />
              </ProtectedRoute>
             }
          />
          <Route
             path="/saved-movies"
             element={
                <ProtectedRoute loggedIn={loggedIn}  redirectTo={"/"}>
                  <SavedMovies moviesArray={savedMovies} searchMoviesArray={savedMoviesSearchResults} shortMoviesArray={shortSavedMoviesSearchResults} onSubmit={handleSavedMoviesSearchResults}  
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
                        formValid={formValid}/>
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
