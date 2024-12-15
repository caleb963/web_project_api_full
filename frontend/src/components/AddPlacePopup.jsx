import React, {useState} from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
    const [title, setTitle] = useState('');
    const [link,setLink] = useState('');

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleLinkChange = (e) => {
        setLink(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddPlace({
            name: title,
            link: link,
        });
    };


    return (
        <PopupWithForm 
        name='add-card'
        title='New Place'
        isOpen={isOpen}
        onClose={onClose}
        formId='addcard-form'
        buttonText='Create'
        onSubmit={handleSubmit}
        >
          <input className='popup__input popup__input-name' id='input-card-title' type='text' minLength='2' maxLength='30' placeholder='Title' value={title} onChange={handleTitleChange} />
          <span className='popup-error input-card-title-error'></span>
        <input className='popup__input popup__input-about' id='input-card-url' type='text' placeholder='url' value={link} onChange={handleLinkChange}/>
          <span className='poopup-error input-card-url-error'></span>
                    </PopupWithForm>

    );
}

export default AddPlacePopup;
