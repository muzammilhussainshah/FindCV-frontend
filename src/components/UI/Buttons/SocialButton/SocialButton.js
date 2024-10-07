import FacebookLogin from 'react-facebook-login';

import styles from './SocialButton.module.css';
import FacebookWhite from '../../../../assets/images/icons/facebook-white.svg';

function SocialButton({ type, callBack }) {
    return (
        <div className={styles.fbButtonContainerStyle}>
            {type === 'facebook' &&
                <FacebookLogin
                    appId={process.env.REACT_APP_FB_APP_ID}
                    autoLoad={true}
                    fields="name,email,picture"
                    cssClass={styles.fbButtonContainer}
                    textButton={''}
                    icon={<img src={FacebookWhite} alt="facebook-icon" />}
                    callback={callBack} />
            }
        </div>
    );

}
export default SocialButton;
