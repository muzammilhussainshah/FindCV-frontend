import { useState } from 'react';
import { useSelector } from 'react-redux';
import SimpleLink from '../UI/Buttons/SimpleLink/SimpleLink';
import Button from '../UI/Buttons/Button/Button';

import styles from './defaultHeader.module.css';

import logoImage from '../../assets/images/logo.png';
import userAvatarPlaceholder from '../../assets/images/other/user_avatar_placeholder.svg';

function DefaultHeader() {
    const user = useSelector((state) => state.user.user);
    const [isOpenDropdown, setIsOpenDropdown] = useState(false);
    // user.account_type
    
    let displayName = '';
    let menuItems = <>
        <SimpleLink to="/jobs">Jobs List</SimpleLink>
        <SimpleLink to="/talents">Discover Employees</SimpleLink>
    </>;

    if (user) {
        
        if (user.account_type === 'employer') {
            menuItems = <>
                <SimpleLink to="/my-jobs">My Jobs</SimpleLink>
                <SimpleLink to="/post-a-jobs">Post a Job</SimpleLink>
                <SimpleLink to="/talents">Discover Employees</SimpleLink>
            </>;

            if (user.employer_status === 'business') {
                displayName = user.company_name;
            }
            else {
                displayName = user.name;
            }

        }
        else {
            displayName = user.name;
        }

    }

    const toggleDropdown = () => {
        setIsOpenDropdown(!isOpenDropdown);
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
                                        <img src={user.profile_image} alt="User avatar" />
                                    ) : (
                                        <img src={userAvatarPlaceholder} alt="User avatar" />
                                    )}
                                    <span>{displayName.length > 10 ? `${displayName.substring(0, 10)}...` : displayName}</span>
                                </div>
                                <div className={`${styles.header_user_drop} ${isOpenDropdown ? styles.open : ''}`}>
                                    <SimpleLink to="/profile">Profile</SimpleLink>
                                    <SimpleLink to="/settings">Settings</SimpleLink>
                                    <SimpleLink onClick={() => {console.log('test')}}>Logout</SimpleLink>
                                </div>
                            </div>
                        ) : (
                            <Button to="/login">Login</Button>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default DefaultHeader;