import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import SignupHeader from '../Headers/signupHeader';
import ScreenLoader from '../UI/Loaders/screenLoader';
import styles from './signupLayout.module.css';

import backgroundImage from '../../assets/images/login-bg.jpg';

function SignupLayout() {
    const [showLoader, setShowLoader] = useState(true);
    const tDirection = useSelector((state) => state.translation.textDirection);
    const loading = useSelector((state) => state.user.loading);

    useEffect(() => {
        setTimeout(() => {
            setShowLoader(false);
        }, 1000);
    });

    return (
        <>
            {loading || showLoader ? <ScreenLoader /> : null}
            {!loading &&
                <section className={`${styles.signup_layout} fcv-${tDirection}`}>
                    <SignupHeader />
                    <div className={styles.content + ' fcv-content'}>
                        <div className={styles.row + ' fcv-row'}>
                            <div className={styles.col}>
                                <main>
                          asdasd
                                </main>
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
            }
        </>
    );
}

export default SignupLayout;