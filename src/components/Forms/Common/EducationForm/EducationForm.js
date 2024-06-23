import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import Yup from '../../../../utils/yupExtensions';

import { useGetEducationLevelsHook } from '../../../../utils/utilityHooks';

import FormField from '../../../UI/FormUI/FormField/FormField';
import FormSelectField from '../../../UI/FormUI/FormSelectField/FormSelectField';
import FormDateField from '../../../UI/FormUI/FormDateField/FormDateField';
import FormFileField from '../../../UI/FormUI/FormFileField/FormFileField';
import Button from '../../../UI/Buttons/Button/Button';

import styles from './EducationForm.module.css';

function EducationForm({ onSubmit, ...props }) {
    const { t } = useTranslation();

    const formik = useFormik({
        initialValues: {
            institution: '',
            education_level: '',
            startDate: '',
            endDate: '',
            diploma: ''
        },
        validationSchema: Yup.object({
            institution: Yup.string().required(t('forms.education.required')),
            education_level: Yup.string().required(t('forms.education.required')),
            startDate: Yup.string().required(t('forms.education.required')),
            endDate: Yup.string().required(t('forms.education.required')),
            diploma: Yup.mixed()
                .fileSize(1024 * 1024 * 5, t('forms.education.file_size_must_be_less_than_5MB'))
                .fileType([
                    'application/pdf', 
                    'application/msword', 
                    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                    'application/vnd.oasis.opendocument.text'
                ], t('forms.education.unsupported_file_format'))
                .required(t('forms.education.required'))
        }),
        onSubmit: values => {
            onSubmit({ 
                ...values,
                startDate: values.startDate.getFullYear(),
                endDate: values.endDate.getFullYear()
            });
        },
    });

    const educationLevels = useGetEducationLevelsHook();

    return (
        <form onSubmit={formik.handleSubmit} {...props}>
            <div>
                <FormField 
                    name="institution" 
                    type="text" 
                    placeholder={t('forms.education.name_of_university_or_college')}
                    hasBorder
                    onChange={formik.handleChange}
                    value={formik.values.institution}
                    error={formik.touched.institution && formik.errors.institution}
                />
            </div>
            <div>
                <FormSelectField 
                    name="education_level" 
                    type="default" 
                    placeholder={t('forms.education.education_level')}
                    hasBorder
                    options={educationLevels}
                    onFormikChange={formik.handleChange}
                    value={formik.values.education_level}
                    error={formik.touched.education_level && formik.errors.education_level}
                />
            </div>
            <div>
                <FormDateField 
                    name="startDate" 
                    placeholder={t('forms.education.date_of_enrollment')}
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
                    placeholder={t('forms.education.date_of_graduation')}
                    hasBorder
                    showYearPicker
                    dateFormat="yyyy"
                    onChange={formik.handleChange}
                    value={formik.values.endDate}
                    error={formik.touched.endDate && formik.errors.endDate}
                />
            </div>
            <div>
                <FormFileField 
                    name="diploma" 
                    type="file"
                    placeholder={t('forms.education.upload_diploma')}
                    hasBorder
                    accept=".pdf,.doc,.docx,.odt"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.diploma}
                    error={formik.touched.diploma && formik.errors.diploma}
                />
            </div>
            <div>
                <Button type="submit" className={styles.button}>{t('forms.education.add')}</Button>
            </div>
        </form>
    );
}

export default EducationForm;