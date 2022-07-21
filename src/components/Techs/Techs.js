import './Techs.css';
import SectionTitle from '../SectionTitle/SectionTitle';

const Techs = () => {
  return(
    <section className="techs" id="techs">
        <SectionTitle title="Технологии" selector="section__tech" />
        <p className="techs__heading">7 технологий</p>
        <p className="techs__description-paragraph">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
        <div className="techs__widgets">
            <p className="techs__widget">HTML</p>
            <p className="techs__widget">CSS</p>
            <p className="techs__widget">JS</p>
            <p className="techs__widget">React</p>
            <p className="techs__widget">Git</p>
            <p className="techs__widget">Express.js</p>
            <p className="techs__widget">mongoDB</p>
        </div>
    </section>
  )
}

export default Techs;