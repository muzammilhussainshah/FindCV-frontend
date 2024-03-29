import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import ScreenLoader from '../Loaders/screenLoader';

const ProtectedRoute = ({ children, ...props }) => {
    const [showLoader, setShowLoader] = useState(true);
    const user = useSelector((state) => state.user.user);
    const token = useSelector((state) => state.user.token);
    const loading = useSelector((state) => state.user.loading);

    useEffect(() => {
        setTimeout(() => {
            setShowLoader(false);
        }, 1000);
    });

    if (loading || showLoader) {
        return <ScreenLoader />;
    }

    if (props.userStatus === 'loggedIn' && (!user || !token)) {
        return <Navigate to="/login" />;
    }
    if (props.userStatus === 'notLoggedIn' && (user || token)) {
        return <Navigate to="/welcome" />;
    }

    return children;
};

export default ProtectedRoute;