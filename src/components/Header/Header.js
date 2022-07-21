import './Header.css';
import { Routes, Route, Link } from "react-router-dom";
import logo from '../../images/logo-auth.svg';
import account from '../../images/accaunt.svg';

const Header = ({activeAuthLink, onAuthMouthOver, activeMoviesLink, onActiveMoviesLink}) => {

    const mainHeader = <header className="header__landing header__main">
    <img src={logo} className="header__nav__logo" alt="Логотип в панели аутентификации"/>
    <nav className="header__nav">
          <Link to="../movies" className={`header-nav__link-movies ${activeMoviesLink === "movies" ? "header-nav__link-movies_active" : "" }`}
           onMouseEnter={() => onActiveMoviesLink('movies')}>Фильмы</Link>
          <Link to="../saved-movies" className={`header-nav__link-movies ${activeMoviesLink === "saved-movies" ? "header-nav__link-movies_active" : "" }`}
           onMouseEnter={() => onActiveMoviesLink('saved-movies')}>Сохраненные фильмы</Link>
          <Link to="../profile" className="header__account-button"><img src={account} className="header__account-logo" alt="кнопка аккаунта"/>Аккаунт</Link>
        </nav>
  </header>;
  
    return(
        <Routes>
          <>
          <Route
            exact path="/"
            element={
              <header className="header__landing">
                <img src={logo} className="header__nav__logo" alt="Логотип в панели аутентификации"/>
                  <nav className="header__nav">
                    <Link to="signup" className={`header-nav__link ${activeAuthLink === "signup" ? "header-nav__link_active" : "" }`}
                     onMouseEnter={() => onAuthMouthOver('signup')}>Регистрация</Link>
                    <Link to="signin" className={`header-nav__link ${activeAuthLink === "signin" ? "header-nav__link_active" : "" }`}
                     onMouseEnter={() => onAuthMouthOver('signin')}>Войти</Link>
                  </nav>
              </header>
            }
          />
          <Route
            path="/signin"
            element={mainHeader}
          />
          <Route
            path="/signup"
            element={mainHeader}
          />
          <Route
            path="/profile"
            element={mainHeader}
          />
          <Route
            path="/movies"
            element={mainHeader}
          />
          <Route
            path="/saved-movies"
            element={mainHeader}
          />
          <Route
           path="/*"
            element={<></>}
           />
          </>
        </Routes>
    )
}

export default Header;