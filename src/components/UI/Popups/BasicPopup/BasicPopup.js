import ReactDOM from 'react-dom';
import styles from './BasicPopup.module.css';

function BasicPopup({ isOpen, children, ...props }) {

    if (!isOpen) {
        return null;
    }

    return ReactDOM.createPortal(
        <div className={styles.popupOverlay}>
            <div className={styles.popup}>
                {children}
            </div>
        </div>,
        document.getElementById('basicPopup-root')
    );
}

export default BasicPopup;