import { useState, useEffect, useCallback } from 'react';
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

    const createValidationSchema = useCallback((education_level) => {
        if (education_level === 'no_formal_education') {
            return Yup.object({
                institution: Yup.string(),
                education_level: Yup.string().required(t('forms.education.required')),
                startDate: Yup.string(),
                endDate: Yup.string(),
                diploma: Yup.mixed()
                    .fileSize(1024 * 1024 * 5, t('forms.education.file_size_must_be_less_than_5MB'))
                    .fileType([
                        'application/pdf',
                        'application/msword',
                        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                        'application/vnd.oasis.opendocument.text'
                    ], t('forms.education.unsupported_file_format'))
            });
        } else {
            return Yup.object({
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
            });
        }
    }, [t]);

    const [validationSchema, setValidationSchema] = useState(createValidationSchema(''));

    const formik = useFormik({
        initialValues: {
            institution: '',
            education_level: '',
            startDate: '',
            endDate: '',
            diploma: ''
        },
        validationSchema: validationSchema,
        onSubmit: values => {
            onSubmit({ 
                ...values,
                startDate: values.startDate !== '' ? values.startDate.getFullYear() : 0,
                endDate: values.endDate !== '' ? values.endDate.getFullYear() : 0
            });
        },
    });

    const educationLevels = useGetEducationLevelsHook();

    // Update the validation schema dynamically based on the `education_level` field
    useEffect(() => {
        setValidationSchema(createValidationSchema(formik.values.education_level));
    }, [formik.values.education_level, createValidationSchema]);

    return (
        <form onSubmit={formik.handleSubmit} {...props}>
            <div>
                <FormField 
                    name="institution" 
                    type="text" 
                    placeholder={
                        formik.values.education_level === 'no_formal_education' ?
                        t('forms.education.name_of_university_or_college').replace('*', '') :
                        t('forms.education.name_of_university_or_college')
                    }
                    hasBorder
                    onChange={formik.handleChange}
                    value={formik.values.institution}
                    error={(formik.values.education_level !== 'no_formal_education' && formik.touched.institution) && formik.errors.institution}
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
                    placeholder={
                        formik.values.education_level === 'no_formal_education' ?
                        t('forms.education.date_of_enrollment').replace('*', '') :
                        t('forms.education.date_of_enrollment')
                    }
                    hasBorder
                    showYearPicker
                    dateFormat="yyyy"
                    onChange={formik.handleChange}
                    value={formik.values.startDate}
                    error={(formik.values.education_level !== 'no_formal_education' && formik.touched.startDate) && formik.errors.startDate}
                />
            </div>
            <div>
                <FormDateField 
                    name="endDate" 
                    placeholder={
                        formik.values.education_level === 'no_formal_education' ?
                        t('forms.education.date_of_graduation').replace('*', '') :
                        t('forms.education.date_of_graduation')
                    }
                    hasBorder
                    showYearPicker
                    dateFormat="yyyy"
                    onChange={formik.handleChange}
                    value={formik.values.endDate}
                    error={(formik.values.education_level !== 'no_formal_education' && formik.touched.endDate) && formik.errors.endDate}
                />
            </div>
            <div>
                <FormFileField 
                    name="diploma" 
                    type="file"
                    placeholder={
                        formik.values.education_level === 'no_formal_education' ?
                        t('forms.education.upload_diploma').replace('*', '') :
                        t('forms.education.upload_diploma')
                    }
                    hasBorder
                    accept=".pdf,.doc,.docx,.odt"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.diploma}
                    error={(formik.values.education_level !== 'no_formal_education' && formik.touched.diploma) && formik.errors.diploma}
                />
            </div>
            <div>
                <Button type="submit" className={styles.button}>{t('forms.education.add')}</Button>
            </div>
        </form>
    );
}

export default EducationForm;