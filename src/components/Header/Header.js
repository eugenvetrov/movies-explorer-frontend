import './Header.css';
import { Routes, Route, Link } from "react-router-dom";
import logo from '../../images/logo-auth.svg';

const Header = ({activeAuthLink, onAuthMouthOver}) => {
    return(
        <Routes>
          <Route
            path="/"
            element={
              <div className="auth">
                <img src={logo} className="auth-nav__logo" alt="Логотип в панели аутентификации"/>
                  <nav className="auth__nav">
                    <Link to="signup" className={`auth-nav__link ${activeAuthLink === "signup" ? "auth-nav__link_active" : "" }`}
                     onMouseEnter={() => onAuthMouthOver('signup')}>Регистрация</Link>
                    <Link to="signin" className={`auth-nav__link ${activeAuthLink === "signin" ? "auth-nav__link_active" : "" }`}
                     onMouseEnter={() => onAuthMouthOver('signin')}>Войти</Link>
                  </nav>
              </div>
            }
          />
        </Routes>
    )
}

export default Header;