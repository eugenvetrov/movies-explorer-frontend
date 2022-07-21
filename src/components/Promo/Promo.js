import './Promo.css';
import logoHeader from '../../images/logo-header.svg';

const Promo = () => {
  return (
    <section className="promo">
      <img src={logoHeader} className="promo__logo" alt="Логотип"/>
      <p className="promo__title">Учебный проект студента факультета Веб-разработки.</p>
    </section>
  );
}

export default Promo;