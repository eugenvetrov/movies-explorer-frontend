import './Header.css';
import { Routes, Route, Link } from "react-router-dom";
import logo from '../../images/logo-auth.svg';

const AuthPanel = () => {
    return(
        <Routes>
          <Route
            path="/"
            element={
              <div className="auth">
                <img src={logo} className="auth-nav__logo" alt="Логотип в панели аутентификации"/>
                  <nav className="auth__nav">
                    <Link to="signup" className="auth-nav__link">Регистрация</Link>
                    <Link to="signin" className="auth-nav__link auth-nav__link_active">Войти</Link>
                  </nav>
              </div>
            }
          />
        </Routes>
    )
}

export default AuthPanel;