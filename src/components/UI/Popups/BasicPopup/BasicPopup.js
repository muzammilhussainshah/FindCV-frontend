import { useSelector } from 'react-redux';

import ReactDOM from 'react-dom';
import styles from './BasicPopup.module.css';

function BasicPopup({ className, isOpen, closePopup, children, ...props }) {
    const tDirection = useSelector((state) => state.translation.textDirection);

    if (!isOpen) {
        return null;
    }

    const handlePopupClose = (e) => {

        if (e.target.classList.contains(styles.popupOverlay)) {
            closePopup();
        }

    }

    return ReactDOM.createPortal(
        <div className={`${styles.popupOverlay} ${className} fcv-${tDirection}`} onMouseDown={handlePopupClose} onTouchEnd={handlePopupClose}>
            <div className={styles.popup} {...props}>
                {children}
            </div>
        </div>,
        document.getElementById('basicPopup-root')
    );
}

export default BasicPopup;