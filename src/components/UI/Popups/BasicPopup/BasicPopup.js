import { useSelector } from 'react-redux';

import ReactDOM from 'react-dom';
import styles from './BasicPopup.module.css';

function BasicPopup({ isOpen, closePopup, children, ...props }) {
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
        <div className={`${styles.popupOverlay} fcv-${tDirection}`} onMouseDown={handlePopupClose} onTouchEnd={handlePopupClose}>
            <div className={styles.popup}>
                {children}
            </div>
        </div>,
        document.getElementById('basicPopup-root')
    );
}

export default BasicPopup;