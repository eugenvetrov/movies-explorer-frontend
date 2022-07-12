import './LandingSelector.css';

const LandingSelector = () => {
    return(
        <div className="landing-selector">
            <a href="#about" className="landing-selector__link">О проекте</a>
            <a href="#technology" className="landing-selector__link">Технологии</a>
            <a href="#student" className="landing-selector__link">Студент</a>
        </div>
    )
}

export default LandingSelector;