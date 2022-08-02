import { useState, useEffect } from 'react';
import './PopupInform.css';
import okImage from '../../images/ok-image.svg';
import errorImage from '../../images/error-image.svg';

const PopupInform = ({isActive, ActiveOff, errorMessage}) => {
    
    const [isOk, setIsOk] = useState(true)

    useEffect(() =>{
      errorMessage ? setIsOk(false) : setIsOk(true)
    }, [errorMessage]);

    return(
      <div className={`popup ${isActive ? 'popup_active' : ""}`} onClick={ActiveOff}>
          <div className="popup__container">
              <img className="popup__status-image" src={ isOk ? okImage : errorImage } alt="Статус запроса"/>
        <div className="popup__error-message">
        {
          errorMessage ? `${errorMessage}` : ""
        }
        </div>
          </div>
      </div>
    )
}

export default PopupInform;