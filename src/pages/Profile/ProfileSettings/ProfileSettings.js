import { useSelector } from 'react-redux';
import EmployerForm from './Forms/EmployerForm';

function ProfileSettings() {
    const user = useSelector(state => state.user.user);

    return (
        <>
            <h1 style={{textAlign: 'center', marginBottom: 50}}>Edit Profile</h1>
            {user?.account_type === 'employer' && <EmployerForm user={user} />}
        </>
    );
}
    
export default ProfileSettings;