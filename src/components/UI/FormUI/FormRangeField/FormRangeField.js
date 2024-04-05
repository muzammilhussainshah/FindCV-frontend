import Slider from 'rc-slider';

import 'rc-slider/assets/index.css';
import styles from './FormRangeField.module.css';

function FormRangeField({ label, ...props}) {

    return (
        <div className={styles.field}>
            {label && <label htmlFor={props.name}>{label}</label>}
            <div className={styles.wrapper_class}>
                <Slider {...props} />
            </div>
        </div>
    );
}

export default FormRangeField;