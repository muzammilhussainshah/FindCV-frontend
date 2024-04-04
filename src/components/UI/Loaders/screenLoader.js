import { BarLoader } from 'react-spinners';
import logoImage from '../../../assets/images/logo-white.png';

import styles from './screenLoader.module.css';

const ScreenLoader = () => {
    return (
        <div className={styles.loader}>
            <div>
                <img src={logoImage} alt="Logo" />
                <BarLoader color="#ffffff" width="100%" />
            </div>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
        </div>
    );
};

export default ScreenLoader;