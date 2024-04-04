import { useTranslation } from 'react-i18next';
import Flag from 'react-flags';

import styles from './WorkExperienceBlock.module.css';

function WorkExperienceBlock({ position, startDate, endDate, company, country, onRemove, ...props }) {
    const { t } = useTranslation();

    let elementClasses = [styles.WorkExperience];

    if (onRemove) {
        elementClasses.push(styles.removable);
    }

    return (
        <div className={elementClasses.join(' ')} {...props}>
            <p className={styles.head}>
                <span>{position}</span>
                <span>{startDate} - {endDate}</span>
            </p>
            {company && <p className={styles.body}>{company}</p>}
            <div className={styles.bottom}>
                <p>
                    <Flag 
                        name={country}
                        format="svg"
                        shiny={false}
                        basePath="/vendor/flags"
                    />
                    <span>{t('general.country.' + country)}</span>
                </p>
            </div>
            {onRemove && <span onClick={() => onRemove('workExperience', props.id)} className={styles.removeButton}></span>}
        </div>
    );
}

export default WorkExperienceBlock;