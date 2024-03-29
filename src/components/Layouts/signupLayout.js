import SignupHeader from '../Headers/signupHeader';
import styles from './signupLayout.module.css';

import backgroundImage from '../../assets/images/login-bg.jpg';

function SignupLayout({ children }) {
    return (
        <section className={styles.signup_layout}>
            <SignupHeader />
            <div className={styles.content + ' fcv-content'}>
                <div className={styles.row + ' fcv-row'}>
                    <div className={styles.col}>
                        <main>{children}</main>
                    </div>
                    <div className={styles.col}>
                        <img src={backgroundImage} alt="background" />
                    </div>
                </div>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
            </div>
        </section>
    );
}

export default SignupLayout;
  