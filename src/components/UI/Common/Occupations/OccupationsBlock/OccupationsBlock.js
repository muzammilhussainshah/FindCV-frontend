import styles from './OccupationsBlock.module.css';

function OccupationsBlock({ name, isDark, onRemove, ...props }) {

    let elementClasses = [styles.occupation];

    if (onRemove) {
        elementClasses.push(styles.removable);
    }

    if (isDark) {
        elementClasses.push(styles.dark);
    }

    return (
        <div className={elementClasses.join(' ')} {...props}>
            <p>{name}</p>
            {onRemove && <span onClick={() => onRemove('occupations', props.id)} className={styles.removeButton}></span>}
        </div>
    );
}

export default OccupationsBlock;