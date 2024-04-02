import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import SignupLayout from '../../components/Layouts/signupLayout';
import EmployerWelcomeForm from '../../components/Forms/EmployerWelcomeForm';
import JobseekerWelcomeFormStep1 from '../../components/Forms/JobseekerWelcomeFormStep1';

import styles from './Welcome.module.css';

function Welcome() {
    const { t } = useTranslation();
    const user = useSelector((state) => state.user.user);

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
            else {
                //
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
        <SignupLayout>
            {content}
        </SignupLayout>
    );
}
    
export default Welcome;