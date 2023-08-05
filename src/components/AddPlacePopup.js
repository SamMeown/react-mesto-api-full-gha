import { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({onClose, onAddPlace, isOpen}) {

  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleLinkChange(evt) {
    setLink(evt.target.value);
  }

  useEffect(() => {
    return () => {
      if (!isOpen) {
        setName("");
        setLink("")
      }
    }
  }, [isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();

    onAddPlace({
      name,
      link
    });
  }

  return (
    <PopupWithForm name="place" title="Новое место" btnTitle="Создать" onClose={onClose} onSubmit={handleSubmit} isOpen={isOpen}>
      <label className="form__field">
        <input className="form__input" id="place-name-input" type="text" name="name" placeholder="Название" value={name} minLength="2" maxLength="30" onChange={handleNameChange} required />
        <span className="form__input-error form__input-error_el_place-name-input"></span>
      </label>
      <label className="form__field">
        <input className="form__input" id="place-link-input" type="url" name="link" placeholder="Ссылка на картинку" value={link} onChange={handleLinkChange} required />
        <span className="form__input-error form__input-error_el_place-link-input"></span>
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
