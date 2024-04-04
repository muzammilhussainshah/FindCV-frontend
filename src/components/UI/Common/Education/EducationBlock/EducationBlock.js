import styles from './EducationBlock.module.css';

function EducationBlock({ institution, startDate, endDate, onRemove, ...props }) {

    let elementClasses = [styles.education];

    if (onRemove) {
        elementClasses.push(styles.removable);
    }

    return (
        <div className={elementClasses.join(' ')} {...props}>
            <p className={styles.head}>
                <span>{institution}</span>
                <span>{startDate} - {endDate}</span>
            </p>
            <div className={styles.bottom}>
                <p>myDiploma.pdf</p>
            </div>
            {onRemove && <span onClick={() => onRemove('education', props.id)} className={styles.removeButton}></span>}
        </div>
    );
}

export default EducationBlock;