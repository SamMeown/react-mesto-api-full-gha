import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({onClose, isOpen}) {
  return (
    <PopupWithForm name="profile" title="Редактировать профиль" btnTitle="Сохранить" onClose={onClose} isOpen={isOpen}>
        <label className="form__field">
          <input className="form__input" id="name-input" type="text" name="name" placeholder="Имя" value="" minLength="2" maxLength="40" required />
          <span className="form__input-error form__input-error_el_name-input"></span>
        </label>
        <label className="form__field">
          <input className="form__input" id="about-input" type="text" name="about" placeholder="О себе" value="" minLength="2" maxLength="200" required />
          <span className="form__input-error form__input-error_el_about-input"></span>
        </label>
      </PopupWithForm>
  );
}

export default EditProfilePopup;