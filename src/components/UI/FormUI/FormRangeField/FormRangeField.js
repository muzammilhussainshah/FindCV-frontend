import Slider from 'rc-slider';

import 'rc-slider/assets/index.css';
import styles from './FormRangeField.module.css';

function FormRangeField({ label, onFormikChange, onChange, ...props}) {

    const handleChange = (value) => {

        if (onFormikChange) {
            onFormikChange({
                target: {
                    name: props.name,
                    value: value,
                }
            });
        }
        else if (onChange) {
            onChange(value);
        }

    }

    return (
        <div className={styles.field}>
            {label && <label htmlFor={props.name}>{label}</label>}
            <div className={styles.wrapper_class}>
                <Slider onChange={handleChange} {...props} />
            </div>
        </div>
    );
}

export default FormRangeField;