import logo from './images/logo.svg';


function App() {
  return (
    <div className="page">
      <div className="page__content">
        <header className="header page__header">
          <img src={logo} alt="Лого" className="logo" />
        </header>
        <main className="content">
          <section className="profile page__profile">
            <span className="profile__picture-container">
              <img src="<%=require('./images/avatar_placeholder.png')%>" alt="Аватар" className="profile__picture" />
            </span>
            <div className="profile__info">
              <div className="profile__name-container">
                <h1 className="profile__name overflow-ready-string"></h1>
                <button className="btn profile__edit-btn" type="button" aria-label="Редактировать профиль"></button>
              </div>
              <p className="profile__about overflow-ready-string"></p>
            </div>
            <button className="btn profile__add-btn" type="button" aria-label="Добавить место"></button>
          </section>
          <section className="places page__places">
            <ul className="places__list">
            </ul>
          </section>
        </main>
        <footer className="footer page__footer">
          <p className="footer__copyright">© 2022 Mesto Russia</p>
        </footer>
      </div>
      <div className="popup page__profile-popup">
        <div className="popup__container">
          <button className="popup__close-btn btn" type="button" aria-label="Закрыть"></button>
          <form className="form popup__form" name="profile-form" novalidate>
            <h2 className="form__title">Редактировать профиль</h2>
            <fieldset className="form__fieldset form__fieldset_set_inputs">
              <label className="form__field">
                <input className="form__input" id="name-input" type="text" name="name" placeholder="Имя" value="" minlength="2" maxlength="40" required />
                <span className="form__input-error form__input-error_el_name-input"></span>
              </label>
              <label className="form__field">
                <input className="form__input" id="about-input" type="text" name="about" placeholder="О себе" value="" minlength="2" maxlength="200" required />
                <span className="form__input-error form__input-error_el_about-input"></span>
              </label>
            </fieldset>
            <button type="submit" className="form__submit-btn">Сохранить</button>
          </form>
        </div>
      </div>
      <div className="popup page__avatar-popup">
        <div className="popup__container">
          <button className="popup__close-btn btn" type="button" aria-label="Закрыть"></button>
          <form className="form popup__form" name="profile-form" novalidate>
            <h2 className="form__title">Обновить аватар</h2>
            <fieldset className="form__fieldset form__fieldset_set_inputs">
              <label className="form__field">
                <input className="form__input" id="avatar-link-input" type="url" name="link" placeholder="Ссылка на аватар" value="" required />
                <span className="form__input-error form__input-error_el_avatar-link-input"></span>
              </label>
            </fieldset>
            <button type="submit" className="form__submit-btn">Сохранить</button>
          </form>
        </div>
      </div>
      <div className="popup page__place-popup">
        <div className="popup__container">
          <button className="popup__close-btn btn" type="button" aria-label="Закрыть"></button>
          <form className="form popup__form" name="place-form" novalidate>
            <h2 className="form__title">Новое место</h2>
            <fieldset className="form__fieldset form__fieldset_set_inputs">
              <label className="form__field">
                <input className="form__input" id="place-name-input" type="text" name="name" placeholder="Название" value="" minlength="2" maxlength="30" required />
                <span className="form__input-error form__input-error_el_place-name-input"></span>
              </label>
              <label className="form__field">
                <input className="form__input" id="place-link-input" type="url" name="link" placeholder="Ссылка на картинку" value="" required />
                <span className="form__input-error form__input-error_el_place-link-input"></span>
              </label>
            </fieldset>
            <button type="submit" className="form__submit-btn">Создать</button>
          </form>
        </div>
      </div>
      <div className="popup popup_type_image page__place-image-popup">
        <div className="popup__container popup__container_type_image">
          <button className="popup__close-btn btn" type="button" aria-label="Закрыть"></button>
          <img src="<%=require('./images/places_placeholder.png')%>" alt="" className="popup__image" />
          <p className="popup__image-caption"></p>
        </div>
      </div>
      <div className="popup page__delete-popup">
        <div className="popup__container">
          <button className="popup__close-btn btn" type="button" aria-label="Закрыть"></button>
          <form className="form popup__form" name="place-form" novalidate>
            <h2 className="form__title">Вы уверены?</h2>
            <button type="submit" className="form__submit-btn form__submit-btn_type_confirm">Да</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
