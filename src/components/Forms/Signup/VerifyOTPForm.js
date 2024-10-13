import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import Yup from '../../../utils/yupExtensions';
import toast from 'react-hot-toast';
import i18next from 'i18next';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';

import styles from './VerifyOTPForm.module.css';
import Button from '../../UI/Buttons/Button/Button';
import FormField from '../../UI/FormUI/FormField/FormField';
import { fetchUserByToken } from '../../../app/features/userSlice';
import {
    resendOTPCode,
    verifyOTPCode
} from '../../../services/authService';

function VerifyOTPForm(props) {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [formLoading, setFormLoading] = useState(false);
    const currentLanguage = i18next.language;

    const formik = useFormik({
        initialValues: {
            otp_code: ''
        },
        validationSchema: Yup.object({
            otp_code: Yup.string().required(t('forms.welcome_employer.required')),
        }),
        onSubmit: values => {
            if (formLoading) {
                return;
            }

            setFormLoading(true);
            const formData = new FormData();
            formData.append('otp_code', values.otp_code);
            formData.append('email', props.email);

            toast.promise(verifyOTPCode(props.email, values.otp_code), {
                loading: t('general.UI.loading'),
                success: t('general.UI.success'),
                error: (err) => {
                    let error_msg = err.error;
                    return <b>{error_msg}</b>;
                },
            })
                .then((response) => {
                    if (response.success) {
                        dispatch(fetchUserByToken(props.token));
                    }
                })
                .catch((error) => {
                    if (error?.error) {
                        formik.setErrors({
                            otp_code: error?.error
                        });
                    }
                    setFormLoading(false);
                });
        },
    });

    // Function to handle the resend OTP code action
    const handleResendCode = () => {
        toast.promise(resendOTPCode(props.email, props.accountType), {
            loading: t('general.UI.loading'),
            success: (props) => {
                let error_msg = props.message;
                if (error_msg === "OTP resend limit reached. Try again after 24 hours.") {
                    return <b>{error_msg}</b>
                } else {
                    error_msg = t('general.UI.success')
                    return <b>{error_msg}</b>
                }
            }
            ,
            error: (err) => {
                let error_msg = err.error;
                if (error_msg === "Invalid OTP") {
                    error_msg = t('general.UI.something_went_wrong')
                }
                return <b>{error_msg}</b>;
            },
        })
            .then((response) => {
            })
            .catch((error) => {
                if (error?.error) {
                    formik.setErrors({
                        otp_code: error?.error
                    });
                }

                setFormLoading(false);
            });
    };

    return (
        <form onSubmit={formik.handleSubmit} {...props}>
            <div>
                <FormField
                    name="otp_code"
                    type="text"
                    placeholder={t('forms.verifyOTP.inputPlaceHolder')}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    maxLength={6} // Set maximum length to 6 digits
                    value={formik.values.otp_code}
                    error={formik.touched.otp_code && formik.errors.otp_code}
                />
            </div>
            <div className={currentLanguage == 'ar' ? styles.buttonWrapperAR : styles.buttonWrapper}            >
                <div className={styles.buttonContainer}>
                    <Button type="submit" >
                        {t('forms.verifyOTP.Verify')}
                    </Button>
                </div>
                <div className={styles.buttonContainer}>
                    <Button type="button" onClick={handleResendCode} >
                        {t('forms.verifyOTP.resend')}
                    </Button>
                </div>
            </div>

        </form >
    );
}

export default VerifyOTPForm;
