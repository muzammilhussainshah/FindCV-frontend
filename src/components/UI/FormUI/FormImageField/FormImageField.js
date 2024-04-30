import styles from './FormImageField.module.css';

function FormImageField({ error, label, value, placeholder, onChange, className = '', children, ...props }) {
    let wrapper_class = styles.wrapper;
    let imageURL = value ? URL.createObjectURL(value) : placeholder ? placeholder : null;

    if (error) {
        wrapper_class += ' ' + styles.wrapper_error;
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
        <div className={`${styles.field} ${className}`}>
            {label && <label htmlFor={props.name}>{label}</label>}
            <div className={wrapper_class}>
                {imageURL && <img src={imageURL} alt="Preview" />}
                <input onChange={handleChange} {...props} />
            </div>
            {error && <p className={styles.error}>{error}</p>}
        </div>
    );
}

export default FormImageField;