import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import styles from './FormRichTextField.module.css';

function FormRichTextField({ error, label, hasBorder, onChange, onFormikChange, children, ...props }) {

    const modules = {
        toolbar: [
          ['bold', 'italic', 'underline', 'link'],
          [{'list': 'ordered'}, {'list': 'bullet'}],
        ]
    };

    let wrapper_class = styles.wrapper;

    if (error) {
        wrapper_class += ' ' + styles.wrapper_error;
    }

    if (hasBorder) {
        wrapper_class += ' ' + styles.hasBorder;
    }

    if (hasBorder) {
        wrapper_class += ' ' + styles.hasBorder;
    }

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
            <div className={wrapper_class}>
                <ReactQuill theme="snow" modules={modules} onChange={handleChange} {...props} />
            </div>
            {error && <p className={styles.error}>{error}</p>}
        </div>
    );
}

export default FormRichTextField;