import './Technology.css';
import '../AboutProject/AboutProject.css'

const Technology = () => {
  return(
    <section className="technology" id="technology">
        <h2 className="about-project__title technology__title">Технологии</h2>
        <hr className="about-project__line technology__line"/>
        <p className="technology__heading">7 технологий</p>
        <p className="about-project__description-paragraph technology__description-paragraph">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
        <div className="technology__widgets">
            <p className="technology__widget">HTML</p>
            <p className="technology__widget">CSS</p>
            <p className="technology__widget">JS</p>
            <p className="technology__widget">React</p>
            <p className="technology__widget">Git</p>
            <p className="technology__widget">Express.js</p>
            <p className="technology__widget">mongoDB</p>
        </div>
    </section>
  )
}

export default Technology;