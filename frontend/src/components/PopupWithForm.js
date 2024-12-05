import closeIcon from '../images/Close__Icon.png';
import React from 'react';

function PopupWithForm({ isOpen, onClose, title, name, children, onSubmit, formId, buttonText }) {
    return (
        <div className ={`popup popup_type_${name} ${isOpen ? 'popup__opener' : ''}`}>
            <div className="popup__close-button">
                <img src={closeIcon} alt="close form button" onClick={onClose} />
            </div>
            <form className='popup__edit-form' name={name} id={formId} onSubmit={onSubmit}>
                <h2 className="popup__edit-form-title">{title}</h2>
                {children}
                <button className='popup__input-submit' type='submit'>{buttonText}</button>
            </form> 

        </div>
    );
}

export default PopupWithForm;
