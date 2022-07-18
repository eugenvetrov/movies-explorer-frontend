import './Promo.css';
import logoHeader from '../../images/logo-header.svg';

const Promo = () => {
  return (
    <header className="header">
      <img src={logoHeader} className="header__logo" alt="Логотип"/>
      <p className="header__title">Учебный проект студента факультета Веб-разработки.</p>
    </header>
  );
}

export default Promo;