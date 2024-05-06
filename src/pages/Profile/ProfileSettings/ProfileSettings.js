import { useSelector } from 'react-redux';
import EmployerForm from './Forms/EmployerForm';
import JobseekerForm from './Forms/JobseekerForm';

function ProfileSettings() {
    const user = useSelector(state => state.user.user);

    return (
        <>
            <h1 style={{textAlign: 'center', marginBottom: 50}}>Edit Profile</h1>
            {user?.account_type === 'employer' && <EmployerForm user={user} />}
            {user?.account_type === 'jobseeker' && <JobseekerForm user={user} />}
        </>
    );
}
    
export default ProfileSettings;