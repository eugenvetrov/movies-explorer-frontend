import './LandingSelector.css';
import { Link } from "react-router-dom";

const LandingSelector = () => {
    return(
        <div className="landing-selector">
            <Link to="#about" className="landing-selector__link">О проекте</Link>
            <Link to="#technology" className="landing-selector__link">Технологии</Link>
            <Link to="#student" className="landing-selector__link">Студент</Link>
        </div>
    )
}

export default LandingSelector;