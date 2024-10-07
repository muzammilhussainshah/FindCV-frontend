import { useState } from 'react';

import FacebookLogin from 'react-facebook-login';
import toast from 'react-hot-toast';
import { t } from 'i18next';
import { useDispatch } from 'react-redux';

import styles from './SocialButton.module.css';
import FacebookWhite from '../../../../assets/images/icons/facebook-white.svg';
import { facebookLogin } from '../../../../services/authService';
import { fetchUserByToken } from '../../../../app/features/userSlice';

function SocialButton({ type }) {
    const [formLoading, setFormLoading] = useState(false);

    const dispatch = useDispatch();
    const responseFacebook = (response) => {

        if (formLoading) {
            return;
        }
        if (response?.accessToken) {
            setFormLoading(true);
            toast.promise(facebookLogin(response), {
                loading: t('forms.login.logging_in'),
                success: <b>{t('forms.login.logged_in_successfully')}</b>,
                error: (err) => {
                    return <b>{err.response.data.error}</b>;
                },
            })
                .then((response) => {
                    dispatch(fetchUserByToken(response));
                })
                .then(() => {
                    setFormLoading(false);
                }).catch((error) => {
                    setFormLoading(false);
                });
        }
    }

    return (
        <div className={styles.fbButtonContainerStyle}>
            {type === 'facebook' &&
                <FacebookLogin
                    appId={process.env.REACT_APP_FB_APP_ID}
                    autoLoad={true}
                    fields="name,email,picture"
                    cssClass={styles.fbButtonContainer}
                    textButton={''}
                    icon={<img src={FacebookWhite} alt="facebook-icon" />}
                    callback={(response) => { responseFacebook(response) }} />
            }
        </div>
    );

}
export default SocialButton;
