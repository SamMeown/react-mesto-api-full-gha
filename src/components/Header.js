import { useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import CurrentUserContext from '../contexts/CurrentUserContext';
import logo from '../images/logo.svg';


function Header({loggedIn}) {

  const currentUser = useContext(CurrentUserContext);

  return (
    <header className="header page__header">
      <img src={logo} alt="Лого" className="logo" />
      <nav className="header__menu">
        <p className={`header__menu-info ${loggedIn ? "header__menu_visible" : ""}`}>{currentUser ? currentUser.email : ""}</p>
        <NavLink 
          className={({isActive}) => `header__menu-link ${!loggedIn && !isActive ? "header__menu_visible" : ""}`} 
          to="/sign-up"
        >Регистрация</NavLink>
        <NavLink 
          className={({isActive}) => `header__menu-link ${!loggedIn && !isActive ? "header__menu_visible" : ""}`} 
          to="/sign-in"
        >Войти</NavLink>
        <Link className={`header__menu-link ${loggedIn ? "header__menu_visible" : ""}`} to="#">Выйти</Link>
      </nav>
    </header>
  );
}

export default Header;