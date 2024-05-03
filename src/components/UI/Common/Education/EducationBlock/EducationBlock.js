import styles from './EducationBlock.module.css';

function EducationBlock({ institution, isDark, startDate, endDate, diploma, onRemove, ...props }) {

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
                <span>{institution}</span>
                <span>{startDate} - {endDate}</span>
            </p>
            <div className={styles.bottom}>
                <p>{diploma.name}</p>
            </div>
            {onRemove && <span onClick={() => onRemove('education', props.id)} className={styles.removeButton}></span>}
        </div>
    );
}

export default EducationBlock;