import { useTranslation } from 'react-i18next';

import OccupationsBlock from '../OccupationsBlock/OccupationsBlock';

import styles from './OccupationsList.module.css';

function OccupationsList({ children, isDark, occupations, onRemove, ...props }) {
    const { t } = useTranslation();

    return (
        <div {...props} className={styles.list}>
            {occupations && occupations.map((single) => (
                <OccupationsBlock
                    key={single.id}
                    id={single.id}
                    isDark={isDark}
                    name={t('general.job_category.' + single.occupation_code)}
                    onRemove={onRemove}
                />
            ))}
        </div>
    );
}

export default OccupationsList;