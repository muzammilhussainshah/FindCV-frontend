import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import Select, { components } from 'react-select';
import countryList from 'country-list';

import styles from './FormSelectField.module.css';

function FormSelectField({ error, label, type, value, onChange, children, ...props }) {
    const { t } = useTranslation();
    const countries = useMemo(() => countryList.getData(), []);
    let options = [];

    if (type === 'country' || type === 'nationality') {
        options = countries.map(country => ({
            label: `${t('general.' + type + '.' + country.code)}`,
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

        if (type === 'country' || type === 'nationality') {
            return (
                <div className="country-select">
                    <span>{data.flag ? String.fromCodePoint(...[...data.flag].map(c => 0x1f1a5 + c.charCodeAt())) : ''}</span> 
                    {` ${data.label}`}
                </div>
            );
        }

    }

    // Handler to adapt react-select's onChange event to Formik's expectations
    const handleChange = (selectedOption) => {
        onChange({
            target: {
                name: props.name,
                value: selectedOption ? selectedOption.value : '',
            }
        });
    };

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
                    onChange={handleChange}
                    {...props}
                />
            </div>
            {error && <p className={styles.error}>{error}</p>}
        </div>
    );
}

export default FormSelectField;