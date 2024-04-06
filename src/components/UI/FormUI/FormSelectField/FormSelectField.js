import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import Select, { components } from 'react-select';
import Flag from 'react-flags';

import countryList from 'country-list';
import languageList from 'language-list';

import { formatLanguageCodeEmoji } from '../../../../utils/formatHelpers';

import styles from './FormSelectField.module.css';

function FormSelectField({ hasBorder, error, label, type, value, options, onFormikChange, onChange, children, ...props }) {
    const { t } = useTranslation();
    const countries = useMemo(() => countryList.getData(), []);
    const languages = useMemo(() => languageList().getData(), []);
    let selectOptions = [];

    if (type === 'country' || type === 'nationality') {
        selectOptions = countries.map(country => ({
                label: `${t('general.' + type + '.' + country.code)}`,
                value: country.code,
                flag: country.code
            }));
    }

    if (type === 'language') {
        selectOptions = languages
            .filter(language => {
                if (language.code) {
                    return formatLanguageCodeEmoji(language.code.toUpperCase());
                }
                else {
                    return false;
                }
            })
            .map(language => ({
                label: `${t('general.' + type + '.' + language.code.toUpperCase())}`,
                value: language.code,
                flag: formatLanguageCodeEmoji(language.code.toUpperCase())
            }));
        
        selectOptions.push({
            label: `${t('general.' + type + '.UK')}`,
            value: 'uk',
            flag: formatLanguageCodeEmoji('UK')
        });

        selectOptions = selectOptions.sort((a, b) => a.label.localeCompare(b.label));
    }

    if (type === 'default') {
        selectOptions = options.map(option => ({
            label: option.label,
            value: option.value
        }));
    }

    let wrapper_class = styles.wrapper;

    if (error) {
        wrapper_class += ' ' + styles.wrapper_error;
    }

    if (hasBorder) {
        wrapper_class += ' ' + styles.hasBorder;
    }

    const Input = ({ ...rest }) => <components.Input {...rest} autoComplete={'do-not-autofill'} />;

    const customSingleValue = ({ data }) => {

        if (type === 'country' || type === 'nationality' || type === 'language') {
            return (
                <div className="country-select">
                    <Flag 
                        name={data.flag}
                        format="svg"
                        shiny={false}
                        basePath="/vendor/flags"
                    />
                    {` ${data.label}`}
                </div>
            );
        }

        if (type === 'default') {
            return (
                <div className="default-select">{data.label}</div>
            );
        }

    }

    // Handler to adapt react-select's onChange event to Formik's expectations
    const handleChange = (selectedOption) => {

        if (onFormikChange) {
            onFormikChange({
                target: {
                    name: props.name,
                    value: selectedOption ? selectedOption.value : '',
                }
            });
        }
        else if (onChange) {
            onChange(selectedOption ? selectedOption.value : '');
        }

    }

    const filterByLabel = (option, inputValue) => {
        return option.data.label.toLowerCase().includes(inputValue.toLowerCase());
    }
      

    return (
        <div className={styles.field}>
            {label && <label htmlFor={props.name}>{label}</label>}
            <div className={wrapper_class}>
                <Select
                    classNamePrefix="react-select"
                    options={selectOptions}
                    value={selectOptions.find(option => option.value === value)}
                    filterOption={filterByLabel}
                    getOptionLabel={option => (
                        <div>
                            <Flag 
                                name={option.flag}
                                format="svg"
                                shiny={false}
                                basePath="/vendor/flags"
                            />
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