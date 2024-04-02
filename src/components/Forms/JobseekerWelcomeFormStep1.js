import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import Yup from '../../utils/yupExtensions';
import toast from 'react-hot-toast';
import { getCode } from 'country-list';

import { fetchUserByToken } from '../../app/features/userSlice';
import { updateUser } from '../../services/userService';

import FormField from '../FormField/FormField';
import FormFileField from '../FormFileField/FormFileField';
import FormImageField from '../FormImageField/FormImageField';
import FormSelectField from '../FormSelectField/FormSelectField';
import FormDateField from '../FormDateField/FormDateField';
import Button from '../Buttons/Button/Button';

function JobseekerWelcomeFormStep1(props) {
    const { t } = useTranslation();
    const [formLoading, setFormLoading] = useState(false);
    const dispatch = useDispatch();
    const userToken = useSelector(state => state.user.token);

    const formik = useFormik({
        initialValues: {
            full_name: '',
            nationality: '',
            country: '',
            gender: '',
            birthdate: '',
            cv_file: '',
            cv_ref_letter: '',
            profile_image: '',
        },
        validationSchema: Yup.object({
            full_name: Yup.string().required(t('forms.welcome_job_seeker.step_1.required')),
            nationality: Yup.string().required(t('forms.welcome_job_seeker.step_1.required')),
            country: Yup.string().required(t('forms.welcome_job_seeker.step_1.required')),
            gender: Yup.string().required(t('forms.welcome_job_seeker.step_1.required')),
            birthdate: Yup.string().required(t('forms.welcome_job_seeker.step_1.required')),
            cv_file: Yup.mixed()
                .fileSize(1024 * 1024 * 5, t('forms.welcome_job_seeker.step_1.file_size_must_be_less_than_5MB'))
                .fileType([
                    'application/pdf', 
                    'application/msword', 
                    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                    'application/vnd.oasis.opendocument.text'
                ], t('forms.welcome_job_seeker.step_1.unsupported_file_format')),
            cv_ref_letter: Yup.mixed()
                .fileSize(1024 * 1024 * 5, t('forms.welcome_job_seeker.step_1.file_size_must_be_less_than_5MB'))
                .fileType([
                    'application/pdf', 
                    'application/msword', 
                    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                    'application/vnd.oasis.opendocument.text'
                ], t('forms.welcome_job_seeker.step_1.unsupported_file_format')),
            profile_image: Yup.mixed()
                .fileSize(1024 * 1024 * 5, t('forms.welcome_job_seeker.step_1.file_size_must_be_less_than_5MB'))
                .fileType(['image/jpeg', 'image/png'], t('forms.welcome_job_seeker.step_1.unsupported_file_format'))
        }),
        onSubmit: values => {

            if (formLoading) {
                return;
            }

            setFormLoading(true);

            const formData = new FormData();
            formData.append('full_name', values.full_name);
            formData.append('nationality', (values.nationality));
            formData.append('country', getCode(values.country));
            formData.append('gender', values.gender);
            formData.append('birthdate', values.birthdate);
            formData.append('cv_file', values.cv_file);
            formData.append('cv_ref_letter', values.cv_ref_letter);
            formData.append('profile_image', values.profile_image);

            toast.promise(updateUser(formData, userToken), {
                loading: 'updateUser',
                success: <b>updateUser</b>,
                error: (err) => {
                    return <b>{err.response.data.error}</b>;
                },
            })
            .then(() => {
                toast.promise(dispatch(fetchUserByToken(userToken)), {
                    loading: 'fetchUserByToken',
                    success: <b>fetchUserByToken</b>,
                    error: (err) => {
                        return <b>{err.response.data.error}</b>;
                    },
                });
            })
            .catch((error) => {
                
                if (error.response.data.field) {
                    formik.setErrors({
                        [error.response.data.field]: error.response.data.error
                    });
                }

                setFormLoading(false);

            });
        },
    });

    const genderOptions = [
        { value: 'male', label: t('forms.welcome_job_seeker.step_1.male') },
        { value: 'female', label: t('forms.welcome_job_seeker.step_1.female') }
    ];

    return (
        <form onSubmit={formik.handleSubmit} {...props}>
            <div>
                <FormField 
                    name="full_name" 
                    type="text" 
                    placeholder={t('forms.welcome_job_seeker.step_1.full_name')}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.full_name}
                    error={formik.touched.full_name && formik.errors.full_name}
                />
            </div>
            <div>
                <FormSelectField
                    name="nationality" 
                    type="nationality" 
                    placeholder={t('forms.welcome_job_seeker.step_1.nationality')}
                    onChange={formik.handleChange}
                    value={formik.values.nationality}
                    error={formik.touched.nationality && formik.errors.nationality}
                />
            </div>
            <div>
                <FormSelectField
                    name="country" 
                    type="country" 
                    placeholder={t('forms.welcome_job_seeker.step_1.country_of_current_residence')}
                    onChange={formik.handleChange}
                    value={formik.values.country}
                    error={formik.touched.country && formik.errors.country}
                />
            </div>
            <div>
                <FormSelectField
                    name="gender" 
                    type="default" 
                    placeholder={t('forms.welcome_job_seeker.step_1.gender')}
                    options={genderOptions}
                    onChange={formik.handleChange}
                    value={formik.values.gender}
                    error={formik.touched.gender && formik.errors.gender}
                />
            </div>
            <div>
                <FormDateField
                    name="birthdate" 
                    type="date" 
                    placeholder={t('forms.welcome_job_seeker.step_1.birth_date')}
                    onChange={formik.handleChange}
                    value={formik.values.birthdate}
                    error={formik.touched.birthdate && formik.errors.birthdate}
                />
            </div>
            <div>
                <FormFileField 
                    name="cv_file" 
                    type="file" 
                    placeholder={t('forms.welcome_job_seeker.step_1.cv')}
                    accept=".pdf,.doc,.docx,.odt"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.cv_file}
                    error={formik.touched.cv_file && formik.errors.cv_file}
                />
            </div>
            <div>
                <FormFileField 
                    name="cv_ref_letter" 
                    type="file" 
                    placeholder={t('forms.welcome_job_seeker.step_1.reference_letter')}
                    accept=".pdf,.doc,.docx,.odt"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.cv_ref_letter}
                    error={formik.touched.cv_ref_letter && formik.errors.cv_ref_letter}
                />
            </div>
            <div>
                <FormImageField 
                    name="profile_image" 
                    type="file"
                    label={t('forms.welcome_job_seeker.step_1.profile_picture')}
                    accept="image/jpeg, image/png"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.profile_image}
                    error={formik.touched.profile_image && formik.errors.profile_image}
                />
            </div>
            <Button type="submit" style={{display: 'block'}}>
                {formLoading ? t('forms.welcome_job_seeker.step_1.please_wait') : t('forms.welcome_job_seeker.step_1.proceed')}
            </Button>
        </form>
    );
}

export default JobseekerWelcomeFormStep1;