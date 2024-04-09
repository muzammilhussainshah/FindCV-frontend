import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import Yup from '../../../../utils/yupExtensions';

import FormSelectField from '../../../UI/FormUI/FormSelectField/FormSelectField';
import Button from '../../../UI/Buttons/Button/Button';

import { useGetSkillsHook } from '../../../../utils/utilityHooks';

import styles from './SkillsForm.module.css';

function SkillsForm({ onSubmit, excludeSkills, ...props }) {
    const { t } = useTranslation();

    const formik = useFormik({
        initialValues: {
            skills: []
        },
        validationSchema: Yup.object({
            skills: Yup.array().min(1, t('forms.skills.required'))
        }),
        onSubmit: values => {
            onSubmit(values);
        },
    });

    let options = useGetSkillsHook();

    if (excludeSkills) {
        options = options.filter(option => !excludeSkills.includes(option.value));
    }

    const handleSkillsChange = (value) => {
        formik.setFieldValue('skills', value);
    }

    return (
        <form onSubmit={formik.handleSubmit} {...props}>
            <div>
                <FormSelectField
                    name="skills" 
                    type="default"
                    placeholder={t('forms.skills.your_skills')}
                    isMulti
                    hasBorder
                    options={options}
                    onChange={handleSkillsChange}
                    value={formik.values.skills}
                    error={formik.touched.skills && formik.errors.skills}
                />
            </div>
            <div>
                <Button type="submit" className={styles.button}>{t('forms.skills.add')}</Button>
            </div>
        </form>
    );
}

export default SkillsForm;