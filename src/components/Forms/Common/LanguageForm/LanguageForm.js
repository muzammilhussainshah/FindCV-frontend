import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import FormSelectField from '../../../UI/FormUI/FormSelectField/FormSelectField';
import FormRangeField from '../../../UI/FormUI/FormRangeField/FormRangeField';
import Button from '../../../UI/Buttons/Button/Button';

import { getLanguageLevelName } from '../../../../utils/formatHelpers';

import styles from './LanguageForm.module.css';

function LanguageForm({ onSubmit, ...props }) {
    const [language, setLanguage] = useState('');
    const [languageLevel, setLanguageLevel] = useState(3);

    let languageLevelName = getLanguageLevelName(languageLevel);
    let languageLevelClass = styles['level_' + languageLevel];

    const handleSubmit = (e) => {
        e.preventDefault();

        onSubmit({ 
            languageCode: language.toUpperCase(),
            level: languageLevel 
        });
    }

    // REDO WITH FORMIK

    return (
        <form onSubmit={handleSubmit} {...props}>
            <div>
                <FormSelectField 
                    name="add_languages" 
                    type="language" 
                    placeholder="Select language"
                    hasBorder
                    required
                    onChange={(e) => setLanguage(e)}
                    value={language}
                />
            </div>
            <div>
                <FormRangeField 
                    min={1}
                    max={6}
                    value={languageLevel}
                    onChange={(e) => setLanguageLevel(e)}
                    dots
                />
            </div>
            <div>
                <p className={styles.levelText}>Language proficiency level: <span className={languageLevelClass}>{languageLevelName.name} ({languageLevelName.code})</span></p>
            </div>
            <div>
                <Button type="submit">Add</Button>
            </div>
        </form>
    );
}

export default LanguageForm;