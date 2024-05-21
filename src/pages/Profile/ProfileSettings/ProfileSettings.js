import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import EmployerForm from './Forms/EmployerForm';
import JobseekerForm from './Forms/JobseekerForm';

function ProfileSettings() {
    const { t } = useTranslation();
    const user = useSelector(state => state.user.user);

    return (
        <>
            <h1 style={{textAlign: 'center', marginBottom: 50}}>{t('edit_profile.edit_profile')}</h1>
            {user?.account_type === 'employer' && <EmployerForm user={user} />}
            {user?.account_type === 'jobseeker' && <JobseekerForm user={user} />}
        </>
    );
}
    
export default ProfileSettings;