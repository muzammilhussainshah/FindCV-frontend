import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setBackButtonLink } from '../../app/features/headerUISlice';
import SignupLayout from '../../components/Layouts/signupLayout';
import RequestResetPasswordForm from '../../components/Forms/Signup/RequestResetPasswordForm';

function ResetPassword() {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    useEffect(() => {
        dispatch(setBackButtonLink('/login'));
    
        // Optionally, reset the visibility when the component unmounts
        return () => {
          dispatch(setBackButtonLink(false));
        };
    }, [dispatch]);

    return (
        <SignupLayout>
            <div>
                <h1>{t('reset_password.reset_password')}</h1>
                <RequestResetPasswordForm />
            </div>
        </SignupLayout>
    );
}
    
export default ResetPassword;