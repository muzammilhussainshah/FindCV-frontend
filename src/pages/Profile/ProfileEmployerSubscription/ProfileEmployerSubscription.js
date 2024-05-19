import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

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
            {loading ? 'Loading...' : 'Cancel'}
        </Button>;
    }
    else {

        if (subscriptionExpired) {
            content = <PaymentForm actionType={'pay_for_subscription'} />;
        }

    }

    return (
        <div className={styles.wrapper}>

            <div className={styles.header_block}>
                <BubbleButton 
                    onClick={() => navigate(-1)}
                    type={'button'}
                    small
                    dark
                    icon_position={'left'}
                    icon={'arrow-back'}
                >
                    Back
                </BubbleButton>
            </div>

            {user.subscriptionStatus && 
                <div className={styles.status_block}>
                    <p>Subscription Status: <span className={styles[user.subscriptionStatus]}>{user.subscriptionStatus}</span></p>

                    {subscriptionExpired ? (
                        <p>Active Due: <span className={styles.not_active}>{user.subscriptionEndDate}</span></p>
                    ) : (
                        <p>Active Due: <span className={styles.active}>{user.subscriptionEndDate}</span></p>
                    )}
                </div>
            }

            <div className={styles.body_block}>
                <div className={styles.body_block_head}>
                    <h4>Employer Subscription</h4>
                    <div className={styles.body_block_head_price}>
                        <p>$95 <span>/ Initial month</span></p>
                        <p>$65 <span>/ Each next month</span></p>
                    </div>
                </div>
                <div className={styles.body_block_body}>
                    <List icon={'checkmark'} style={{marginBottom: 45}}>
                        <li>Get access to our best talents</li>
                    </List>

                    {content}
                </div>
            </div>

        </div>
    );
}
    
export default ProfileEmployerSubscription;