import React from 'react';
import '../blocks/infoTooltip.css';
import closeIcon from '../images/Close__Icon.png';
import successIcon from '../images/tooltip__checkmark.png';
import errorIcon from '../images/tooltip__error.png';

function InfoTooltip({ isOpen, onClose, message, type}) {
    return (
            <div className={`tooltip ${isOpen ? 'tooltip__open' : ''}`}>
                <div className={`tooltip__content tooltip__content_${type}`}>
                    <img src={type === 'success' ? successIcon : errorIcon} alt='success' className="tooltip__icon" />
                    <p className="tooltip__message">{message}</p>
                    <img src={closeIcon} alt='close' className="tooltip__close" onClick={onClose} />
                </div>
            </div>
        );
}

export default InfoTooltip;