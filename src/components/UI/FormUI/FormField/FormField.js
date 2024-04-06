import styles from './FormField.module.css';

function FormField({ error, label, hasBorder, children, ...props }) {

    let wrapper_class = styles.wrapper;

    if (error) {
        wrapper_class += ' ' + styles.wrapper_error;
    }

    if (props.type === 'password') {
        wrapper_class += ' ' + styles.password;
    }

    if (hasBorder) {
        wrapper_class += ' ' + styles.hasBorder;
    }

    return (
        <div className={styles.field}>
            {label && <label htmlFor={props.name}>{label}</label>}
            <div className={wrapper_class}><input {...props} /></div>
            {error && <p className={styles.error}>{error}</p>}
        </div>
    );
}

export default FormField;