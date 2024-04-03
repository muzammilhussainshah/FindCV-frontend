import styles from './LanguageLevel.module.css';

function LanguageLevel({ languageCode, level, removable, ...props }) {
    let levelBars = <div className={styles.languageLevel}>
        {level && [...Array(5)].map((_, i) => <span key={i} className={i <= level ? styles.active : ''} />)}
    </div>;

    let elementClasses = [styles.languageBar];

    if (removable) {
        elementClasses.push(styles.removable);
    }

    return (
        <div className={elementClasses.join(' ')} {...props}>
            <div>
                <span>{languageCode ? String.fromCodePoint(...[...languageCode].map(c => 0x1f1a5 + c.charCodeAt())) : ''}</span>
                <span>English</span>
            </div>
            <div>
                {levelBars}
                {removable && <button className={styles.removeButton}></button>}
            </div>
        </div>
    );
}

export default LanguageLevel;