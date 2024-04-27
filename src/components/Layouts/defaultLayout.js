import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import styles from './defaultLayout.module.css';

function DefaultLayout() {
    const tDirection = useSelector((state) => state.translation.textDirection);

    return (
        <section className={`${styles.default_layout} fcv-${tDirection}`}>
            {/* <SignupHeader /> */}
            <div className={styles.content + ' fcv-content'}>
                <div className={styles.row + ' fcv-row'}>
                    <main>
                        <Outlet />
                    </main>
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

export default DefaultLayout;