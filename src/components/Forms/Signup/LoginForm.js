import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUserByToken } from '../../../app/features/userSlice';
import { useFormik } from 'formik';
import Yup from '../../../utils/yupExtensions'; 
import toast from 'react-hot-toast';

import FormField from '../../UI/FormUI/FormField/FormField';
import Button from '../../UI/Buttons/Button/Button';

import { login } from '../../../services/authService';

function LoginForm(props) {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    const [formLoading, setFormLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            
            if (user.registration_process === 'completed') {
                // navigate('/dashboard');
            }
            else {
                navigate('/welcome');
            }

        }
    }, [navigate, user]);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email(t('forms.login.invalid_email_address')).required(t('forms.login.required')),
            password: Yup.string().required(t('forms.login.required')),
        }),
        onSubmit: values => {
            // alert(JSON.stringify(values, null, 2));

            if (formLoading) {
                return;
            }

            setFormLoading(true);

            toast.promise(login(values.email, values.password), {
                loading: t('forms.login.logging_in'),
                success: <b>{t('forms.login.logged_in_successfully')}</b>,
                error: (err) => {
                    return <b>{err.response.data.error}</b>;
                },
            })
            .then((response) => {
                toast.promise(dispatch(fetchUserByToken(response)), {
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

    return (
        <form onSubmit={formik.handleSubmit} {...props}>
            <div>
                <FormField 
                    name="email" 
                    type="email" 
                    placeholder={t('forms.login.email')} 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    error={formik.touched.email && formik.errors.email}
                />
            </div>
            <div>
                <FormField 
                    name="password" 
                    type="password" 
                    placeholder={t('forms.login.password')} 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    error={formik.touched.password && formik.errors.password}
                />
            </div>
            <Button type="submit">
                {formLoading ? t('forms.login.processing') : t('forms.login.login')}
            </Button>
        </form>
    );
}

export default LoginForm;