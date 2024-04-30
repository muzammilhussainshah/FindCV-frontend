import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import VerificationProcess from '../../Verification/VerificationProcess/VerificationProcess';
import BasicPopup from '../../UI/Popups/BasicPopup/BasicPopup';
import List from '../../UI/Common/List/List';
import Button from '../../UI/Buttons/Button/Button';
import SimpleLink from '../../UI/Buttons/SimpleLink/SimpleLink';

import { fetchUserByToken } from '../../../app/features/userSlice';
import { updateUser } from '../../../services/userService';

import styles from './JobseekerWelcomeForms.module.css';

function JobseekerWelcomeFormStep4() {
    const user = useSelector(state => state.user.user);
    const userToken = useSelector(state => state.user.token);
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isVerificationBenefitsOpen, setIsVerificationBenefitsOpen] = useState(false);
    const [isVerificationProcessOpen, setIsVerificationProcessOpen] = useState(false);

    useEffect(() => {
        if (user) {

            if (user.verification_payment_done) {
                setIsVerificationProcessOpen(false);
            }
            
            if (user.registration_process === 'completed') {
                navigate('/' + user.account_type + 's/' + user.id);
            }

        }
    }, [navigate, user]);

    const handleOpenBenefitsPopup = () => {
        setIsVerificationBenefitsOpen(true);
    }

    const handleCloseBenefitsPopup = () => {
        setIsVerificationBenefitsOpen(false);
    }

    const handleCloseProcessPopup = () => {
        setIsVerificationProcessOpen(false);
    }

    const handleOpenProcessPopup = () => {
        setIsVerificationProcessOpen(true);
    }

    const handleVerificationSkip = () => {
        updateUser({
            token: userToken,
            step: 4
        })
        .then(() => {
            dispatch(fetchUserByToken(userToken));
        });
    }

    return (
        <>
            <div className={styles.verification}>
                <p>{t('forms.welcome_job_seeker.step_4.text')}</p>
                <SimpleLink className={`white ${styles.link}`} onClick={handleOpenBenefitsPopup}>{t('forms.welcome_job_seeker.step_4.learn_more_about_benefits')}</SimpleLink>
                <div className={styles.verification_buttons}>
                    <Button type="button" outlined onClick={handleVerificationSkip}>{t('general.UI.skip')}</Button>
                    <Button type="button" onClick={handleOpenProcessPopup}>{t('general.UI.proceed')}</Button>
                </div>
            </div>

            <BasicPopup
                isOpen={isVerificationBenefitsOpen}
                closePopup={handleCloseBenefitsPopup}
            >
                <h4>{t('forms.verification.verification_benefits')}</h4>
                <List icon="checkmark">
                    <li>{t('forms.verification.item1')}</li>
                    <li>{t('forms.verification.item2')}</li>
                    <li>{t('forms.verification.item3')}</li>
                    <li>{t('forms.verification.item4')}</li>
                    <li>{t('forms.verification.item5')}</li>
                    <li>{t('forms.verification.item6')}</li>
                </List>
            </BasicPopup>
            <BasicPopup
                className={styles.verification_popup}
                isOpen={isVerificationProcessOpen}
                closePopup={handleCloseProcessPopup}
            >
                <VerificationProcess />
            </BasicPopup>
        </>
    );
}

export default JobseekerWelcomeFormStep4;