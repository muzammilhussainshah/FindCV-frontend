import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { useGetQueryParam } from '../../utils/utilityHooks';

const ProtectedRoute = ({ children, ...props }) => {
    const user = useSelector((state) => state.user.user);
    const token = useSelector((state) => state.user.token);
    const loading = useSelector((state) => state.user.loading);

    const emailToken = useGetQueryParam('token') || false;

    if (props.userStatus === 'loggedIn' && (!user || !token) && !loading) {
        return <Navigate to={`/login${emailToken !== false ? '?token=' + emailToken : ''}`} />;
    }
    if (props.userStatus === 'notLoggedIn' && (user || token) && !loading) {
        return <Navigate to="/welcome" />;
    }
    if (props.userRole && user.account_type !== props.userRole && !loading) {
        return <Navigate to="/welcome" />;
    }

    return children;
};

export default ProtectedRoute;