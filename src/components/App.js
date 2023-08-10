import { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import Register from "./Register";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import CurrentUserContext from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import MessagePopup from "./MessagePopup";
import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import ProtectedRouteElement from "./ProtectedRoute";


function App() {

  const [currentUser, setCurrentUser] = useState(null);
  const [cards, setCards] = useState([]);

  const [loggedIn, setLoggedIn] = useState(false);

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

  useEffect(() => {
    api.getCards()
      .then(data => {
        console.log(`Got cards data: `, data);
        setCardsInfo(data);
      })
      .catch(err => {
        console.log(`Ошибка ${err}`);
      });
  }, [currentUser]);

  function setCardsInfo(data) {
    setCards(data.map(getCardData));
  }

  function getCardData(item) {
    return {
      id: item._id,
      name: item.name,
      link: item.link,
      likes: item.likes,
      owner: item.owner
    };
  }

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
        closeAllPopups();
      })
      .catch(err => {
        console.log(`Ошибка ${err}`);
      });
  }

  function handleUpdateAvatar(avatarInfo) {
    api.updateUserAvatar(avatarInfo)
      .then(data => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(err => {
        console.log(`Ошибка ${err}`);
      });
  }

  function handleAddPlaceSubmit(placeInfo) {
    api.createCard(placeInfo)
      .then(data => {
        const newCard = getCardData(data);
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => {
        console.log(`Ошибка ${err}`);
      })
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(like => like._id === currentUser._id);

    api.changeLikeStatus(card.id, !isLiked)
      .then(newCard => {
        setCards(state => {
          return state.map(c => c.id === card.id ? getCardData(newCard) : c);
        });
      })
      .catch(err => {
        console.log(`Ошибка ${err}`);
      });
  }

  function handleCardDelete(card) {
    api.deleteCard(card.id)
      .then(data => {
        setCards(state => {
          return state.filter(c => c.id !== card.id);
        });
      })
      .catch(err => {
        console.log(`Ошибка ${err}`);
      });
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page__content">
          <Header loggedIn={loggedIn} />
          <Routes>
            <Route path="/" element={<ProtectedRouteElement loggedIn={loggedIn} element={
              <>
                <Main 
                  cards={cards}
                  onEditProfile={handleEditProfileClick} 
                  onEditAvatar={handleEditAvatarClick} 
                  onAddPlace={handleAddPlaceClick} 
                  onCardClick={handleCardClick} 
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                />
                <Footer />
              </>
            } />} />
            <Route path="/sign-up" element={
              <Register />
            } />
            <Route path="/sign-in" element={
              <Login />
            } />
          </Routes>
        </div>
        <MessagePopup title="Вы успешно зарегистрировались!" onClose={closeAllPopups} isOpen={false} />
        <EditProfilePopup onClose={closeAllPopups} onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} />
        <EditAvatarPopup onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} />
        <AddPlacePopup onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} isOpen={isAddPlacePopupOpen} />
        <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
        <PopupWithForm name="delete" title="Вы уверены?" btnTitle="Да" />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
