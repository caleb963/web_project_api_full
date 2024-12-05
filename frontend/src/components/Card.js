import React, {useContext} from 'react';
import CurrentUserContext from './CurrentUserContext.js';

function Card({ card, onCardClick, onCardLike, onCardDelete}) {
const currentUser = useContext(CurrentUserContext);
console.log(card);

// class for the button to delete the card
const isOwn = card.owner._id === currentUser._id;

// class for the delete button
const cardDeleteButtonClassName = `elements__card-delete ${isOwn ? 'elements__card-delete' : 'elements__card-delete_hidden'}`;

// verify if the current user has like the card 
const isLiked = card.likes.some(i => i._id === currentUser._id);

// class for the like button
const cardLikeButtonClassName = `elements__card-heart ${isLiked ? 'card__heart_active' : ''}`;

    function handleClick() {
        onCardClick(card);
    }

    function handleLikeClick() {
        onCardLike(card);
    }

    function handleDeleteClick() {
        onCardDelete(card);
    }

    return(
        <div  className="elements__card">
        <div
        className="elements__card-image" 
        style={{ backgroundImage: ` url(${card.link})`}}
        onClick= {handleClick} />
        <button className={cardDeleteButtonClassName} onClick={handleDeleteClick}>
            <img  src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" alt="Delete card" />
            </button>
            <div className="elements__card-description">
                <h2 className="elements__card-title">{card.name}</h2>
                <button className= {cardLikeButtonClassName} onClick={handleLikeClick}>
                    <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" alt="heart" />
                </button>
                <span className="elements__card-like-count">{card.likes.length}</span>
            </div>
    </div>
);
}

export default Card;
    