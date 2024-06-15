import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import ReactDOM from 'react-dom';
import styles from './SidePopup.module.css';

function SidePopup({ className, isOpen, closePopup, children, ...props }) {
    const tDirection = useSelector((state) => state.translation.textDirection);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsAnimating(true);
        } else {
            setTimeout(() => {
                setIsAnimating(false);
            }, 300);
        }
    }, [isOpen]);

    if (!isOpen) {
        return null;
    }

    const handlePopupClose = (e) => {

        if (e.target.classList.contains(styles.popupOverlay)) {
            closePopup();
        }

    }

    let popupClasses = styles.popupOverlay;

    if (isAnimating) {
        popupClasses += ' ' + styles.popupOverlayActive;
    }

    return ReactDOM.createPortal(
        <div className={`${popupClasses} ${className} fcv-${tDirection}`} onMouseDown={handlePopupClose} onTouchEnd={handlePopupClose}>
            <div className={styles.popup} {...props}>
                <div className={styles.popup_content}>
                    {children}
                </div>
            </div>
        </div>,
        document.getElementById('sidePopup-root')
    );
}

export default SidePopup;