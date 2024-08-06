import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import Yup from '../../../utils/yupExtensions'; 
import toast from 'react-hot-toast';

import { fetchUserByToken } from '../../../app/features/userSlice';
import { updateUser } from '../../../services/userService';
import { useGetCities } from '../../../utils/utilityHooks';

import FormField from '../../UI/FormUI/FormField/FormField';
import FormOptionField from '../../UI/FormUI/FormOptionField/FormOptionField';
import FormSelectField from '../../UI/FormUI/FormSelectField/FormSelectField';
import Button from '../../UI/Buttons/Button/Button';

function EmployerWelcomeForm(props) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user);
    const userToken = useSelector(state => state.user.token);
    const { t } = useTranslation();
    const [formLoading, setFormLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            
            if (user.registration_process === 'completed') {
                navigate('/' + user.account_type + 's/' + user.id);
            }

        }
    }, [navigate, user]);

    const formik = useFormik({
        initialValues: {
            first_name: '',
            last_name: '',
            city: '',
            country: '',
            company_name: '',
            nationality: '',
            employer_status: 'business'
        },
        validationSchema: Yup.object({
            first_name: Yup.string().required(t('forms.welcome_employer.required')),
            last_name: Yup.string().required(t('forms.welcome_employer.required')),
            city: Yup.string().required(t('forms.welcome_employer.required')),
            country: Yup.string().required(t('forms.welcome_employer.required')),
            company_name: Yup.string().when('employer_status', {
                is: 'business',
                then: schema => schema.required(t('forms.welcome_employer.required')),
                otherwise: schema => schema.notRequired()
            }),
            nationality: Yup.string().when('employer_status', {
                is: 'individual',
                then: schema => schema.required(t('forms.welcome_employer.required')),
                otherwise: schema => schema.notRequired()
            }),
        }),
        onSubmit: values => {

            if (formLoading) {
                return;
            }

            setFormLoading(true);

            if (values.employer_status === 'individual') {
                values.company_name = '';
            }
            else {
                values.nationality = '';
            }

            const formData = new FormData();
            formData.append('token', userToken);
            formData.append('first_name', values.first_name);
            formData.append('last_name', values.last_name);
            formData.append('city', values.city);
            formData.append('country', values.country);
            formData.append('nationality', values.nationality);
            formData.append('company_name', values.company_name);
            formData.append('employer_status', values.employer_status);

            toast.promise(updateUser(formData), {
                loading: t('forms.welcome_employer.updating_profile'),
                success: <b>{t('forms.welcome_employer.profile_successfully_updated')}</b>,
                error: (err) => {
                    return <b>{err.response.data.error}</b>;
                },
            })
            .then(() => {
                toast.promise(dispatch(fetchUserByToken(userToken)), {
                    loading: t('forms.login.receiving_data'),
                    success: <b>{t('forms.login.user_verified')}</b>,
                    error: (err) => {
                        return <b>{err.response.data.error}</b>;
                    },
                });
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

    const employerStatusOptions = [
        { value: 'business', label: t('forms.welcome_employer.business') },
        { value: 'individual', label: t('forms.welcome_employer.individual') }
    ];

    let conditionalFields = '';

    if (formik.values.employer_status === 'business') {
        conditionalFields = (
            <div>
                <FormField 
                    name="company_name" 
                    type="text" 
                    placeholder={t('forms.welcome_employer.company_name')} 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.company_name}
                    error={formik.touched.company_name && formik.errors.company_name}
                />
            </div>
        );
    }
    else {
        conditionalFields = (
            <div>
                <FormSelectField
                    name="nationality" 
                    type="nationality" 
                    placeholder={t('forms.welcome_employer.nationality')}
                    onFormikChange={formik.handleChange}
                    value={formik.values.nationality}
                    error={formik.touched.nationality && formik.errors.nationality}
                />
            </div>
        );
    }

    const citiesOptions = useGetCities(formik.values.country);

    return (
        <form onSubmit={formik.handleSubmit} {...props}>
            <div>
                <FormField 
                    name="first_name" 
                    type="text" 
                    placeholder={t('forms.welcome_employer.first_name')}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.first_name}
                    error={formik.touched.first_name && formik.errors.first_name}
                />
            </div>
            <div>
                <FormField 
                    name="last_name" 
                    type="text" 
                    placeholder={t('forms.welcome_employer.last_name')}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.last_name}
                    error={formik.touched.last_name && formik.errors.last_name}
                />
            </div>
            <div>
                <FormSelectField
                    name="country" 
                    type="country" 
                    placeholder={t('forms.welcome_employer.country')}
                    onFormikChange={formik.handleChange}
                    options={['QA', 'AE', 'SA', 'BH', 'KW', 'OM']}
                    value={formik.values.country}
                    error={formik.touched.country && formik.errors.country}
                />
            </div>
            {formik.values.country &&
                <div>
                    <FormSelectField 
                        name="city" 
                        type="default"
                        placeholder={t('forms.welcome_employer.city')}
                        options={citiesOptions}
                        onFormikChange={formik.handleChange}
                        value={formik.values.city}
                        error={formik.touched.city && formik.errors.city}
                    />
                </div>
            }
            <div>
                <FormOptionField
                    name="employer_status"
                    label={t('forms.welcome_employer.you_are')}
                    type="radio"
                    onChange={formik.handleChange}
                    options={employerStatusOptions}
                    value={formik.values.employer_status}
                />
            </div>
            {conditionalFields}
            <Button type="submit" style={{display: 'block'}}>
                {formLoading ? t('forms.welcome_employer.processing') : t('forms.welcome_employer.proceed')}
            </Button>
        </form>
    );
}

export default EmployerWelcomeForm;