import { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import CurrentUserContext from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";


function App() {

  const [currentUser, setCurrentUser] = useState(null);

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    api.getUserInfo()
      .then(data => {
        console.log(`Got user data: `, data);
        setCurrentUser(data); 
      })
      .catch(err => {
        console.log(`Ошибка ${err}`);
      });
  }, []);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);

    setSelectedCard(null);
  }

  function handleUpdateUser(userInfo) {
    api.updateUserInfo(userInfo)
      .then(data => {
        setCurrentUser(data);
      })
      .catch(err => {
        console.log(`Ошибка ${err}`);
      });
    closeAllPopups();
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page__content">
          <Header />
          <Main 
            onEditProfile={handleEditProfileClick} 
            onEditAvatar={handleEditAvatarClick} 
            onAddPlace={handleAddPlaceClick} 
            onCardClick={handleCardClick} 
          />
          <Footer />
        </div>
        <EditProfilePopup onClose={closeAllPopups} onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} />
        <PopupWithForm name="avatar" title="Обновить аватар" btnTitle="Сохранить" onClose={closeAllPopups} isOpen={isEditAvatarPopupOpen}>
          <label className="form__field">
            <input className="form__input" id="avatar-link-input" type="url" name="link" placeholder="Ссылка на аватар" value="" required />
            <span className="form__input-error form__input-error_el_avatar-link-input"></span>
          </label>
        </PopupWithForm>
        <PopupWithForm name="place" title="Новое место" btnTitle="Создать" onClose={closeAllPopups} isOpen={isAddPlacePopupOpen}>
          <label className="form__field">
            <input className="form__input" id="place-name-input" type="text" name="name" placeholder="Название" value="" minLength="2" maxLength="30" required />
            <span className="form__input-error form__input-error_el_place-name-input"></span>
          </label>
          <label className="form__field">
            <input className="form__input" id="place-link-input" type="url" name="link" placeholder="Ссылка на картинку" value="" required />
            <span className="form__input-error form__input-error_el_place-link-input"></span>
          </label>
        </PopupWithForm>
        <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
        <PopupWithForm name="delete" title="Вы уверены?" btnTitle="Да" />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
