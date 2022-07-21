import './Header.css';
import { Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import useDeviceDetect from "../../customHooks/useDeviceDetect"
import logo from '../../images/logo-auth.svg';
import account from '../../images/accaunt.svg';
import menu from '../../images/menu.svg';
import exit from '../../images/exit.svg';

const Header = ({activeAuthLink, onAuthMouthOver, activeMoviesLink, onActiveMoviesLink}) => {

    const [isOpen, setIsOpen] = useState(false);
    const deviceDetect = useDeviceDetect();
    const isMobile = deviceDetect.isMobile;
  
    const handleMenuButton = () => {
      setIsOpen(!isOpen);
    };

    const mainHeader =
    isMobile ? isOpen ?
    (<header className="header__landing header__main">
    <Link to="../" className="header__nav-home-link">
    <img src={logo} className="header__nav-logo" alt="Логотип в панели аутентификации"/>
    </Link>
    <div className="header__overlay"></div>
    <nav className="header__nav_mobile">
        <img src={exit} className="header__nav-exit" alt="Кнопка выхода" onClick={handleMenuButton}/>
        <Link to="../" className={`header__nav-link-movies_mobile ${activeMoviesLink === "main" ?           "header__nav-link-movies-mobile_active" : "" }`}
          onClick={() => {
          onActiveMoviesLink('main')
          handleMenuButton()}}>Главная</Link>
        <Link to="../movies" className={`header__nav-link-movies_mobile ${activeMoviesLink === "movies" ?       "header__nav-link-movies-mobile_active" : "" }`}
          onClick={() => {
          onActiveMoviesLink('movies')
          handleMenuButton()}}>Фильмы</Link>
        <Link to="../saved-movies" className={`header__nav-link-movies_mobile ${activeMoviesLink === "saved-movies" ?       "header__nav-link-movies-mobile_active" : "" }`}
          onClick={() => {
          onActiveMoviesLink('saved-movies')
          handleMenuButton()}}>Сохраненные фильмы</Link>
        <Link to="../profile" className="header__account-button header__account-button_mobile" onClick={handleMenuButton}><img src={account}       className="header__account-logo" alt="кнопка аккаунта"/>Аккаунт</Link>
    </nav>
    </header>
    )
    : (<header className="header__landing header__main">
          <Link to="../" className="header__nav-home-link">
             <img src={logo} className="header__nav-logo" alt="Логотип в панели аутентификации"/>
          </Link><img src={menu} className="header__menu-icon"       alt="Иконка мобильного меню" onClick={handleMenuButton} />
       </header>)    
    :
    (<header className="header__landing header__main">
        <Link to="../" className="header__nav-home-link">
           <img src={logo} className="header__nav-logo" alt="Логотип в панели аутентификации"/>
        </Link>
        <nav className="header__nav">
              <Link to="../movies" className={`header__nav-link-movies ${activeMoviesLink === "movies" ? "header__nav-link-movies_active" :     "" }`}
               onMouseEnter={() => onActiveMoviesLink('movies')}>Фильмы</Link>
              <Link to="../saved-movies" className={`header__nav-link-movies ${activeMoviesLink === "saved-movies" ?     "header__nav-link-movies_active" : "" }`}
               onMouseEnter={() => onActiveMoviesLink('saved-movies')}>Сохраненные фильмы</Link>
              <Link to="../profile" className="header__account-button"><img src={account} className="header__account-logo" alt="кнопка     аккаунта"/>Аккаунт</Link>
            </nav>
      </header>);
  
    return(
        <Routes>
          <>
          <Route
            exact path="/"
            element={
              <header className="header__landing">
                  <Link to="../" className="header__nav-home-link">
                     <img src={logo} className="header__nav-logo" alt="Логотип в панели аутентификации"/>
                  </Link>
                  <nav className="header__nav">
                    <Link to="signup" className={`header__nav-link ${activeAuthLink === "signup" ? "header__nav-link_active" : "" }`}
                     onMouseEnter={() => onAuthMouthOver('signup')}>Регистрация</Link>
                    <Link to="signin" className={`header__nav-link ${activeAuthLink === "signin" ? "header__nav-link_active" : "" }`}
                     onMouseEnter={() => onAuthMouthOver('signin')}>Войти</Link>
                  </nav>
              </header>
            }
          />
          <Route
            path="/signin"
            element={<header className="header__landing header__main header__auth">
              <Link to="../" className="header__nav-home-link">
                 <img src={logo} className="header__nav-logo  header__nav-logo-auth" alt="Логотип в панели аутентификации"/>
               </Link>
            </header>}
          />
          <Route
            path="/signup"
            element={<header className="header__landing header__main header__auth">
              <Link to="../" className="header__nav-home-link ">
                   <img src={logo} className="header__nav-logo header__nav-logo-auth" alt="Логотип в панели аутентификации"/>
              </Link>
            </header>}
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