import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setBackButtonLink } from '../../app/features/headerUISlice';
import SignupLayout from '../../components/Layouts/signupLayout';
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
        <SignupLayout>
            <div>
                <h1>{t('create_account.create_account')}</h1>
                <CreateAccountForm />
            </div>
        </SignupLayout>
    );
}
    
export default ResetPassword;