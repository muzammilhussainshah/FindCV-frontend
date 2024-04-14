import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setBackButtonLink } from '../../app/features/headerUISlice';
import CreateAccountForm from '../../components/Forms/Signup/CreateAccountForm';

function ResetPassword() {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setBackButtonLink('/login'));
    
        // Optionally, reset the visibility when the component unmounts
        return () => {
          dispatch(setBackButtonLink(false));
        };
    }, [dispatch]);

    return (
        <>
            <h1>{t('create_account.create_account')}</h1>
            <CreateAccountForm />
        </>
    );
}
    
export default ResetPassword;