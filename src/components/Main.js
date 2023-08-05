import { useContext, useEffect, useState } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';
import avatar_placeholder from '../images/avatar_placeholder.png';
import api from "../utils/api";
import Card from './Card';


function Main({onEditProfile, onEditAvatar, onAddPlace, onCardClick}) {

  const currentUser = useContext(CurrentUserContext);

  const [cards, setCards] = useState([]);

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
    <main className="content">
      <section className="profile page__profile">
        <span className="profile__picture-container" onClick={onEditAvatar}>
          <img src={(currentUser && currentUser.avatar) ?? avatar_placeholder} alt="Аватар" className="profile__picture" />
        </span>
        <div className="profile__info">
          <div className="profile__name-container">
            <h1 className="profile__name overflow-ready-string">{currentUser ? currentUser.name : ""}</h1>
            <button className="btn profile__edit-btn" type="button" onClick={onEditProfile} aria-label="Редактировать профиль"></button>
          </div>
          <p className="profile__about overflow-ready-string">{currentUser ? currentUser.about : ""}</p>
        </div>
        <button className="btn profile__add-btn" type="button" onClick={onAddPlace} aria-label="Добавить место"></button>
      </section>
      <section className="places page__places">
        <ul className="places__list">
          {cards.map(item => (
            <Card 
              card={item} 
              onCardClick={onCardClick} 
              onCardLike={handleCardLike} 
              onCardDelete={handleCardDelete} 
              key={item.id} 
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;

