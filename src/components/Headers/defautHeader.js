import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SimpleLink from '../UI/Buttons/SimpleLink/SimpleLink';
import Button from '../UI/Buttons/Button/Button';

import { logoutUser } from '../../app/features/userSlice';
import { setShowLogoutButton } from '../../app/features/headerUISlice';

import styles from './defaultHeader.module.css';

import logoImage from '../../assets/images/logo.png';
import userAvatarPlaceholder from '../../assets/images/other/user_avatar_placeholder.svg';

function DefaultHeader() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const user = useSelector((state) => state.user.user);
    const [isOpenDropdown, setIsOpenDropdown] = useState(false);
    const [isOpenMobileMenu, setIsOpenMobileMenu] = useState(false);
    
    let displayName = '';
    let menuItems = <>
        <SimpleLink to="/jobs">{t('defaultHeader.jobs')}</SimpleLink>
        <SimpleLink to="/jobseekers">{t('defaultHeader.jobseekers')}</SimpleLink>
    </>;
    

    let triggerClass = styles.trigger;
    let mobileMenuClass = styles.mobile_menu;

    if (isOpenMobileMenu) {
        triggerClass += ` ${styles.trigger_open}`;
        mobileMenuClass += ` ${styles.mobile_menu_open}`;
    }

    if (user) {
        
        if (user.account_type === 'employer') {
            menuItems = <>
                <SimpleLink to="/profile/my-jobs">{t('defaultHeader.my_jobs')}</SimpleLink>
                <SimpleLink to="/create-job">{t('defaultHeader.post_a_jobs')}</SimpleLink>
                <SimpleLink to="/jobseekers">{t('defaultHeader.jobseekers')}</SimpleLink>
            </>;

            if (user.employer_status === 'business') {
                displayName = user.company_name;
            }
            else {
                displayName = user.name;
            }

        }
        else {
            menuItems = <>
                <SimpleLink to="/jobs">{t('defaultHeader.jobs')}</SimpleLink>
                <SimpleLink to="/jobs/saved">{t('defaultHeader.saved_jobs')}</SimpleLink>
            </>;

            displayName = user.full_name;
        }

    }

    const toggleDropdown = () => {
        setIsOpenDropdown(!isOpenDropdown);
        window.scrollTo(0, 0);
    }

    const handleMobileMenu = () => {
        if (isOpenMobileMenu) {
            window.scrollTo(0, 0);
        }
        setIsOpenMobileMenu(!isOpenMobileMenu);
    }

    const handleLogout = () => {
        dispatch(logoutUser());
        dispatch(setShowLogoutButton(false));
        navigate('/login');
    }
    
    return (
        <header className={styles.header}>
            <div className="fcv-content">
                <div className="fcv-row">
                    <div className={styles.col}>
                        <img src={logoImage} alt="FindCV logo" />
                        
                        <nav>{menuItems}</nav>
                    </div>
                    <div className={styles.col}>
                        {user ? (
                            <div className={styles.header_user}>
                                <div className={`${styles.header_user_main} ${isOpenDropdown ? styles.open : ''}`} onClick={toggleDropdown}>
                                    {user.profile_image ? (
                                        <img src={process.env.REACT_APP_UPLOADS_PATH + user.profile_image} alt="User avatar" />
                                    ) : (
                                        <img src={userAvatarPlaceholder} alt="User avatar" />
                                    )}
                                    <span>{displayName.length > 10 ? `${displayName.substring(0, 10)}...` : displayName}</span>
                                </div>
                                <div className={`${styles.header_user_drop} ${isOpenDropdown ? styles.open : ''}`}>
                                    <SimpleLink onClick={toggleDropdown} to={`${user.account_type}s/${user.id}`}>{t('defaultHeader.profile')}</SimpleLink>
                                    <SimpleLink onClick={toggleDropdown} to="/profile/settings">{t('defaultHeader.settings')}</SimpleLink>
                                    {(user.account_type === 'employer') && (
                                        <SimpleLink onClick={toggleDropdown} to="/profile/subscription">{t('defaultHeader.subscription')}</SimpleLink>
                                    )}
                                    <SimpleLink onClick={handleLogout}>{t('defaultHeader.logout')}</SimpleLink>
                                </div>
                            </div>
                        ) : (
                            <Button to="/login">{t('defaultHeader.login')}</Button>
                        )}

                        <div className={triggerClass} onClick={handleMobileMenu}>
                            <i></i><i></i><i></i>
                        </div>
                        <div className={mobileMenuClass}>
                            {menuItems}
                            {user && (
                                <>
                                    <SimpleLink onClick={handleMobileMenu} to={`${user.account_type}s/${user.id}`}>{t('defaultHeader.profile')}</SimpleLink>
                                    <SimpleLink onClick={handleMobileMenu} to="/profile/settings">{t('defaultHeader.settings')}</SimpleLink>
                                    {(user.account_type === 'employer') && (
                                        <SimpleLink onClick={handleMobileMenu} to="/profile/subscription">{t('defaultHeader.subscription')}</SimpleLink>
                                    )}
                                    <SimpleLink onClick={() => {
                                        handleMobileMenu();
                                        handleLogout();
                                    }}>{t('defaultHeader.logout')}</SimpleLink>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default DefaultHeader;