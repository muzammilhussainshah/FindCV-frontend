import SignupLayout from '../../components/Layouts/signupLayout';
import SimpleLink from '../../components/Buttons/SimpleLink/SimpleLink';
import LoginForm from '../../components/Forms/LoginForm';

import styles from './Login.module.css';

function Login() {
    return (
        <SignupLayout>
            <div>
                <h1>Sign In</h1>
                <LoginForm className={styles.form} />
                <SimpleLink className={`white ${styles.link}`} to="/create-account">Create Account</SimpleLink>
                <br />
                <SimpleLink className={`white ${styles.link}`} to="/reset-password">Forgot Password?</SimpleLink>
            </div>
        </SignupLayout>
    );
}
    
export default Login;