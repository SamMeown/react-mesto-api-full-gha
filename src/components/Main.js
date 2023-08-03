import { useEffect, useState } from 'react';
import avatar_placeholder from '../images/avatar_placeholder.png';
import api from "../utils/api";
import Card from './Card';


function Main({onEditProfile, onEditAvatar, onAddPlace, onCardClick}) {
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userDescription, setUserDescription] = useState(null);
  const [userAvatar, setUserAvatar] = useState(null);

  const [cards, setCards] = useState([])

  function setUserInfo(user) {
    setUserId(user._id)
    setUserName(user.name);
    setUserDescription(user.about);
    setUserAvatar(user.avatar);
  }

  function setCardsInfo(data) {
    setCards(
      data.map(item => ({
        id: item._id,
        name: item.name,
        link: item.link,
        likesCount: item.likes.length,
        liked: item.likes.filter(like => like._id === userId).length > 0,
        removable: item.owner._id === userId
      }))
    );
  }

  useEffect(() => {
    api.getUserInfo()
      .then(data => {
        console.log(`Got user data: `, data);
        setUserInfo(data);
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
  }, [userId]);

  return (
    <main className="content">
      <section className="profile page__profile">
        <span className="profile__picture-container" onClick={onEditAvatar}>
          <img src={userAvatar ?? avatar_placeholder} alt="Аватар" className="profile__picture" />
        </span>
        <div className="profile__info">
          <div className="profile__name-container">
            <h1 className="profile__name overflow-ready-string">{userName ?? ""}</h1>
            <button className="btn profile__edit-btn" type="button" onClick={onEditProfile} aria-label="Редактировать профиль"></button>
          </div>
          <p className="profile__about overflow-ready-string">{userDescription ?? ""}</p>
        </div>
        <button className="btn profile__add-btn" type="button" onClick={onAddPlace} aria-label="Добавить место"></button>
      </section>
      <section className="places page__places">
        <ul className="places__list">
          {cards.map(item => (
            <Card card={item} onCardClick={onCardClick} key={item.id} />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;

