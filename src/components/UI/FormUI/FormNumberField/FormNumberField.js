import styles from './FormNumberField.module.css';

function FormNumberField({ error, label, prefix, hasBorder, children, ...props }) {

    let wrapper_class = styles.wrapper;

    if (error) {
        wrapper_class += ' ' + styles.wrapper_error;
    }
    if (hasBorder) {
        wrapper_class += ' ' + styles.hasBorder;
    }

    const handlePlus = () => {
        props.onChange({ 
            target: { 
                name: props.name,
                value: parseInt(props.value) + 1 
            } 
        });
    }

    const handleMinus = () => {
        props.onChange({ 
            target: { 
                name: props.name,
                value: parseInt(props.value) - 1 
            } 
        });
    }

    const triggerFocus = () => {
        document.querySelector(`input[name="${props.name}"]`).focus();
    }

    return (
        <div className={styles.field}>
            {label && <label htmlFor={props.name}>{label}</label>}
            <div className={wrapper_class}>
                {prefix && <span onClick={triggerFocus} className={styles.prefix}>{prefix}</span>}
                <input type="number" {...props} />
                <div className={styles.buttons}>
                    <span onClick={handlePlus}></span>
                    <span onClick={handleMinus}></span>
                </div>
            </div>
            {error && <p className={styles.error}>{error}</p>}
        </div>
    );
}

export default FormNumberField;