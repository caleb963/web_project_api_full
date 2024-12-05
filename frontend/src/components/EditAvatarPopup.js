import React , { useRef, useContext } from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from './CurrentUserContext';


function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
    const avatarRef = useRef();
    const currentUser = useContext(CurrentUserContext);

    function handleSubmit(e) {
        e.preventDefault();
            if (avatarRef.current) {
                onUpdateAvatar({
                    avatar: avatarRef.current.value,
                });
            }
    }
  
    return (
        <PopupWithForm
            isOpen={isOpen}
            onClose={onClose}
            title="Change profile picture"
            formId="update-avatar"
            name="update-avatar-form"
            onSubmit={handleSubmit}
            buttonText="Save"
            >
            <input 
                ref={avatarRef}
                type="url"
                name="avatar"
                className="popup__input popup__input_about"
                id="input-avatar-url"
                placeholder="Image URL"
                required
                />
                  <span className='popup-error input-avatar-url-error'></span>
            </PopupWithForm>

    );

}

export default EditAvatarPopup;