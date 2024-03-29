import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setBackButtonLink } from '../../app/features/headerUISlice';
import SignupLayout from '../../components/Layouts/signupLayout';
import CreateAccountForm from '../../components/Forms/CreateAccountForm';

function ResetPassword() {
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
                <h1>Create Account</h1>
                <CreateAccountForm />
            </div>
        </SignupLayout>
    );
}
    
export default ResetPassword;