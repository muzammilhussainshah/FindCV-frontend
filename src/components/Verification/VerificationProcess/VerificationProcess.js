import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import PaymentForm from '../../Forms/Common/PaymentForm/PaymentForm';

import styles from './VerificationProcess.module.css';

function VerificationProcess({props}) {
    const { t } = useTranslation();
    const verification_payment_done = useSelector(state => state.user.user.verification_payment_done);

    let content;

    if (verification_payment_done) {
        content = 'test';
    }
    else {
        content = <PaymentForm />;
    }

    return (
        <div className={styles.VerificationProcess}>
            <div className={styles.VerificationProcessHead}>
                <h5>{t('forms.verification.identity_verification')}</h5>
                {!verification_payment_done && <span>$5 <span>/ {t('forms.verification.one_time_payment')}</span></span>}
            </div>
            
            <hr/>

            {content}
        </div>
    );
}

export default VerificationProcess;