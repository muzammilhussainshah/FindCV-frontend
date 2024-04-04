import SkillsBlock from '../SkillsBlock/SkillsBlock';

import styles from './SkillsList.module.css';

function SkillsList({ children, skills, onRemove, ...props }) {

    return (
        <div {...props} className={styles.list}>
            {skills && skills.map((single) => (
                <SkillsBlock
                    key={single.id}
                    id={single.id}
                    name={single.name}
                    onRemove={onRemove}
                />
            ))}
        </div>
    );
}

export default SkillsList;