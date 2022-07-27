import React from 'react'
import './Preloader.css'

const Preloader = ({isLoading}) => {
    return (
        <div className="preloader">
            <div className="preloader__container">
                <span className={`preloader__round ${isLoading ? "preload__round_loading" : ""}`}></span>
            </div>
        </div>
    )
};

export default Preloader
