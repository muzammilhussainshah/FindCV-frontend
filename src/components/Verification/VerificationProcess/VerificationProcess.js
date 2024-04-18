import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Veriff } from '@veriff/js-sdk';
import { createVeriffFrame, MESSAGES } from '@veriff/incontext-sdk';

import PaymentForm from '../../Forms/Common/PaymentForm/PaymentForm';

import styles from './VerificationProcess.module.css';

function VerificationProcess({props}) {
    const user = useSelector(state => state.user.user);
    const language = useSelector((state) => state.translation.language);
    const { t } = useTranslation();

    let content = '';

    useEffect(() => {
        
        if (user.verification_payment_done) {

            const veriff = new Veriff({
                apiKey: process.env.REACT_APP_VERIFF_API_KEY,
                parentId: 'veriff-root',
                onSession: (err, response) => {

                    createVeriffFrame({
                        url: response.verification.url,
                        lang: language,
                        onEvent: function(msg) {
                            switch(msg) {
                                case MESSAGES.STARTED:
                                    console.log('STARTED');
                                    break;
                                case MESSAGES.FINISHED:
                                    console.log('FINISHED');
                                    break;
                                case MESSAGES.CANCELED:
                                    console.log('CANCELED');
                                    break;
                                default:
                                    console.log('DEFAULT');
                                    break;
                            }
                        }
                    });

                },
            });

            veriff.setParams({
                person: {
                    givenName: ' ',
                    lastName: ' '
                },
                vendorData: ' '
            });

            veriff.mount();

        }

    }, [user, language]);

    if (user.verification_payment_done) {
        content = <div id="veriff-root"></div>;
    }
    else {
        content = <PaymentForm />;
    }

    return (
        <div className={styles.VerificationProcess}>
            <div className={styles.VerificationProcessHead}>
                <h5>{t('forms.verification.identity_verification')}</h5>
                <span>$5 <span>/ {t('forms.verification.one_time_payment')}</span></span>
            </div>
            <hr/>
            {content}
        </div>
    );
}

export default VerificationProcess;