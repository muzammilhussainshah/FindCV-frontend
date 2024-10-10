import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
    useSelector,
    useDispatch
} from 'react-redux';

import styles from './signupHeader.module.css';
import logoImage from '../../assets/images/logo-white.png';
import BubbleButton from '../UI/Buttons/BubbleButton/BubbleButton';
import LanguageSwitch from '../UI/LanguageSwitch/LanguageSwitch';
import { setShowLogoutButton } from '../../app/features/headerUISlice';
import {
    logoutUser,
    setUser
} from '../../app/features/userSlice';

function SignupHeader() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const backButtonLink = useSelector((state) => state.headerUI.backButtonLink);
    const showLogoutButton = useSelector((state) => state.headerUI.showLogoutButton);

    const handleLogout = () => {
        dispatch(logoutUser());
        dispatch(setShowLogoutButton(false));
        navigate('/login');
    };

    return (
        <header className={styles.header}>
            <div className="fcv-content">
                <div className="fcv-row">
                    <div className={styles.col}>
                        <img src={logoImage} alt="FindCV logo" />
                    </div>
                    <div className={styles.col}>
                        <LanguageSwitch />
                        {backButtonLink && <BubbleButton
                            icon={'arrow-back'}
                            icon_position={'left'}
                            iconOnlyOnMobile
                            callBack={() => { dispatch(setUser(null)) }}
                            to={backButtonLink}
                            style={{ marginLeft: 20 }}>
                            {t('signupHeader.back')}
                        </BubbleButton>}
                        {showLogoutButton && <BubbleButton
                            icon={'logout-white'}
                            icon_position={'left'}
                            iconOnlyOnMobile
                            onClick={handleLogout}
                            style={{ marginLeft: 20 }}
                        >
                            {t('signupHeader.logout')}
                        </BubbleButton>}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default SignupHeader;