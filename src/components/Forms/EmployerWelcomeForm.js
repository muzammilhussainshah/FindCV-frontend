import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { getCode } from 'country-list';

import { fetchUserByToken } from '../../app/features/userSlice';
import { updateUser } from '../../services/userService';

import FormField from '../FormField/FormField';
import FormOptionField from '../FormOptionField/FormOptionField';
import FormSelectField from '../FormSelectField/FormSelectField';
import Button from '../Buttons/Button/Button';

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
                navigate('/dashboard');
            }

        }
    }, [navigate, user]);

    const formik = useFormik({
        initialValues: {
            name: '',
            city: '',
            country: '',
            company_name: '',
            nationality: '',
            employer_status: 'business'
        },
        validationSchema: Yup.object({
            name: Yup.string().required(t('forms.welcome_employer.required')),
            city: Yup.string().required(t('forms.welcome_employer.required')),
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

            if (values.country) {
                values.country = getCode(values.country);
            }
            if (values.nationality) {
                values.nationality = getCode(values.nationality);
            }

            toast.promise(updateUser(values, userToken), {
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
                
                if (error.response.data.field) {
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
                    type="company_name" 
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
                    onChange={formik.handleChange}
                    value={formik.values.nationality}
                    error={formik.touched.nationality && formik.errors.nationality}
                />
            </div>
        );
    }

    return (
        <form onSubmit={formik.handleSubmit} {...props}>
            <div>
                <FormField 
                    name="name" 
                    type="name" 
                    placeholder={t('forms.welcome_employer.name')}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                    error={formik.touched.name && formik.errors.name}
                />
            </div>
            <div>
                <FormSelectField
                    name="country" 
                    type="country" 
                    placeholder={t('forms.welcome_employer.country')}
                    onChange={formik.handleChange}
                    value={formik.values.country}
                    error={formik.touched.country && formik.errors.country}
                />
            </div>
            <div>
                <FormField 
                    name="city" 
                    type="city" 
                    placeholder={t('forms.welcome_employer.city')}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.city}
                    error={formik.touched.city && formik.errors.city}
                />
            </div>
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