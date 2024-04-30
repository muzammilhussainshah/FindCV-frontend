import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SimpleLink from '../UI/Buttons/SimpleLink/SimpleLink';
import Button from '../UI/Buttons/Button/Button';

import { logoutUser } from '../../app/features/userSlice';

import styles from './defaultHeader.module.css';

import logoImage from '../../assets/images/logo.png';
import userAvatarPlaceholder from '../../assets/images/other/user_avatar_placeholder.svg';

function DefaultHeader() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector((state) => state.user.user);
    const [isOpenDropdown, setIsOpenDropdown] = useState(false);
    
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

    const handleLogout = () => {
        dispatch(logoutUser());
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
                                    <SimpleLink onClick={toggleDropdown} to={`${user.account_type}s/${user.id}`}>Profile</SimpleLink>
                                    <SimpleLink onClick={toggleDropdown} to="/profile/settings">Settings</SimpleLink>
                                    <SimpleLink onClick={handleLogout}>Logout</SimpleLink>
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