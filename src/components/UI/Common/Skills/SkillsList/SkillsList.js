import { useTranslation } from 'react-i18next';

import SkillsBlock from '../SkillsBlock/SkillsBlock';

import styles from './SkillsList.module.css';

function SkillsList({ children, isDark, skills, onRemove, ...props }) {
    const { t } = useTranslation();

    return (
        <div {...props} className={styles.list}>
            {skills && skills.map((single) => (
                <SkillsBlock
                    key={single.id}
                    id={single.id}
                    isDark={isDark}
                    name={t('general.skill.' + single.code)}
                    onRemove={onRemove}
                />
            ))}
        </div>
    );
}

export default SkillsList;