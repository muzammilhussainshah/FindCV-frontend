import { useTranslation } from 'react-i18next';
import styles from './EducationBlock.module.css';

function EducationBlock({ institution, isDark, enableLinks, startDate, endDate, diploma, onRemove, ...props }) {
    const { t } = useTranslation();

    let elementClasses = [styles.education];

    if (onRemove) {
        elementClasses.push(styles.removable);
    }

    if (isDark) {
        elementClasses.push(styles.dark);
    }

    return (
        <div className={elementClasses.join(' ')} {...props}>
            <p className={styles.head}>
                {institution ? <span>{institution}</span> : <span>{t('general.education_levels.no_formal_education')}</span>}
                {(startDate !== 0 && endDate !== 0) && <span>{startDate} - {endDate}</span>}
            </p>
            {(diploma && diploma?.name !== '') && 
                <div className={styles.bottom}>
                    {enableLinks && <a href={process.env.REACT_APP_UPLOADS_PATH + diploma.name} target="_blank" rel="noreferrer">{diploma.name}</a>}
                    {!enableLinks && <p>{diploma.name}</p>}
                </div>
            }
            {onRemove && <span onClick={() => onRemove('education', props.id)} className={styles.removeButton}></span>}
        </div>
    );
}

export default EducationBlock;