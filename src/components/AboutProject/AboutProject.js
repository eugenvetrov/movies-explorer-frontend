import './AboutProject.css';

const AboutProject = () => {
  return(
    <section className="about-project">
      <h2 className="about-project__title">О проекте</h2>
      <hr className="about-project__line"/>
      <div className="about-project__description">
        <p className="about-project__description-title">Дипломный проект включал 5 этапов</p>
        <p className="about-project__description-paragraph">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
      </div>
      <div className="about-project__description">
        <p className="about-project__description-title">На выполнение диплома ушло 5 недель</p>
        <p className="about-project__description-paragraph">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
      </div>
      <div className="about-project__time-backend">
        <p className="about-project__time-backend-scale">1 неделя</p>
        <p className="about-project__time-mark">Back-end</p>
      </div>
      <div className="about-project__time-frontend">
        <p className="about-project__time-frontend-scale">4 недели</p>
        <p className="about-project__time-mark">Front-end</p>
      </div>
    </section>
  );
}

export default AboutProject;