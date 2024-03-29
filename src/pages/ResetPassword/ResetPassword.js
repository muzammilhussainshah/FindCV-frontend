import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setBackButtonLink } from '../../app/features/headerUISlice';
import SignupLayout from '../../components/Layouts/signupLayout';
import RequestResetPasswordForm from '../../components/Forms/RequestResetPasswordForm';

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
                <h1>Reset Password</h1>
                <RequestResetPasswordForm />
            </div>
        </SignupLayout>
    );
}
    
export default ResetPassword;