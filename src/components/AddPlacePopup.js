import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({onClose, isOpen}) {
  return (
    <PopupWithForm name="place" title="Новое место" btnTitle="Создать" onClose={onClose} isOpen={isOpen}>
      <label className="form__field">
        <input className="form__input" id="place-name-input" type="text" name="name" placeholder="Название" value="" minLength="2" maxLength="30" required />
        <span className="form__input-error form__input-error_el_place-name-input"></span>
      </label>
      <label className="form__field">
        <input className="form__input" id="place-link-input" type="url" name="link" placeholder="Ссылка на картинку" value="" required />
        <span className="form__input-error form__input-error_el_place-link-input"></span>
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
