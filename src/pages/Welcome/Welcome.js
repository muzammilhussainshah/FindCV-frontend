import { useSelector } from 'react-redux';
import SignupLayout from '../../components/Layouts/signupLayout';
import EmployerWelcomeForm from '../../components/Forms/EmployerWelcomeForm';

import styles from './Welcome.module.css';

function Welcome() {
    const user = useSelector((state) => state.user.user);

    let content = '';

    if (!user.email_verified) {
        
        if (user.account_type === 'employer') {
            
            if (user.registration_process === '1') {
                content = <div>
                    <h1>Welcome</h1>
                    <EmployerWelcomeForm />
                </div>;
            }

        }
        else {
            //
        }

    }
    else {
        content = <div>
            <h1>Welcome</h1>
            <div className={styles.verify_email}>
                <p>Please verify your email. We sent you email with verification link to <strong>{user.email}</strong></p>
            </div>
        </div>;
    }

    return (
        <SignupLayout>
            {content}
        </SignupLayout>
    );
}
    
export default Welcome;