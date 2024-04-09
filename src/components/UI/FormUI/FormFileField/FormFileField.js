import styles from './FormFileField.module.css';

function FormFileField({ error, label, value, onChange, hasBorder, children, ...props }) {
    let placeholder = props.placeholder;
    let wrapper_class = styles.wrapper;

    if (value) {
        placeholder = value.name;
    }

    if (error) {
        wrapper_class += ' ' + styles.wrapper_error;
    }

    if (hasBorder) {
        wrapper_class += ' ' + styles.hasBorder;
    }

    const handleChange = (e) => {
        onChange({
            target: {
                name: props.name,
                value: e.target.files ? e.target.files[0] : null,
            }
        });
    };

    return (
        <div className={styles.field}>
            {label && <label htmlFor={props.name}>{label}</label>}
            <div className={wrapper_class}>
                <span>{placeholder}</span>
                <input onChange={handleChange} {...props} />
            </div>
            {error && <p className={styles.error}>{error}</p>}
        </div>
    );
}

export default FormFileField;