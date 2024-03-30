import { useTranslation } from 'react-i18next';

import SignupLayout from '../../components/Layouts/signupLayout';
import SimpleLink from '../../components/Buttons/SimpleLink/SimpleLink';
import LoginForm from '../../components/Forms/LoginForm';

import styles from './Login.module.css';

function Login() {
    const { t } = useTranslation();

    return (
        <SignupLayout>
            <div>
                <h1>{t('login.sign_in')}</h1>
                <LoginForm className={styles.form} />
                <SimpleLink className={`white ${styles.link}`} to="/create-account">{t('login.create_account')}</SimpleLink>
                <br />
                <SimpleLink className={`white ${styles.link}`} to="/reset-password">{t('login.forgot_password')}</SimpleLink>
            </div>
        </SignupLayout>
    );
}
    
export default Login;