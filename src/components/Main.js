import { useEffect, useState } from 'react';
import avatar_placeholder from '../images/avatar_placeholder.png'
import api from "../utils/api";


function Main({onEditProfile, onEditAvatar, onAddPlace}) {
  const [userName, setUserName] = useState(null);
  const [userDescription, setUserDescription] = useState(null);
  const [userAvatar, setUserAvatar] = useState(null);

  useEffect(() => {
    api.getUserInfo()
      .then(data => {
        const user = data;
        setUserName(user.name);
        setUserDescription(user.about);
        setUserAvatar(user.avatar);
      });
  });

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
        </ul>
      </section>
    </main>
  );
}

export default Main;

