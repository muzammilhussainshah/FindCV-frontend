import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import toast from 'react-hot-toast';

import { requestTransaction } from '../../../../services/paymentService';
import { fetchUserByToken } from '../../../../app/features/userSlice';

import Button from '../../../UI/Buttons/Button/Button';

import styles from './PaymentForm.module.css';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        backgroundColor: "#fff",
        color: "#093559",
        lineHeight: "40px",
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: "antialiased",
        fontWeight: "500",
        fontSize: "16px",
        "::placeholder": {
          color: "#093559"
        }
      },
      invalid: {
        color: "#C8102E",
        iconColor: "#C8102E"
      }
    }
  };

function PaymentForm({ actionType, ...props}) {
    return (
        <Elements stripe={stripePromise}>
            <StripeForm actionType={actionType} />
        </Elements>
    );
}

function StripeForm({ actionType, ...props }) {
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const userToken = useSelector(state => state.user.token);

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!stripe || !elements || loading) {
            return;
        }

        setLoading(true);
        setError(null);

        const cardElement = elements.getElement(CardElement);

        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            // console.log('[error]', error);
            // translate error messages
            setError(error.message);
            setLoading(false);
        } else {
            
            toast.promise(requestTransaction({ token: userToken, paymentMethod, actionType }), {
                loading: t('general.UI.loading'),
                success: <b>{t('general.UI.success')}</b>,
                error: (err) => {
                    return <b>{err.error}</b>;
                },
            })
            .then((data) => {
                dispatch(fetchUserByToken(userToken));
                setLoading(false);
            })
            .catch((err) => {
                toast.error(t('general.UI.something_went_wrong'));
                setLoading(false);
            });

        }

    }

    return (
        <form onSubmit={handleSubmit} {...props}>
            <div className={styles.cardFields}>
                <CardElement options={CARD_ELEMENT_OPTIONS} />
                {error && <div className={styles.error}>{error}</div>}
            </div>
            <div style={{textAlign: 'center'}}>
                <Button type="submit">
                    {loading ? t('general.UI.loading') : t('general.UI.purchase')}
                </Button>
            </div>
        </form>
    );
}

export default PaymentForm;