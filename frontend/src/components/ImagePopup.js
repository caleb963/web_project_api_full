import closeIcon from '../images/Close__Icon.png';

function ImagePopup({card, onClose}) {
  return (
    <div className = {`popup popup_type_image ${card ? 'popup__opener' : ''}`}>
         <div className='popup__image-container'>
            <button className='popup__close-button' type='button'  onClick={onClose}>
                <img src={closeIcon} alt='Close form button' />
            </button>
            <img className='popup__image' src={card?.link} alt={card?.name} />
            <h2 className='popup__image-title'>{card?.name}</h2>
         </div>
    </div>
   
  );
}

export default ImagePopup;