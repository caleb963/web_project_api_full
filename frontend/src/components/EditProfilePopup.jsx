import React,{useState,useContext,useEffect} from 'react';
import PopupWithForm from './PopupWithForm.js';
import CurrentUserContext from './CurrentUserContext.js';

function EditProfilePopup({ isOpen, onClose, onUpdateUser}) {
    const currentUser = useContext(CurrentUserContext);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (currentUser) {
            setName(currentUser.name || '');
            setDescription(currentUser.about || '');
        }
    }, [currentUser]);

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm isOpen={isOpen} onClose={onClose} title="Edit profile" name="edit" formId="profile-form" onSubmit={handleSubmit} buttonText="Save">
          <input
          type="text"
          name="name"
          value={name}
          onChange={handleNameChange}
          className=" popup__input popup__input_name"
          placeholder="Name"
          id="profile-input-name"
          required
          minLength="2"
          maxLength="40"
         />
           <span className="popup-error profile-input-name-error" ></span>
         <input
           type="text"
           name="about"
           value={description}
           onChange={handleDescriptionChange}
           className="poup__input popup__input_about"
           id="profile-input-about"
           placeholder="About"
           required
              minLength="2"
              maxLength="200"
         />
           <span className='popup-error profile-input-about-error'></span>
       
        </PopupWithForm>
    );
}


export default EditProfilePopup;