import { useMemo } from 'react';
import Select, { components } from 'react-select';
import countryList from 'country-list';

import styles from './FormSelectField.module.css';

function FormSelectField({ error, label, type, value, children, ...props }) {
    const countries = useMemo(() => countryList.getData(), []);
    let options = [];

    if (type === 'country') {

        options = countries.map(country => ({
            label: `${country.name}`,
            value: country.name,
            flag: country.code
        }));
    }

    let wrapper_class = styles.wrapper;

    if (error) {
        wrapper_class += ' ' + styles.wrapper_error;
    }

    const Input = ({ ...rest }) => <components.Input {...rest} autoComplete={'do-not-autofill'} />;

    const customSingleValue = ({ data }) => {

        if (type === 'country') {
            return (
                <div className="country-select">
                    <span>{data.flag ? String.fromCodePoint(...[...data.flag].map(c => 0x1f1a5 + c.charCodeAt())) : ''}</span> 
                    {` ${data.label}`}
                </div>
            );
        }

    }

    return (
        <div className={styles.field}>
            {label && <label htmlFor={props.name}>{label}</label>}
            <div className={wrapper_class}>
                <Select
                    classNamePrefix="react-select"
                    options={options}
                    value={options.find(option => option.value === value)}
                    getOptionLabel={option => (
                        <div>
                            <span>{option.flag ? String.fromCodePoint(...[...option.flag].map(c => 0x1f1a5 + c.charCodeAt())) : ''}</span>
                            {` ${option.label}`}
                        </div>
                    )}
                    components={{ 
                        SingleValue: customSingleValue,
                        Input: Input
                    }}
                    {...props}
                />
            </div>
            {error && <p className={styles.error}>{error}</p>}
        </div>
    );
}

export default FormSelectField;