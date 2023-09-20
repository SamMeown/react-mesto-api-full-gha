import { useEffect } from "react";
import useForm from "../hooks/form";
import MainWithForm from "./MainWithForm";

function Register({onRegister}) {

  const {values, setValues, handleChange} = useForm({email: "", password: ""});

  useEffect(() => {
    return () => {
      setValues({
        email: "", 
        password: ""
      });
    }
  }, []);

  function handleSubmit(evt) {
    evt.preventDefault();
    
    const {email, password} = values; 
    if (!email || !password) {
      return;
    }

    onRegister(email, password);
  }

  return (
    <MainWithForm name="register" title="Регистрация" btnTitle="Зарегистрироваться" linkTitle="Уже зарегистрированы? Войти" linkPath="/sign-in" onSubmit={handleSubmit}>
      <label className="form__field">
        <input className="form__input form__input_style_page form__input_theme_dark" id="email-input" type="email" name="email" placeholder="Email" value={values.email} minLength="6" maxLength="40" onChange={handleChange} required />
        <span className="form__input-error form__input-error_el_name-input"></span>
      </label>
      <label className="form__field">
        <input className="form__input form__input_style_page form__input_theme_dark" id="password-input" type="password" name="password" placeholder="Пароль" value={values.password} minLength="6" maxLength="200" onChange={handleChange} required />
        <span className="form__input-error form__input-error_el_about-input"></span>
      </label>
    </MainWithForm>
  );
}

export default Register;