import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import DefaultHeader from '../Headers/defautHeader';
import ScreenLoader from '../UI/Loaders/screenLoader';
import DefaultFooter from '../Footers/defaultFooter';

import styles from './defaultLayout.module.css';

function DefaultLayout() {
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
                <section className={`${styles.default_layout} fcv-${tDirection}`}>
                    <DefaultHeader />
                    <div className={styles.content + ' fcv-content'}>
                        <div className={styles.row + ' fcv-row'}>
                            <main>
                                <Outlet />
                            </main>
                        </div>
                        <i></i>
                        <i></i>
                        <i></i>
                    </div>
                    <DefaultFooter />
                </section>
            }
        </>
    );
}

export default DefaultLayout;