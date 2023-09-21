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
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Login from "./Login";
import ProtectedRouteElement from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import auth from "../utils/auth";


function App() {

  const [currentUser, setCurrentUser] = useState(null);
  const [cards, setCards] = useState([]);

  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUserEmail, setCurrentUserEmail] = useState("");

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState(null);
  
  const [registrationSuccess, setRegistrationSuccess] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedIn) {
      return;
    }

    api.getUserInfo()
      .then(data => {
        console.log(`Got user data: `, data);
        setCurrentUser(data); 
      })
      .catch(err => {
        console.log(`Ошибка ${err}`);
      });
  }, [loggedIn]);

  useEffect(() => {
    if (!loggedIn) {
      return;
    }

    api.getCards()
      .then(data => {
        const reversedData = data.slice(0).reverse();
        console.log(`Got cards data: `, reversedData);
        setCardsInfo(reversedData);
      })
      .catch(err => {
        console.log(`Ошибка ${err}`);
      });
  }, [loggedIn]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      auth.getUserInfo(token)
      .then(info => {
        console.log(`Got user data (auth): `, info);
        if (!info.email) {
          return;
        }

        setLoggedIn(true);
        setCurrentUserEmail(info.email);
        navigate('/');
      })
      .catch(err => {
        console.log(`Ошибка ${err}`);
      });
    }
  }, []);

  function setCardsInfo(data) {
    setCards(data.map(getCardData));
  }

  function getCardData({ _id: id, name, link, likes, owner }) {
    return { id, name, link, likes, owner };
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

    setRegistrationSuccess(null);
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

  function handleRegistration(email, password) {
    auth.register(email, password)
    .then(res => {
      console.log(`Registration succeeded: `, res);
      setRegistrationSuccess(true);
      navigate('/sign-in');
    })
    .catch(err => {
      console.log(`Ошибка ${err}`);
      setRegistrationSuccess(false);
    });
  }

  function handleLogin(email, password) {
    auth.authorize(email, password)
    .then(data => {
      setLoggedIn(true);
      setCurrentUserEmail(email);
      navigate('/');
    })
    .catch(err => {
      console.log(`Ошибка ${err}`);
    });
  }

  function handleLogout() {
    setLoggedIn(false);
    setCurrentUserEmail("");
    navigate('/sign-in');
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
      <CurrentUserContext.Provider value={currentUser && {...currentUser, email: currentUserEmail}}>
        <div className="page__content">
          <Header loggedIn={loggedIn} onLogout={handleLogout} />
          <Routes>
            <Route path="/" element={<ProtectedRouteElement loggedIn={loggedIn} element={() => (
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
            )} />} />
            <Route path="/sign-up" element={
              <Register onRegister={handleRegistration} />
            } />
            <Route path="/sign-in" element={
              <Login onLogin={handleLogin} />
            } />
            <Route path="*" element={
              <Navigate to="/" replace/>
            }/>
          </Routes>
        </div>
        <InfoTooltip success={registrationSuccess} onClose={closeAllPopups} isOpen={registrationSuccess !== null}/>
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
