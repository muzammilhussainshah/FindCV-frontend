import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { cancelSubscription } from '../../../services/paymentService';
import { fetchUserByToken } from '../../../app/features/userSlice';

import BubbleButton from '../../../components/UI/Buttons/BubbleButton/BubbleButton';
import Button from '../../../components/UI/Buttons/Button/Button';
import List from '../../../components/UI/Common/List/List';
import PaymentForm from '../../../components/Forms/Common/PaymentForm/PaymentForm';

import styles from './ProfileEmployerSubscription.module.css';

function ProfileEmployerSubscription() {
    const user = useSelector(state => state.user.user);
    const userToken = useSelector(state => state.user.token);
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleCancelSubscription = () => {
        setLoading(true);
        
        cancelSubscription({ token: userToken })
            .then(() => {
                dispatch(fetchUserByToken(userToken));
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            });

    }

    let subscriptionExpired = false;

    if (user.subscriptionEndDate && new Date(user.subscriptionEndDate) > new Date()) {
        subscriptionExpired = false;
    }
    else {
        subscriptionExpired = true;
    }

    let content = '';

    if (user.subscriptionStatus === 'active') {
        content = <Button onClick={handleCancelSubscription} type="submit" color="red" style={{display: 'block', margin: 'auto'}}>
            {loading ? t('general.UI.loading') : t('general.UI.cancel')}
        </Button>;
    }
    else {

        if (subscriptionExpired) {
            content = <PaymentForm actionType={'pay_for_subscription'} />;
        }

    }

    let price = '$95';
    let price_reccuring = '$65';

    if (user?.subscription_price?.currency_options) {

        if (user.country === 'AE') {
            price = (Math.ceil(parseFloat(user.subscription_price.currency_options.aed.unit_amount_decimal) / 100) + 111) + 'د.إ(AED)';
            price_reccuring = (Math.ceil(parseFloat(user.subscription_price.currency_options.aed.unit_amount_decimal) / 100)) + 'د.إ(AED)';
        }
        else if (user.country === 'SA') {
            price = (Math.ceil(parseFloat(user.subscription_price.currency_options.sar.unit_amount_decimal) / 100) + 111) + 'ر.س(SAR)';
            price_reccuring = (Math.ceil(parseFloat(user.subscription_price.currency_options.sar.unit_amount_decimal) / 100)) + 'ر.س(SAR)';
        }
        else if (user.country === 'QA') {
            price = (Math.ceil(parseFloat(user.subscription_price.currency_options.qar.unit_amount_decimal) / 100) + 111) + 'درهم(QAR)';
            price_reccuring = (Math.ceil(parseFloat(user.subscription_price.currency_options.qar.unit_amount_decimal) / 100)) + 'درهم(QAR)';
        }

    }

    return (
        <div className={styles.wrapper}>
            <Helmet>
                <title>FindCV - Subscription</title>
            </Helmet>

            <div className={styles.header_block}>
                <BubbleButton 
                    onClick={() => navigate(-1)}
                    type={'button'}
                    small
                    dark
                    icon_position={'left'}
                    icon={'arrow-back'}
                >
                    {t('general.UI.back')}
                </BubbleButton>
            </div>

            {user.subscriptionStatus && 
                <div className={styles.status_block}>
                    <p>{t('employer.subscription_form.subscription_status')}: <span className={styles[user.subscriptionStatus]}>{t('employer.subscription_form.' + user.subscriptionStatus)}</span></p>

                    {subscriptionExpired ? (
                        <p>{t('employer.subscription_form.active_due')}: <span className={styles.not_active}>{new Date(user.subscriptionEndDate).toLocaleDateString()}</span></p>
                    ) : (
                        <p>{t('employer.subscription_form.active_due')}: <span className={styles.active}>{new Date(user.subscriptionEndDate).toLocaleDateString()}</span></p>
                    )}
                </div>
            }

            <div className={styles.body_block}>
                <div className={styles.body_block_head}>
                    <h4>{t('employer.subscription_form.title')}</h4>
                    <div className={styles.body_block_head_price}>
                        <p>{price} <span>/ {t('employer.subscription_form.initial_month')}</span></p>
                        <p>{price_reccuring} <span>/ {t('employer.subscription_form.each_next_month')}</span></p>
                    </div>
                </div>
                <div className={styles.body_block_body}>
                    <List icon={'checkmark'} style={{marginBottom: 45}}>
                        <li>{t('employer.subscription_form.benefits_1')}</li>
                    </List>

                    {content}
                </div>
            </div>

        </div>
    );
}
    
export default ProfileEmployerSubscription;