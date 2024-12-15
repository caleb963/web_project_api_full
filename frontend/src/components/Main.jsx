import React, {useState , useEffect, useContext} from'react';
import api from '../utils/api.js';
import Card from './Card.js';
import profileAvatar from '../images/profile__avatar.png';
import profileAvatarEditIcon from '../images/Edit__Button.png';
import editButtonIcon from '../images/Edit__Button.png';
import addButtonIcon from '../images/add__Button.png';
import CurrentUserContext from './CurrentUserContext.js';


function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards, onCardLike, onCardDelete}) {
    const [userName, setUserName] = useState('');
    const [userDescription, setUserDescription] = useState('');
    const [userAvatar, setUserAvatar] = useState('');
    const currentUser = useContext(CurrentUserContext); //use the content of the CurrentUserContext

    useEffect(() => {
      if (currentUser) {
        setUserName(currentUser.name || '');
        setUserDescription(currentUser.about || '');
        setUserAvatar(currentUser.avatar || '');
      }
    } , [currentUser]);

    return (
    <div className="page">
        <div className="profile">
      <div className="profile__avatar-content" >
        <img className="profile__avatar" 
        src={userAvatar || ''} 
        alt="Jacques Cousteau" 
        style={{ backgroundImage: `url(${userAvatar || ''})`}}  />
        <img className="profile__avatar-edit-icon" src={profileAvatarEditIcon} alt="Edit Avatar" onClick={onEditAvatar} />
      </div>
      <div className="profile__info">
        <div className="profile__title">
          <h2 className="profile__name" id="profile-name">{userName ||'Loading...'}</h2>
          <div className="profile__edit-button" id="profile-edit-button" onClick={onEditProfile}>
            <img src={editButtonIcon} alt="Edit your profile button" />
          </div>
        </div>
        <h3 className="profile__about" id="profile-about">{userDescription || 'Loading...'}</h3>
      </div>
      <div className="profile__add-button" id="profile-add-button" onClick={onAddPlace}>
        <img src={addButtonIcon} alt="Add image to your profile button" />
      </div>
    </div>
    <section className="elements">
        {cards?.length > 0 ? cards.map((card) => (
          <Card key={card._id} card={card} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete}/>
        )) : <p>No cards available.</p>}
    </section>
    </div>
    );
}

export default Main;