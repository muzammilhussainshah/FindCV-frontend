import { useDispatch, useSelector } from 'react-redux';
import Select, { components } from 'react-select';

import { setLanguage } from '../../app/features/translationSlice';

import styles from './LanguageSwitch.module.css';

function LanguageSwitch() {
    const dispatch = useDispatch();
    const language = useSelector((state) => state.translation.language);

    let options = [];

    options = [
        { label: 'English', value: 'en', flag: 'GB' },
        { label: 'العربية', value: 'ar', flag: 'SA' }
    ];

    const Input = ({ ...rest }) => <components.Input {...rest} autoComplete={'do-not-autofill'} />;

    const customSingleValue = ({ data }) => {

        return (
            <div className="language-select">
                <span>{data.flag ? String.fromCodePoint(...[...data.flag].map(c => 0x1f1a5 + c.charCodeAt())) : ''}</span> 
                {` ${data.label}`}
            </div>
        );

    }

    const handleChange = (payload) => {

        if (payload.value === language) {
            return;
        }

        if (payload.value === 'en') {
            dispatch(setLanguage('en'));
        }
        else if (payload.value === 'ar') {
            dispatch(setLanguage('ar'));
        }

    }

    return (
        <Select 
            className={styles.languageSwitch}
            classNamePrefix="react-language-select"
            options={options}
            value={options.find(option => option.value === language)}
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
        />
    );
}

export default LanguageSwitch;