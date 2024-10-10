import { useState } from 'react';

import axios from 'axios';
import toast from 'react-hot-toast';
import FacebookLogin from 'react-facebook-login';
import { t } from 'i18next';
import { useDispatch } from 'react-redux';

import styles from './SocialButton.module.css';
import FacebookWhite from '../../../../assets/images/icons/facebook-white.svg';
import GoogleIcon from '../../../../assets/images/icons/google-colorfull-icon.svg';
import { socialLogin } from '../../../../services/authService';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import {
    fetchUserByToken,
    setUser
} from '../../../../app/features/userSlice';

function SocialButton({ type }) {
    const [formLoading, setFormLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const socialAuth = (response, type) => {
        setFormLoading(true);
        socialLogin(response, type)
            .then((props) => {
                if (props.signUpNeeded) {
                    dispatch(setUser({ ...response, provider: type }));
                    navigate('/create-account');
                } else {
                    if (props.token) {
                        toast.promise(dispatch(fetchUserByToken(props.token)), {
                            loading: t('forms.login.logging_in'),
                            success: <b>{t('forms.login.logged_in_successfully')}</b>,
                            error: (err) => {
                                return <b>{err.response.data.error}</b>;
                            },
                        })
                            .then((response) => {
                                setFormLoading(false);
                            })
                            .then(() => {
                                setFormLoading(false);
                            }).catch((error) => {
                                setFormLoading(false);
                            });
                    }
                }
                // Dispatch setUser action to store the user data and token in Redux state
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setFormLoading(false); // Stop loading spinner once done
            });
    }
    
    const responseFacebook = async (response) => {
        if (formLoading) {
            return;
        }
        if (response?.accessToken) {
            socialAuth(response, 'facebook')

        }
    }

    const login = useGoogleLogin({
        onSuccess: async (response) => {
            if (response.access_token) {
                const googleUserResponse = await axios.get(
                    `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${response.access_token}`
                );
                socialAuth({ ...googleUserResponse.data, ...response }, 'google')
            }
        },
        onError: (error) => {
            console.error('Google One Tap error:', error);
        },
    });

    return (
        <div className={styles.fbButtonContainerStyle}>
            <div onClick={() => { login() }}
                className={styles.googleButtonContainer}>
                <img
                    src={GoogleIcon}
                    alt="google-icon"
                    className={styles.googleIcon}
                />
            </div>
            <FacebookLogin
                appId={process.env.REACT_APP_FB_APP_ID}
                fields="name,email,picture"
                cssClass={styles.fbButtonContainer}
                textButton={''}
                icon={<img src={FacebookWhite} className={styles.facebookIcon} alt="facebook-icon" />}
                callback={(response) => { if (response?.accessToken) responseFacebook(response) }} />

        </div>
    );

}
export default SocialButton;
