import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import BubbleButton from '../Buttons/BubbleButton/BubbleButton';
import { logoutUser } from '../../app/features/userSlice';
import { setShowLogoutButton } from '../../app/features/headerUISlice';

import styles from './signupHeader.module.css';

import logoImage from '../../assets/images/logo-white.png';

function SignupHeader() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const backButtonLink = useSelector((state) => state.headerUI.backButtonLink);
    const showLogoutButton = useSelector((state) => state.headerUI.showLogoutButton);

    const handleLogout = () => {
        dispatch(logoutUser());
        dispatch(setShowLogoutButton(false));
        navigate('/');
    };
    
    return (
        <header className={styles.header}>
            <div className="fcv-content">
                <div className="fcv-row">
                    <div className={styles.col}>
                        <img src={logoImage} alt="FindCV logo" />
                    </div>
                    <div className={styles.col}>
                        {backButtonLink && <BubbleButton icon={'arrow-back'} icon_position={'left'} to={backButtonLink}>Back</BubbleButton>}
                        {showLogoutButton && <BubbleButton onClick={handleLogout} style={{ marginLeft: 20 }}>Logout</BubbleButton>}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default SignupHeader;