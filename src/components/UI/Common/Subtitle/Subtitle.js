import styles from './Subtitle.module.css';

function Subtitle({ hasButton, buttonText, buttonOnClick, children, ...props }) {

    return (
        <div className={styles.subtitle} {...props}>
            <h6>{children}</h6>
            <div>
                {hasButton && <span onClick={buttonOnClick} className={styles.button}>{buttonText}</span>}
            </div>
        </div>
    );
}

export default Subtitle;