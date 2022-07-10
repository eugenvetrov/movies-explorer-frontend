import './Header.css';
import logoHeader from '../../images/logo-header.svg';

function Header() {
  return (
    <header className="header">
      <img src={logoHeader} className="header__logo" alt="Логотип"/>
      <p className="header__title">Учебный проект студента факультета Веб-разработки.</p>
    </header>
  );
}

export default Header;