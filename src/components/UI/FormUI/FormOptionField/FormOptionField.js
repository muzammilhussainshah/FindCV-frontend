import styles from './FormOptionField.module.css';

function FormOptionField({ options, error, label, dark, onePerLine, children, ...props }) {

    let wrapper_class = styles.wrapper;

    if (error) {
        wrapper_class += ' ' + styles.wrapper_error;
    }

    if (onePerLine) {
        wrapper_class += ' ' + styles.wrapper_onePerLine;
    }

    if (dark) {
        wrapper_class += ' ' + styles.wrapper_dark;
    }

    if (props.type === 'checkbox') {
        wrapper_class += ' ' + styles.wrapper_checkbox;
    }

    return (
        <div className={styles.field}>
            {label && <p className={styles.label}>{label}</p>}
            <div className={wrapper_class}>
                {options && options.map(option => (
                    <label key={option.value} className={styles.option}>
                        <input {...props} value={option.value} checked={props.value === option.value} />
                        <span>{option.label}</span>
                    </label>
                ))}
            </div>
            {error && <p className={styles.error}>{error}</p>}
        </div>
    );
}

export default FormOptionField;