import { useState } from 'react';

import FacebookLogin from 'react-facebook-login';
import { useDispatch } from 'react-redux';

import styles from './SocialButton.module.css';
import FacebookWhite from '../../../../assets/images/icons/facebook-white.svg';
import { facebookLogin } from '../../../../services/authService';
import { fetchUserByToken, setUser } from '../../../../app/features/userSlice';
import { useNavigate } from 'react-router-dom';
import { t } from 'i18next';
import toast from 'react-hot-toast';

function SocialButton({ type }) {
    const [formLoading, setFormLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const responseFacebook = async (response) => {

        if (formLoading) {
            return;
        }
        if (response?.accessToken) {
            setFormLoading(true);
            facebookLogin(response)
                .then((props) => {
                    if (props.signUpNeeded) {
                        dispatch(setUser(response));
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
                                    // dispatch(fetchUserByToken(response));
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
    }

    return (
        <div className={styles.fbButtonContainerStyle}>
            {type === 'facebook' &&
                <FacebookLogin
                    appId={process.env.REACT_APP_FB_APP_ID}
                    fields="name,email,picture"
                    cssClass={styles.fbButtonContainer}
                    textButton={''}
                    icon={<img src={FacebookWhite} alt="facebook-icon" />}
                    callback={(response) => { if (response?.accessToken) responseFacebook(response) }} />
            }
        </div>
    );

}
export default SocialButton;
