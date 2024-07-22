import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import Yup from '../../../../utils/yupExtensions';
import toast from 'react-hot-toast';

import { updateUser } from '../../../../services/userService';
import { fetchUserByToken } from '../../../../app/features/userSlice';
import { useGetCompanyIndustriesHook, useGetCities } from '../../../../utils/utilityHooks';

import FormField from '../../../../components/UI/FormUI/FormField/FormField';
import FormSelectField from '../../../../components/UI/FormUI/FormSelectField/FormSelectField';
import FormOptionField from '../../../../components/UI/FormUI/FormOptionField/FormOptionField';
import FormImageField from '../../../../components/UI/FormUI/FormImageField/FormImageField';
import Button from '../../../../components/UI/Buttons/Button/Button';
import Subtitle from '../../../../components/UI/Common/Subtitle/Subtitle'

import styles from './Form.module.css';

import user_image_placeholder from '../../../../assets/images/other/user_image_placeholder.svg';

function EmployerForm({user}) {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const userToken = useSelector(state => state.user.token);
    const [formLoading, setFormLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            name: user.name,
            email: user.email,
            country: user.country,
            city: user.city,
            employer_status: user.employer_status,
            company_name: user.company_name,
            company_size: user.company_size,
            company_website: user.company_website,
            company_industries: user.company_industries ? user.company_industries.split(';').map(item => item.trim()) : [],
            nationality: user.nationality,
            password: '',
            password_repeat: '',
            profile_image: ''
        },
        validationSchema: Yup.object({
            name: Yup.string().required(t('general.UI.required')),
            country: Yup.string().required(t('general.UI.required')),
            city: Yup.string().required(t('general.UI.required')),
            email: Yup.string().email(t('forms.create_account.invalid_email_address')).required(t('general.UI.required')),
            company_name: Yup.string().when('employer_status', {
                is: 'business',
                then: schema => schema.required(t('general.UI.required')),
                otherwise: schema => schema.notRequired()
            }),
            nationality: Yup.string().when('employer_status', {
                is: 'individual',
                then: schema => schema.required(t('forms.welcome_employer.required')),
                otherwise: schema => schema.notRequired()
            }),
            password: Yup.string().min(8, t('forms.create_account.must_be_at_least_8_characters')),
            password_repeat: Yup.string().when('password', {
                is: val => (val && val.length > 0 ? true : false),
                then: schema => schema.oneOf([Yup.ref('password'), null], t('forms.create_account.passwords_must_match')).required(t('forms.create_account.required')),
                otherwise: schema => schema.notRequired()
            }),
            profile_image: Yup.mixed()
                .fileSize(1024 * 1024 * 5, t('forms.welcome_job_seeker.step_1.file_size_must_be_less_than_5MB'))
                .fileType(['image/jpg', 'image/jpeg', 'image/png'], t('forms.welcome_job_seeker.step_1.unsupported_file_format'))
        }),
        onSubmit: values => {

            if (formLoading) {
                return;
            }

            setFormLoading(true);

            const formData = new FormData();
            formData.append('token', userToken);

            if (values.profile_image && values.profile_image !== '') {
                formData.append('profile_image', values.profile_image);
            }

            formData.append('name', values.name);
            formData.append('city', values.city);
            formData.append('country', values.country);
            formData.append('employer_status', values.employer_status);

            if (values.employer_status === 'individual') {
                formData.append('nationality', values.nationality);
                formData.append('company_name', '');
                formData.append('company_size', '');
                formData.append('company_website', '');
                formData.append('company_industries', '');
            }
            else {
                formData.append('company_name', values.company_name);
                formData.append('company_size', values.company_size);
                formData.append('company_website', values.company_website);
                formData.append('company_industries', values.company_industries.join(';'));
                formData.append('nationality', '');
            }

            if (values.password) {
                formData.append('password', values.password);
            }

            toast.promise(updateUser(formData), {
                loading: t('edit_profile.updating_profile'),
                success: <b>{t('edit_profile.profile_updated')}</b>,
                error: (err) => {
                    return <b>{err.response.data.error}</b>;
                },
            })
            .then(() => {
                dispatch(fetchUserByToken(userToken));
            })
            .then(() => {
                setFormLoading(false);
            })
            .catch((error) => {
                
                if (error?.response?.data?.field) {
                    formik.setErrors({
                        [error.response.data.field]: error.response.data.error
                    });
                }

                setFormLoading(false);

            });

        },
    });

    const handleCompanyIndustriesChange = (value) => {
        formik.setFieldValue('company_industries', value);
    }

    const employerStatusOptions = [
        { value: 'business', label: t('edit_profile.employer.business') },
        { value: 'individual', label: t('edit_profile.employer.individual') }
    ];
    const companySizeOptions = [
        { value: '1 - 10', label: '1 - 10' },
        { value: '10 - 100', label: '10 - 100' },
        { value: '100 - 1000', label: '100 - 1000' },
        { value: '1000+', label: '1000+' },
    ];
    const companyIndustriesOptions = useGetCompanyIndustriesHook();
    const citiesOptions = useGetCities(formik.values.country);

    let conditionalFields = '';

    if (formik.values.employer_status === 'business') {

        conditionalFields = (
            <>
                <div>
                    <FormField 
                        name="company_name" 
                        type="text" 
                        label={t('edit_profile.employer.company_name')}
                        hasBorder
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.company_name}
                        error={formik.touched.company_name && formik.errors.company_name}
                    />
                </div>
                <div>
                    <FormField 
                        name="company_website" 
                        type="text" 
                        label={t('edit_profile.employer.company_website')}
                        hasBorder
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.company_website}
                        error={formik.touched.company_website && formik.errors.company_website}
                    />
                </div>
                <div>
                    <FormSelectField
                        name="company_industries"
                        label={t('edit_profile.employer.company_industries')}
                        type="default"
                        hasBorder
                        isMulti
                        options={companyIndustriesOptions}
                        onChange={handleCompanyIndustriesChange}
                        value={formik.values.company_industries}
                        error={formik.touched.company_industries && formik.errors.company_industries}
                    />
                </div>
                <div>
                    <FormSelectField
                        name="company_size"
                        label={t('edit_profile.employer.company_size')}
                        type="default"
                        hasBorder
                        options={companySizeOptions}
                        onFormikChange={formik.handleChange}
                        value={formik.values.company_size}
                        error={formik.touched.company_size && formik.errors.company_size}
                    />
                </div>
            </>
        );
    }
    else {
        conditionalFields = (
            <div>
                <FormSelectField
                    name="nationality" 
                    type="nationality" 
                    label={t('edit_profile.employer.nationality')}
                    hasBorder
                    onFormikChange={formik.handleChange}
                    value={formik.values.nationality}
                    error={formik.touched.nationality && formik.errors.nationality}
                />
            </div>
        );
    }

    return (
        <form onSubmit={formik.handleSubmit} className={styles.form_wrapper}>
            <div className={styles.col}>
                <div className={styles.profile_image_wrapper}>
                    <FormImageField 
                        name="profile_image" 
                        type="file"
                        accept="image/jpg, image/jpeg, image/png"
                        className={styles.profile_image}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder={user.profile_image ? process.env.REACT_APP_UPLOADS_PATH + user.profile_image : user_image_placeholder}
                        value={formik.values.profile_image}
                        error={formik.touched.profile_image && formik.errors.profile_image}
                    />
                </div>
            </div>
            <div className={styles.col}>
                <Subtitle dark>{t('edit_profile.employer.employer_information_title')}</Subtitle>
                <div>
                    <FormField 
                        name="name" 
                        type="text" 
                        label={t('edit_profile.employer.name')}
                        hasBorder
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                        error={formik.touched.name && formik.errors.name}
                    />
                </div>
                <div>
                    <FormField 
                        name="email" 
                        type="email" 
                        label={t('edit_profile.employer.email')}
                        hasBorder
                        // {user.email_verified && }
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                        error={formik.touched.email && formik.errors.email}
                    />
                </div>
                <div>
                    <FormOptionField
                        name="employer_status"
                        label={t('edit_profile.employer.you_are')}
                        type="radio"
                        dark
                        onChange={formik.handleChange}
                        options={employerStatusOptions}
                        value={formik.values.employer_status}
                    />
                </div>
                
                {conditionalFields}

                <div>
                    <FormSelectField
                        name="country" 
                        type="country" 
                        label={t('edit_profile.employer.country')}
                        hasBorder
                        options={['QA', 'AE', 'SA', 'BH', 'KW', 'OM']}
                        onFormikChange={formik.handleChange}
                        value={formik.values.country}
                        error={formik.touched.country && formik.errors.country}
                    />
                </div>
                {formik.values.country &&
                    <div>
                        <FormSelectField 
                            name="city" 
                            type="default"
                            label={t('edit_profile.employer.city')}
                            options={citiesOptions}
                            hasBorder
                            onFormikChange={formik.handleChange}
                            value={formik.values.city}
                            error={formik.touched.city && formik.errors.city}
                        />
                    </div>
                }
                <br />

                <Subtitle dark>{t('edit_profile.employer.change_password_title')}</Subtitle>
                <div>
                    <FormField 
                        name="password" 
                        type="password" 
                        label={t('edit_profile.employer.new_password')}
                        hasBorder
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        error={formik.touched.password && formik.errors.password}
                    />
                </div>
                <div>
                    <FormField 
                        name="password_repeat" 
                        type="password" 
                        label={t('edit_profile.employer.repeat_password')}
                        hasBorder
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password_repeat}
                        error={formik.touched.password_repeat && formik.errors.password_repeat}
                    />
                </div>

                <div style={{textAlign: 'center'}}>
                    <Button type="submit">
                        { formLoading ? t('general.UI.loading') : t('general.UI.save') }
                    </Button>
                </div>
            </div>
        </form>
    );
}
    
export default EmployerForm;