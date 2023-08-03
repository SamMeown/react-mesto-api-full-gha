import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import PopupWithImage from "./PopupWithImage";

function App() {
  return (
    <div className="page">
      <div className="page__content">
        <Header />
        <Main />
        <Footer />
      </div>
      <PopupWithForm name="profile" title="Редактировать профиль" btnTitle="Сохранить">
        <label className="form__field">
          <input className="form__input" id="name-input" type="text" name="name" placeholder="Имя" value="" minlength="2" maxlength="40" required />
          <span className="form__input-error form__input-error_el_name-input"></span>
        </label>
        <label className="form__field">
          <input className="form__input" id="about-input" type="text" name="about" placeholder="О себе" value="" minlength="2" maxlength="200" required />
          <span className="form__input-error form__input-error_el_about-input"></span>
        </label>
      </PopupWithForm>
      <PopupWithForm name="avatar" title="Обновить аватар" btnTitle="Сохранить">
        <label className="form__field">
          <input className="form__input" id="avatar-link-input" type="url" name="link" placeholder="Ссылка на аватар" value="" required />
          <span className="form__input-error form__input-error_el_avatar-link-input"></span>
        </label>
      </PopupWithForm>
      <PopupWithForm name="place" title="Новое место" btnTitle="Создать">
        <label className="form__field">
          <input className="form__input" id="place-name-input" type="text" name="name" placeholder="Название" value="" minlength="2" maxlength="30" required />
          <span className="form__input-error form__input-error_el_place-name-input"></span>
        </label>
        <label className="form__field">
          <input className="form__input" id="place-link-input" type="url" name="link" placeholder="Ссылка на картинку" value="" required />
          <span className="form__input-error form__input-error_el_place-link-input"></span>
        </label>
      </PopupWithForm>
      <PopupWithImage />
      <PopupWithForm name="delete" title="Вы уверены?" btnTitle="Да" />
    </div>
  );
}

export default App;
