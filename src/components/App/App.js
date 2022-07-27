import './App.css';
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
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
import { mainApi, mainApiAuth } from '../../utils/MainApi';

const App = () => {

  const [activeAuthLink, setActiveAuthLink] = useState('signin')
  const [activeMoviesLink, setActiveMoviesLink] = useState('movies')
  const [movies, setMovies] = useState([])
  const [mainSearchResults, setMainSearchResults] = useState([]);
  const [shortMainSearchResults, setShortMainSearchResults] = useState([])
  const [savedMoviesSearchResults, setSavedMoviesSearchResults] = useState([]);
  const [shortSavedMoviesSearchResults, setShortSavedMoviesSearchResults] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [isAuthSuccesfull, setIsAuthSuccesfull] = useState(false);


  useEffect(() => {
    tokenCheck();
    
    if (loggedIn){
      console.log(loggedIn);
      mainApi
      .getUserInfo()
      .then((user) => {
        console.log(user);
        setCurrentUser(user)})
      .catch((error) => console.log(error));

    moviesApi.getContent()
    .then(movies => {
      console.log(movies);
      setMovies(movies)
    })
      .catch((err) => {
      console.log(err);
    });

    mainApi.getSavedMovies()
    .then((movies) => {
      console.log(movies.data)
      setSavedMoviesSearchResults(movies.data)})
      .catch((err) =>{
      console.log(err);
    });
  }}, [loggedIn]);
  
  const handleMainSearchResults = (value) => {
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
    setMainSearchResults(mainResult);
    setShortMainSearchResults(shortResult);
  }

  const handleSavedMoviesSearchResults = (value) => {
    const savedMoviesResult = savedMoviesSearchResults.filter((movie) => {
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
  }

  const handleLogin = (user) => {
    mainApiAuth
      .authorize(user)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          tokenCheck();
        } else {
          console.log("Неизвестная ошибка");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRegister = (user) => {
    mainApiAuth
      .register(user)
      .then((res) => {
        setUserName(res.data.name);
        navigate("/signin");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const tokenCheck = () => {
    if (localStorage.getItem("jwt")) {
      const jwt = localStorage.getItem("jwt");
      mainApiAuth
        .validateUser(jwt)
        .then((res) => {
          console.log(res);
          setLoggedIn(true);
          setUserName(res.data.name);
          setCurrentUser(res.data);
          navigate("/");
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
      setLoggedIn(false);
    }
  };

  const navigate = useNavigate();

  const handleAuthMouthOver = (button) => {
    setActiveAuthLink(button);
  }

  const handleActiveMoviesLink = (button) => {
    setActiveMoviesLink(button);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
      <Header activeAuthLink={activeAuthLink} onAuthMouthOver={handleAuthMouthOver} activeMoviesLink={activeMoviesLink} onActiveMoviesLink={handleActiveMoviesLink}/>
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
              <ProtectedRoute loggedIn={loggedIn} redirectTo={"./signin"}>
                <Movies />
              </ProtectedRoute>
             }
          />
          <Route
             path="/saved-movies"
             element={
                <ProtectedRoute loggedIn={loggedIn} redirectTo={"./signin"}>
                  <SavedMovies />
                </ProtectedRoute>
             }
          />
          <Route
             path="/profile"
             element={
               <Profile name={userName} />
             }
          />
          <Route
             path="/signup"
             element={
               <Register
                 onRegister={handleRegister}
               />
             }
          />
          <Route
             path="/signin"
             element={
               <Login 
                 onLogin={handleLogin}
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
        <Footer />
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
