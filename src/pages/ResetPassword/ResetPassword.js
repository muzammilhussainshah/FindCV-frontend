import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet';

import { setBackButtonLink } from '../../app/features/headerUISlice';
import { useGetQueryParam } from '../../utils/utilityHooks';

import RequestResetPasswordForm from '../../components/Forms/Signup/RequestResetPasswordForm';
import ResetPasswordForm from '../../components/Forms/Signup/ResetPasswordForm';

function ResetPassword() {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const passwordToken = useGetQueryParam('token');

    useEffect(() => {
        dispatch(setBackButtonLink('/login'));
    
        // Optionally, reset the visibility when the component unmounts
        return () => {
          dispatch(setBackButtonLink(false));
        };
    }, [dispatch]);

    return (
        <>
            <Helmet>
                <title>FindCV - Reset Password</title>
            </Helmet>
            <h1>{t('reset_password.reset_password')}</h1>
            {!passwordToken && <RequestResetPasswordForm />}
            {passwordToken && <ResetPasswordForm passwordToken={passwordToken} />}
        </>
    );
}
    
export default ResetPassword;