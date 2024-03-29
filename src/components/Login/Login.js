import './Login.css';
import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";

const Login = ({onLogin, formErrors, validateField, formValid, inputsIsUnlock}) => {

    const user = useContext(CurrentUserContext);
    const navigate = useNavigate();

    useEffect(() => {
      if(user) navigate("/")
    },[user, navigate])
    
    const [values, setValues] = useState({
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
        if (isSomeFieldEmpty) {
            alert("Простите! Поле не должно быть пустым.")
        }
        formValid && !isSomeFieldEmpty ?
        onLogin({
            password: values.password,
            email: values.email,
          }) : alert("Простите! Какое-то из полей заполнено некорректно.");
      }

    return (
        <section className="auth">
        <p className="auth__title">Рады видеть!</p>
        <form className="auth__form" onSubmit={(e) => handleSubmit(e)}>
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
                Войти
            </button>
        </form>
        <p className="auth__text">Ещё не зарегестрированы?<Link to="../signup" className="auth__link">Регистрация</Link></p>
    </section>
    )
}

export default Login;