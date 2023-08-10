import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useForm from "../hooks/form";
import auth from "../utils/auth";
import MainWithForm from "./MainWithForm";

function Register() {

  const {values, setValues, handleChange} = useForm({email: "", password: ""});

  const navigate = useNavigate();

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
    auth.register(email, password)
    .then(res => {
      console.log(res);
      navigate('/sign-in')
    })
    .catch(err => {
      console.log(`Ошибка ${err}`);
    });
  }

  return (
    <MainWithForm name="register" title="Регистрация" btnTitle="Зарегистрироваться" linkTitle="Уже зарегистрированы? Войти" linkPath="/sign-in" onSubmit={handleSubmit}>
      <label className="form__field">
        <input className="form__input form__input_style_page form__input_theme_dark" id="email-input" type="text" name="email" placeholder="Email" value={values.email} minLength="2" maxLength="40" onChange={handleChange} required />
        <span className="form__input-error form__input-error_el_name-input"></span>
      </label>
      <label className="form__field">
        <input className="form__input form__input_style_page form__input_theme_dark" id="password-input" type="password" name="password" placeholder="Пароль" value={values.password} minLength="2" maxLength="200" onChange={handleChange} required />
        <span className="form__input-error form__input-error_el_about-input"></span>
      </label>
    </MainWithForm>
  );
}

export default Register;