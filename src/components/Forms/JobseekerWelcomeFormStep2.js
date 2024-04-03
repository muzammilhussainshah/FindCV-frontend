import { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import Yup from '../../utils/yupExtensions';
// import toast from 'react-hot-toast';

// import { fetchUserByToken } from '../../app/features/userSlice';
// import { updateUser } from '../../services/userService';

import LanguageLevelList from '../LanguageLevelList/LanguageLevelList';
// import Button from '../Buttons/Button/Button';

function JobseekerWelcomeFormStep2(props) {
    const { t } = useTranslation();
    const [formLoading, setFormLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            // full_name: ''
        },
        validationSchema: Yup.object({
            // full_name: Yup.string().required(t('forms.welcome_job_seeker.step_1.required'))
        }),
        onSubmit: values => {

            if (formLoading) {
                return;
            }

            setFormLoading(true);

            alert(JSON.stringify(values, null, 2));

            // setFormLoading(false);

        },
    });

    let testLanguages = [
        {
            languageCode: 'GB',
            level: '3',
            removable: true
        },
        {
            languageCode: 'ES',
            level: '2',
            removable: true
        }
    ];

    return (
        <form onSubmit={formik.handleSubmit} {...props}>
            <div>
                <LanguageLevelList languages={testLanguages} />
            </div>
        </form>
    );
}

export default JobseekerWelcomeFormStep2;