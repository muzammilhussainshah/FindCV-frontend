import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import Yup from '../../../../utils/yupExtensions';

import FormSelectField from '../../../UI/FormUI/FormSelectField/FormSelectField';
import FormRangeField from '../../../UI/FormUI/FormRangeField/FormRangeField';
import Button from '../../../UI/Buttons/Button/Button';

import { getLanguageLevelCode } from '../../../../utils/formatHelpers';

import styles from './LanguageForm.module.css';

function LanguageForm({ onSubmit, ...props }) {
    const { t } = useTranslation();
    const tDirection = useSelector((state) => state.translation.textDirection);

    const formik = useFormik({
        initialValues: {
            language: '',
            languageLevel: 3
        },
        validationSchema: Yup.object({
            language: Yup.string().required(t('forms.language.required'))
        }),
        onSubmit: values => {
            onSubmit({ 
                languageCode: values.language.toUpperCase(),
                level: values.languageLevel 
            });
        },
    });

    let languageRangeReverse = tDirection === 'ltr' ? false : true;
    let languageLevelCode = getLanguageLevelCode(formik.values.languageLevel);
    let languageLevelClass = styles['level_' + formik.values.languageLevel];

    return (
        <form onSubmit={formik.handleSubmit} {...props}>
            <div>
                <FormSelectField 
                    name="language" 
                    type="language" 
                    placeholder={t('forms.language.select_language')}
                    hasBorder
                    onFormikChange={formik.handleChange}
                    value={formik.values.language}
                    error={formik.touched.language && formik.errors.language}
                />
            </div>
            <div>
                <FormRangeField 
                    name="languageLevel" 
                    min={1}
                    max={6}
                    value={formik.values.languageLevel}
                    onFormikChange={formik.handleChange}
                    dots
                    reverse={languageRangeReverse}
                />
            </div>
            <div>
                <p className={styles.levelText}>{t('forms.language.language_proficiency_level')} <span className={languageLevelClass}>{t('forms.language.' + languageLevelCode)} ({languageLevelCode})</span></p>
            </div>
            <div>
                <Button type="submit" className={styles.button}>{t('forms.language.add')}</Button>
            </div>
        </form>
    );
}

export default LanguageForm;