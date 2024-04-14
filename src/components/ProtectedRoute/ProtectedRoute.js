import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, ...props }) => {
    const user = useSelector((state) => state.user.user);
    const token = useSelector((state) => state.user.token);

    if (props.userStatus === 'loggedIn' && (!user || !token)) {
        return <Navigate to="/login" />;
    }
    if (props.userStatus === 'notLoggedIn' && (user || token)) {
        return <Navigate to="/welcome" />;
    }

    return children;
};

export default ProtectedRoute;