import './FilterCheckbox.css';

const FilterCheckbox = ({ title, name, handleChange, checked }) => {

    return (
        <div className="checkbox">
        <label className="checkbox__switch">
        <input
          className={`checkbox__switch-input ${checked !== null && checked !== undefined&& !checked.longFilm ? "checkbox__slider_active" : ""}`}
          type="checkbox"
          name={name}
          onChange={handleChange}
        />
        <span className="checkbox__slider checkbox__round"></span>
        {title}</label>
      </div>
    )
}

export default FilterCheckbox;