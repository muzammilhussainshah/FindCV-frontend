import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import Yup from '../../../utils/yupExtensions';
import FormField from '../../UI/FormUI/FormField/FormField';
import Button from '../../UI/Buttons/Button/Button';
import toast from 'react-hot-toast';

import { requestPasswordReset } from '../../../services/authService';

function RequestResetPasswordForm(props) {
    const { t } = useTranslation();
    const [formLoading, setFormLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            email: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email(t('forms.reset_password.invalid_email_address')).required(t('forms.reset_password.required'))
        }),
        onSubmit: values => {

            if (formLoading) {
                return;
            }

            setFormLoading(true);
            
            toast.promise(requestPasswordReset(values.email), {
                loading: t('forms.reset_password.requesting_reset_link'),
                success: <b>{t('forms.reset_password.check_email_for_reset_link')}</b>,
                error: (err) => {
                    return <b>{err.response.data.error}</b>;
                },
            })
            .then((response) => {
                setFormLoading(false);
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
                    placeholder={t('forms.reset_password.email')} 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    error={formik.touched.email && formik.errors.email}
                />
            </div>
            <Button type="submit">{
                formLoading ? t('general.UI.loading') : t('forms.reset_password.reset')
            }</Button>
        </form>
    );
}

export default RequestResetPasswordForm;