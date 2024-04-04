import styles from './SkillsBlock.module.css';

function SkillsBlock({ name, onRemove, ...props }) {

    let elementClasses = [styles.skill];

    if (onRemove) {
        elementClasses.push(styles.removable);
    }

    return (
        <div className={elementClasses.join(' ')} {...props}>
            <p>{name}</p>
            {onRemove && <span onClick={() => onRemove('skills', props.id)} className={styles.removeButton}></span>}
        </div>
    );
}

export default SkillsBlock;