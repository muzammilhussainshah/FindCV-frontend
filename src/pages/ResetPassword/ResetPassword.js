import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setBackButtonLink } from '../../app/features/headerUISlice';
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
        <>
            <h1>{t('reset_password.reset_password')}</h1>
            <RequestResetPasswordForm />
        </>
    );
}
    
export default ResetPassword;