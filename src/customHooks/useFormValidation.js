import { useState } from "react";

export const useFormValidation = () => {
  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [formValid, setFormValid] = useState(false);
  const [inputsIsUnlock , setInputsIsUnlock] = useState(true);
  const lockInputs = () => {
    setInputsIsUnlock(false)
  };
  const unLockInputs = () => {
    setInputsIsUnlock(true);
  };
  const clearErrors = () => {
    for (let key in formErrors) {
      setFormErrors((prev) => ({
        ...prev,
        [key]: "",
      }));
    }
  };
  const validateField = (field, value) => {
    if (value === 0) setFormValid(false);
    switch (field) {
      case "name":
        if (value.length >= 2 && value.length <= 40) {
          setFormErrors((prev) => ({
            ...prev,
            [field]: "",
          }));
        } else {
          setFormErrors((prev) => ({
            ...prev,
            [field]: "Недопустимое количество символов",
          }));
        }
        break;
        case "email":
          if (value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i)) { /* eslint-disable-line */
            setFormErrors((prev) => ({
              ...prev,
              [field]: "",
            }));
          } else {
            setFormErrors((prev) => ({
              ...prev,
              [field]: "Необходимо ввести корректный email!",
            }));
          }
          break;
        case "password":
          if (
            value.match(
              /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/i 
            )
          ) {
            setFormErrors((prev) => ({
              ...prev,
              [field]: "",
            }));
          } else {
            setFormErrors((prev) => ({
              ...prev,
              [field]:
                "Необходимо ввести пароль, содержащий минимум одну букву, одну цифру, один специальный символ и состоящий не меньше, чем из 8 символов!",
            }));
          }
          break;
        default:
          console.log(
            "Ошибка! Проверочное поле не совпало ни с одним из условий."
          );
          break;
    }
  };
  return { formErrors, formValid, setFormValid, validateField, clearErrors, lockInputs, unLockInputs, inputsIsUnlock };
};