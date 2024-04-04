import { useTranslation } from 'react-i18next';
import Flag from 'react-flags';

import styles from './LanguageLevelBar.module.css';

function LanguageLevelBar({ languageCode, level, onRemove, ...props }) {
    const { t } = useTranslation();

    let levelBars = <div className={styles.languageLevel}>
        {level && [...Array(5)].map((_, i) => <span key={i} className={i < level ? styles.active : ''} />)}
    </div>;

    let elementClasses = [styles.languageBar];

    if (onRemove) {
        elementClasses.push(styles.removable);
    }

    return (
        <div className={elementClasses.join(' ')} {...props}>
            <div>
                <Flag 
                    name={languageCode}
                    format="svg"
                    shiny={false}
                    basePath="/vendor/flags"
                />
                <span>{t('general.languages.' + languageCode)}</span>
            </div>
            <div>
                {levelBars}
                {onRemove && <span onClick={() => onRemove('languages', props.id)} className={styles.removeButton}></span>}
            </div>
        </div>
    );
}

export default LanguageLevelBar;