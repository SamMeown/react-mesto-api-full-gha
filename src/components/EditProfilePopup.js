import { useContext, useEffect, useState } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({onClose, onUpdateUser, isOpen}) {

  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleDescriptionChange(evt) {
    setDescription(evt.target.value);
  }

  useEffect(() => {
    setName(currentUser ? currentUser.name : "");
    setDescription(currentUser ? currentUser.about : "");
  },[currentUser]);

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateUser({
      name,
      about: description
    });
  }

  return (
    <PopupWithForm name="profile" title="Редактировать профиль" btnTitle="Сохранить" onClose={onClose} onSubmit={handleSubmit} isOpen={isOpen}>
        <label className="form__field">
          <input className="form__input" id="name-input" type="text" name="name" placeholder="Имя" value={name} minLength="2" maxLength="40" onChange={handleNameChange} required />
          <span className="form__input-error form__input-error_el_name-input"></span>
        </label>
        <label className="form__field">
          <input className="form__input" id="about-input" type="text" name="about" placeholder="О себе" value={description} minLength="2" maxLength="200" onChange={handleDescriptionChange} required />
          <span className="form__input-error form__input-error_el_about-input"></span>
        </label>
      </PopupWithForm>
  );
}

export default EditProfilePopup;