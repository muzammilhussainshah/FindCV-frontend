import styles from './Subtitle.module.css';

function Subtitle({ dark, hasButton, buttonText, buttonOnClick, children, ...props }) {

    let darkClass = '';
    if (dark) {
        darkClass = styles.dark;
    }

    return (
        <div className={`${styles.subtitle} ${darkClass}`} {...props}>
            <h6>{children}</h6>
            <div>
                {hasButton && <span onClick={buttonOnClick} className={styles.button}>{buttonText}</span>}
            </div>
        </div>
    );
}

export default Subtitle;