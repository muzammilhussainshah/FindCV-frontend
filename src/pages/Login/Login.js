import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';

import SimpleLink from '../../components/UI/Buttons/SimpleLink/SimpleLink';
import LoginForm from '../../components/Forms/Signup/LoginForm';

import styles from './Login.module.css';

function Login() {
    const { t } = useTranslation();

    return (
        <>
            <Helmet>
                <title>FindCV - Login</title>
            </Helmet>
            <h1>{t('login.sign_in')}</h1>
            <LoginForm className={styles.form} />
            <SimpleLink className={`white ${styles.link}`} to="/create-account">{t('login.create_account')}</SimpleLink>
            <br />
            <SimpleLink className={`white ${styles.link}`} to="/reset-password">{t('login.forgot_password')}</SimpleLink>
        </>
    );
}
    
export default Login;