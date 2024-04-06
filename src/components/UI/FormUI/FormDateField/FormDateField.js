import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import styles from './FormDateField.module.css';

function FormDateField({ error, label, value, placeholder, showYearPicker, hasBorder, onChange, ...props }) {

    let wrapper_class = styles.wrapper;

    if (error) {
        wrapper_class += ' ' + styles.wrapper_error;
    }

    if (hasBorder) {
        wrapper_class += ' ' + styles.hasBorder;
    }

    if (showYearPicker) {
        wrapper_class += ' ' + styles.yearPicker;
    }

    // Handler to adapt react-select's onChange event to Formik's expectations
    const handleChange = (value) => {
        onChange({
            target: {
                name: props.name,
                value: value
            }
        });
    };

    return (
        <div className={styles.field}>
            {label && <label htmlFor={props.name}>{label}</label>}
            <div className={wrapper_class}>
                <DatePicker
                    selected={value}
                    dateFormat="dd/MM/yyyy"
                    showYearDropdown
                    showYearPicker={showYearPicker}
                    scrollableMonthYearDropdown
                    onChange={handleChange}
                    placeholderText={placeholder}
                    autoComplete='off'
                    role="presentation"
                    {...props}
                />
            </div>
            {error && <p className={styles.error}>{error}</p>}
        </div>
    );
}

export default FormDateField;