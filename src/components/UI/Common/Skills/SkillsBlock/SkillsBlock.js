import styles from './SkillsBlock.module.css';

function SkillsBlock({ name, isDark, onRemove, ...props }) {

    let elementClasses = [styles.skill];

    if (onRemove) {
        elementClasses.push(styles.removable);
    }

    if (isDark) {
        elementClasses.push(styles.dark);
    }

    return (
        <div className={elementClasses.join(' ')} {...props}>
            <p>{name}</p>
            {onRemove && <span onClick={() => onRemove('skills', props.id)} className={styles.removeButton}></span>}
        </div>
    );
}

export default SkillsBlock;