import { useEffect, useState } from 'react';

import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import Yup from '../../../utils/yupExtensions';
import Button from '../../UI/Buttons/Button/Button';
import FormField from '../../UI/FormUI/FormField/FormField';
import FormOptionField from '../../UI/FormUI/FormOptionField/FormOptionField';
import { useFormik } from 'formik';
import { socialSignup, signup } from '../../../services/authService';
import { fetchUserByToken, setUser } from '../../../app/features/userSlice';

function CreateAccountForm(props) {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const userData = useSelector((state) => state.user.userData);
    const user = useSelector((state) => state.user.user);
    const [formLoading, setFormLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/welcome');
        } 
    }, [navigate, user, dispatch]);

    const formik = useFormik({
        initialValues: {
            email: userData?.email || '',
            password: '',
            password_repeat: '',
            account_type: 'employer'
        },
        validationSchema: !userData && Yup.object({
            email: Yup.string().email(t('forms.create_account.invalid_email_address')).required(t('forms.create_account.required')),
            password: Yup.string().min(8, t('forms.create_account.must_be_at_least_8_characters')).required(t('forms.create_account.required')),
            password_repeat: Yup.string().oneOf([Yup.ref('password'), null], t('forms.create_account.passwords_must_match')).required(t('forms.create_account.required'))
        }),
        onSubmit: async (values) => {
            if (formLoading) {
                return;
            }
            setFormLoading(true);

            toast.promise(userData ? socialSignup({ ...userData, password: values.password, }, userData.provider, values.account_type) : signup(values.email, values.password, values.account_type), {
                loading: t('forms.create_account.creating_account'),
                success: <b>{t('forms.create_account.account_created_successfully')}</b>,
                error: (err) => {
                    return <b>{err.response.data.error}</b>;
                },
            })
                .then((response) => {
                    // !userData ?
                    toast.promise(dispatch(fetchUserByToken(response)), {
                        loading: t('forms.create_account.logging_in'),
                        success: <b>{t('forms.create_account.successfully_logged_in')}</b>,
                        error: (err) => {
                            return <b>{err.response.data.error}</b>;
                        },
                    })
                    // :
                    // dispatch(fetchUserByToken(response))
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

    const accountTypeOptions = [
        { value: 'employer', label: t('forms.create_account.employer') },
        { value: 'jobseeker', label: t('forms.create_account.job_seeker') }
    ];

    return (
        <form onSubmit={formik.handleSubmit} {...props}>
            <div>
                <FormField
                    name="email"
                    type="email"
                    placeholder={t('forms.create_account.email')}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    readOnly={!!userData} // Make the email field read-only if userData exists
                    // disabled={!!userData} // Disable the email field if userData exists
                    error={formik.touched.email && formik.errors.email}
                />
            </div>
            {/* {!userData && */}
            <>
                <div>
                    <FormField
                        name="password"
                        type="password"
                        placeholder={t('forms.create_account.password')}
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
                        placeholder={t('forms.create_account.repeat_password')}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password_repeat}
                        error={formik.touched.password_repeat && formik.errors.password_repeat}
                    />
                </div>
            </>
            {/* // } */}
            <div>
                <FormOptionField
                    name="account_type"
                    label={t('forms.create_account.account_type')}
                    type="radio"
                    onChange={formik.handleChange}
                    options={accountTypeOptions}
                    value={formik.values.account_type}
                />
            </div>
            <Button type="submit" style={{ display: 'block', marginTop: 30 }}>
                {formLoading ? t('forms.create_account.please_wait') : t('forms.create_account.proceed')}
            </Button>
        </form>
    );
}

export default CreateAccountForm;