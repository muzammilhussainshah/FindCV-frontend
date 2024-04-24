import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import Yup from '../../../utils/yupExtensions';
import FormField from '../../UI/FormUI/FormField/FormField';
import Button from '../../UI/Buttons/Button/Button';
import toast from 'react-hot-toast';

import { submitPasswordReset } from '../../../services/authService';

function ResetPasswordForm({passwordToken, ...props}) {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [formLoading, setFormLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            password: '',
            password_repeat: '',
        },
        validationSchema: Yup.object({
            password: Yup.string().min(8, t('forms.create_account.must_be_at_least_8_characters')).required(t('forms.create_account.required')),
            password_repeat: Yup.string().oneOf([Yup.ref('password'), null], t('forms.create_account.passwords_must_match')).required(t('forms.create_account.required'))
        }),
        onSubmit: values => {

            if (formLoading) {
                return;
            }

            setFormLoading(true);
            
            toast.promise(submitPasswordReset(passwordToken, values.password), {
                loading: t('forms.reset_password.updating_password'),
                success: <b>{t('forms.reset_password.password_updated')}</b>,
                error: (err) => {
                    let error_msg = err.error;

                    if (error_msg === 'PASSWORD_RESET_TOKEN_EXPIRED') {
                        error_msg = t('forms.reset_password.your_password_reset_link_is_expired');
                    }

                    return <b>{error_msg}</b>;
                },
            })
            .then((response) => {

                if (response.success) {
                    navigate('/login');
                }

            })
            .catch((error) => {
                setFormLoading(false);
            });

        },
    });

    return (
        <form onSubmit={formik.handleSubmit} {...props}>
            <div>
                <FormField 
                    name="password" 
                    type="password" 
                    placeholder={t('forms.reset_password.enter_new_password')} 
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
                    placeholder={t('forms.reset_password.repeat_new_password')} 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password_repeat}
                    error={formik.touched.password_repeat && formik.errors.password_repeat}
                />
            </div>
            <Button type="submit">{
                formLoading ? t('general.UI.loading') : t('general.UI.save')
            }</Button>
        </form>
    );
}

export default ResetPasswordForm;