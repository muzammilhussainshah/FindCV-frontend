import { useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';

import EmployerWelcomeForm from '../../components/Forms/Signup/EmployerWelcomeForm';
import JobseekerWelcomeFormStep1 from '../../components/Forms/Signup/JobseekerWelcomeFormStep1';
import JobseekerWelcomeFormStep2 from '../../components/Forms/Signup/JobseekerWelcomeFormStep2';
import JobseekerWelcomeFormStep3 from '../../components/Forms/Signup/JobseekerWelcomeFormStep3';
import JobseekerWelcomeFormStep4 from '../../components/Forms/Signup/JobseekerWelcomeFormStep4';

import { useGetQueryParam } from '../../utils/utilityHooks';
import { userVerifyEmail } from '../../services/userService';
import { fetchUserByToken } from '../../app/features/userSlice';

import styles from './Welcome.module.css';

function Welcome() {
    const userToken = useSelector(state => state.user.token);
    const user = useSelector((state) => state.user.user);
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const emailToken = useGetQueryParam('token');

    const verifyEmailToken = useCallback((emailToken) => {
        toast.promise(userVerifyEmail(userToken, emailToken), {
            loading: t('general.UI.loading'),
            success: t('general.UI.success'),
            error: t('general.UI.something_went_wrong'),
        })
        .then((data) => {
            dispatch(fetchUserByToken(userToken));
        })
        .catch((error) => {
            toast.error(error.error);
        });
    }, [dispatch, t, userToken]);

    useEffect(() => {
        if (user) {
            
            if (user.registration_process === 'completed') {
                navigate('/' + user.account_type + 's/' + user.slug);
            }

            if (emailToken && !user.email_verified) {
                verifyEmailToken(emailToken);
            }

        }
    }, [navigate, verifyEmailToken, user, emailToken]);

    let content = '';

    if (user.email_verified) {
        
        if (user.account_type === 'employer') {

            content = <div>
                <h1>{t('welcome.welcome')}</h1>
                <EmployerWelcomeForm />
            </div>;

        }
        else {
            
            if (user.registration_process === '1') {
                content = <div>
                    <span className={styles.step}>{t('welcome.step_1')}</span>
                    <h1>{t('welcome.welcome')}</h1>
                    <JobseekerWelcomeFormStep1 />
                </div>;
            }
            else if (user.registration_process === '2') {
                content = <div>
                    <span className={styles.step}>{t('welcome.step_2')}</span>
                    <h4>{t('forms.welcome_job_seeker.step_2.highlight_your_strong_sides')}</h4>
                    <JobseekerWelcomeFormStep2 />
                </div>;
            }
            else if (user.registration_process === '3') {
                content = <div>
                    <span className={styles.step}>{t('welcome.step_3')}</span>
                    <h4>{t('forms.welcome_job_seeker.step_3.title')}</h4>
                    <JobseekerWelcomeFormStep3 />
                </div>;
            }
            else if (user.registration_process === '4') {
                content = <div>
                    <span className={styles.step}>{t('welcome.step_4')}</span>
                    <h4>{t('forms.welcome_job_seeker.step_4.title')}</h4>
                    <JobseekerWelcomeFormStep4 />
                </div>;
            }

        }

    }
    else {
        content = <div>
            <h1>{t('welcome.welcome')}</h1>
            <div className={styles.verify_email}>
                <p>{t('welcome.verify_email_message')} <strong>{user.email}</strong></p>
            </div>
        </div>;
    }

    return (
        <>
            <Helmet>
                <title>FindCV - Welcome</title>
            </Helmet>
            {content}
        </>
    );
}
    
export default Welcome;