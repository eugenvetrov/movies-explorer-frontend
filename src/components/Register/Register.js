import './Register.css';
import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";

const Register = ({onRegister, formErrors, validateField, formValid, inputsIsUnlock}) => {
    
    const user = useContext(CurrentUserContext);
    const navigate = useNavigate();

    useEffect(() => {
      if(user) navigate("/")
    },[user, navigate])
    
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
      });

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (inputsIsUnlock) {
          setValues((prev) => ({
            ...prev,
            [name]: value,
          }));
        }
          validateField(name, value);
      };

    const handleSubmit = (event) => {
        event.preventDefault();
        const isSomeFieldEmpty = Object.values(values).some((item) => item === "");
        formValid && !isSomeFieldEmpty ?
          onRegister({
              name: values.name,
              password: values.password,
              email: values.email,
            }) : alert("Простите! Какое-то из полей заполнено некорректно.");
      }

    return (
        <section className="auth">
            <p className="auth__title">Добро пожаловать!</p>
            <form className="auth__form" autoComplete="off"
              noValidate onSubmit={(e) => handleSubmit(e)}>
                <label className="auth__form-label">Имя
                    <input type="text" className="auth__form-field"
                         name="name"
                         onChange={handleChange}
                    />
                    <span className="auth__error  auth__error_visible">{formErrors.name}</span>
                </label>
                <label className="auth__form-label">E-mail
                    <input type="email" className="auth__form-field"
                         name="email"
                         onChange={handleChange}
                    />
                    <span className="auth__error  auth__error_visible">{formErrors.email}</span>
                </label>
                <label className="auth__form-label">Пароль
                    <input type="password" className="auth__form-field"
                         name="password"
                         onChange={handleChange}
                    />
                    <span className="auth__error  auth__error_visible">{formErrors.password}</span>
                </label>
                <button className={`auth__submit ${formValid ? "" : "auth__submit_disable"}`} type="submit">
                    Зарегестрироваться
                </button>
            </form>
            <p className="auth__text">Уже зарегестрированы?<Link to="../signin" className="auth__link">Войти</Link></p>
        </section>
    )
}

export default Register;