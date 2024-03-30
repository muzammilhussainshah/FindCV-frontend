import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import FormField from '../FormField/FormField';
import Button from '../Buttons/Button/Button';

function RequestResetPasswordForm(props) {
    const { t } = useTranslation();

    const formik = useFormik({
        initialValues: {
            email: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email(t('forms.reset_password.invalid_email_address')).required(t('forms.reset_password.required'))
        }),
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
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
            <Button type="submit">{t('forms.reset_password.reset')}</Button>
        </form>
    );
}

export default RequestResetPasswordForm;