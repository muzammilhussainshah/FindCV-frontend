import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import Yup from '../../../../utils/yupExtensions';

import FormField from '../../../UI/FormUI/FormField/FormField';
import FormDateField from '../../../UI/FormUI/FormDateField/FormDateField';
import FormSelectField from '../../../UI/FormUI/FormSelectField/FormSelectField';
import Button from '../../../UI/Buttons/Button/Button';

import styles from './WorkExperienceForm.module.css';

function WorkExperienceForm({ onSubmit, ...props }) {
    const { t } = useTranslation();

    const formik = useFormik({
        initialValues: {
            country: '',
            position: '',
            company: '',
            startDate: '',
            endDate: ''
        },
        validationSchema: Yup.object({
            country: Yup.string().required(t('forms.workExperience.required')),
            position: Yup.string().required(t('forms.workExperience.required')),
            startDate: Yup.string().required(t('forms.workExperience.required')),
            endDate: Yup.string().required(t('forms.workExperience.required')),
            company: Yup.string(),
        }),
        onSubmit: values => {
            onSubmit({ 
                ...values,
                startDate: values.startDate.getFullYear(),
                endDate: values.endDate.getFullYear()
            });
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} {...props}>
            <div>
                <FormField 
                    name="position" 
                    type="text" 
                    placeholder={t('forms.workExperience.working_position')}
                    hasBorder
                    onChange={formik.handleChange}
                    value={formik.values.position}
                    error={formik.touched.position && formik.errors.position}
                />
            </div>
            <div>
                <FormField 
                    name="company" 
                    type="text" 
                    placeholder={t('forms.workExperience.company_name_optional')}
                    hasBorder
                    onChange={formik.handleChange}
                    value={formik.values.company}
                    error={formik.touched.company && formik.errors.company}
                />
            </div>
            <div>
                <FormSelectField 
                    name="country" 
                    type="country" 
                    placeholder={t('forms.workExperience.select_country')}
                    hasBorder
                    onFormikChange={formik.handleChange}
                    value={formik.values.country}
                    error={formik.touched.country && formik.errors.country}
                />
            </div>
            <div>
                <FormDateField 
                    name="startDate" 
                    placeholder={t('forms.workExperience.start_date')}
                    hasBorder
                    showYearPicker
                    dateFormat="yyyy"
                    onChange={formik.handleChange}
                    value={formik.values.startDate}
                    error={formik.touched.startDate && formik.errors.startDate}
                />
            </div>
            <div>
                <FormDateField 
                    name="endDate" 
                    placeholder={t('forms.workExperience.end_date')}
                    hasBorder
                    showYearPicker
                    dateFormat="yyyy"
                    onChange={formik.handleChange}
                    value={formik.values.endDate}
                    error={formik.touched.endDate && formik.errors.endDate}
                />
            </div>
            <div>
                <Button type="submit" className={styles.button}>{t('forms.workExperience.add')}</Button>
            </div>
        </form>
    );
}

export default WorkExperienceForm;