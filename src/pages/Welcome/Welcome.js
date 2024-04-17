import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import EmployerWelcomeForm from '../../components/Forms/Signup/EmployerWelcomeForm';
import JobseekerWelcomeFormStep1 from '../../components/Forms/Signup/JobseekerWelcomeFormStep1';
import JobseekerWelcomeFormStep2 from '../../components/Forms/Signup/JobseekerWelcomeFormStep2';
import JobseekerWelcomeFormStep3 from '../../components/Forms/Signup/JobseekerWelcomeFormStep3';
import JobseekerWelcomeFormStep4 from '../../components/Forms/Signup/JobseekerWelcomeFormStep4';

import styles from './Welcome.module.css';

function Welcome() {
    const user = useSelector((state) => state.user.user);
    const { t } = useTranslation();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            
            if (user.registration_process === 'completed') {
                navigate('/dashboard');
            }

        }
    }, [navigate, user]);

    let content = '';

    if (!user.email_verified) {
        
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
            {content}
        </>
    );
}
    
export default Welcome;