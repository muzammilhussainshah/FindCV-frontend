import { useTranslation } from 'react-i18next';

import PaymentForm from '../../Forms/Common/PaymentForm/PaymentForm';

import styles from './VerificationProcess.module.css';

function VerificationProcess({props}) {
    const { t } = useTranslation();

    return (
        <div className={styles.VerificationProcess}>
            <div className={styles.VerificationProcessHead}>
                <h5>{t('forms.verification.identity_verification')}</h5>
                <span>$5 <span>/ {t('forms.verification.one_time_payment')}</span></span>
            </div>
            
            <hr/>

            <PaymentForm />
        </div>
    );
}

export default VerificationProcess;