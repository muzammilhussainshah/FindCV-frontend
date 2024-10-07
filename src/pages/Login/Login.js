import { useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet';
import toast from 'react-hot-toast';

import SimpleLink from '../../components/UI/Buttons/SimpleLink/SimpleLink';
import LoginForm from '../../components/Forms/Signup/LoginForm';

import { userVerifyEmail } from '../../services/userService';
import { useGetQueryParam } from '../../utils/utilityHooks';
import { fetchUserByToken } from '../../app/features/userSlice';

import styles from './Login.module.css';
import SocialButton from '../../components/UI/Buttons/SocialButton/SocialButton';
function Login() {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const emailToken = useGetQueryParam('token');

    const verifyEmailToken = useCallback((emailToken) => {
        toast.promise(userVerifyEmail(false, emailToken), {
            loading: t('general.UI.loading'),
            success: t('general.UI.success'),
            error: t('general.UI.something_went_wrong'),
        })
            .then((data) => {

                if (data?.token) {
                    dispatch(fetchUserByToken(data.token));
                }

            })
            .catch((error) => {
                toast.error(error.error);
            });
    }, [dispatch, t]);

    useEffect(() => {

        if (emailToken) {
            verifyEmailToken(emailToken);
        }

    }, [verifyEmailToken, emailToken]);





    return (
        <>
            <Helmet>
                <title>FindCV - Login</title>
            </Helmet>
            <h1>{t('login.sign_in')}</h1>
            <LoginForm className={styles.form} />
            <SocialButton type={'facebook'} />
            <SimpleLink className={`white ${styles.link}`} to="/create-account">{t('login.create_account')}</SimpleLink>
            <br />
            <SimpleLink className={`white ${styles.link}`} to="/reset-password">{t('login.forgot_password')}</SimpleLink>
        </>
    );
}

export default Login;