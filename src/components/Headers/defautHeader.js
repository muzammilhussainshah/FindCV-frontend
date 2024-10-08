import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SimpleLink from '../UI/Buttons/SimpleLink/SimpleLink';
import Button from '../UI/Buttons/Button/Button';
import BubbleButton from '../UI/Buttons/BubbleButton/BubbleButton';

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
        <SimpleLink href="https://findcv.com/">{t('defaultHeader.home')}</SimpleLink>
        <SimpleLink href="https://findcv.com/for-employers/">{t('defaultHeader.for_employers')}</SimpleLink>
        <SimpleLink href="https://findcv.com/for-jobseekers/">{t('defaultHeader.for_job_seekers')}</SimpleLink>
        <SimpleLink href="https://findcv.com/about/">{t('defaultHeader.about')}</SimpleLink>
    </>;


    let triggerClass = styles.trigger;
    let mobileMenuClass = styles.mobile_menu;

    if (isOpenMobileMenu) {
        triggerClass += ` ${styles.trigger_open}`;
        mobileMenuClass += ` ${styles.mobile_menu_open}`;
    }

    if (user) {

        if (user.account_type === 'employer') {

            if (user.employer_status === 'business') {
                displayName = user.company_name;
            }
            else {
                displayName = user.first_name + ' ' + user.last_name;
            }

        }
        else {
            displayName = user.first_name + ' ' + user.last_name;
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
        if (window?.FB?.logout) {
            window.FB.logout(() => { });
        }
        dispatch(logoutUser());
        dispatch(setShowLogoutButton(false));
        navigate('/login');
    }

    return (
        <header className={styles.header}>
            <div className="fcv-content">
                <div className="fcv-row">
                    <div className={styles.col}>
                        <a href="https://findcv.com">
                            <img src={logoImage} alt="FindCV logo" />
                        </a>

                        <nav>{menuItems}</nav>

                        <div className={styles.buttons}>

                            {!user ? (
                                <>
                                    <BubbleButton to="/create-job">{t('defaultHeader.post_a_jobs')}</BubbleButton>
                                    <BubbleButton to="/jobs" dark>{t('defaultHeader.find_jobs')}</BubbleButton>
                                </>
                            ) : (

                                <>
                                    {user.account_type === 'employer' ? (
                                        <>
                                            <BubbleButton to="/create-job">{t('defaultHeader.post_a_jobs')}</BubbleButton>
                                            <BubbleButton to="/profile/my-jobs" dark>{t('defaultHeader.my_jobs')}</BubbleButton>
                                        </>
                                    ) : (
                                        <>
                                            <BubbleButton to="/jobs/saved">{t('defaultHeader.saved_jobs')}</BubbleButton>
                                            <BubbleButton to="/jobs" dark>{t('defaultHeader.find_jobs')}</BubbleButton>
                                        </>
                                    )}
                                </>

                            )}

                        </div>

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
                                    <SimpleLink onClick={toggleDropdown} to={`${user.account_type}s/${user.slug}`}>{t('defaultHeader.profile')}</SimpleLink>
                                    <SimpleLink onClick={toggleDropdown} to="/profile/settings">{t('defaultHeader.settings')}</SimpleLink>
                                    {(user.account_type === 'employer') && (
                                        <SimpleLink onClick={toggleDropdown} to="/profile/subscription">{t('defaultHeader.subscription')}</SimpleLink>
                                    )}
                                    <SimpleLink onClick={handleLogout}>{t('defaultHeader.logout')}</SimpleLink>
                                </div>
                            </div>
                        ) : (
                            <>
                                <SimpleLink to="/login">{t('defaultHeader.login')}</SimpleLink>
                                <Button to="/create-account" outlined>{t('defaultHeader.signup')}</Button>
                            </>
                        )}

                        <div className={triggerClass} onClick={handleMobileMenu}>
                            <i></i><i></i><i></i>
                        </div>
                        <div className={mobileMenuClass}>
                            {menuItems}
                            {!user && (
                                <>
                                    <SimpleLink onClick={handleMobileMenu} to="/create-job">{t('defaultHeader.post_a_jobs')}</SimpleLink>
                                    <SimpleLink onClick={handleMobileMenu} to="/jobs" dark>{t('defaultHeader.find_jobs')}</SimpleLink>
                                </>
                            )}
                            {user && (
                                <>
                                    {(user.account_type === 'employer') && (
                                        <>
                                            <SimpleLink onClick={handleMobileMenu} to="/create-job">{t('defaultHeader.post_a_jobs')}</SimpleLink>
                                            <SimpleLink onClick={handleMobileMenu} to="/profile/my-jobs" dark>{t('defaultHeader.my_jobs')}</SimpleLink>
                                        </>
                                    )}
                                    {(user.account_type === 'jobseeker') && (
                                        <>
                                            <SimpleLink onClick={handleMobileMenu} to="/jobs/saved">{t('defaultHeader.saved_jobs')}</SimpleLink>
                                            <SimpleLink onClick={handleMobileMenu} to="/jobs" dark>{t('defaultHeader.find_jobs')}</SimpleLink>
                                        </>
                                    )}

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