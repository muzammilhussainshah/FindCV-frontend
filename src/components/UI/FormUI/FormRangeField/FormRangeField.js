import Slider from 'rc-slider';
import { useSelector } from 'react-redux';
import { handleRender } from './HandleTooltip';

import 'rc-slider/assets/index.css';
import styles from './FormRangeField.module.css';

function FormRangeField({ showTooltip = false, label, onFormikChange, onChange, ...props}) {
    const tDirection = useSelector((state) => state.translation.textDirection);

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
                <Slider 
                    onChange={handleChange} 
                    handleRender={showTooltip && handleRender}
                    reverse={tDirection === 'rtl'}
                    {...props} 
                />
            </div>
        </div>
    );
}

export default FormRangeField;