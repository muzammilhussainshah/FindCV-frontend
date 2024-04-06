import { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import Yup from '../../../utils/yupExtensions';
// import toast from 'react-hot-toast';

// import { fetchUserByToken } from '../../app/features/userSlice';
// import { updateUser } from '../../services/userService';

import BasicPopup from '../../UI/Popups/BasicPopup/BasicPopup';
import LanguageForm from '../Common/LanguageForm/LanguageForm';
import WorkExperienceForm from '../Common/WorkExperienceForm/WorkExperienceForm';

import LanguageLevelList from '../../UI/Common/LanguageLevel/LanguageLevelList/LanguageLevelList';
import WorkExperienceList from '../../UI/Common/WorkExperience/WorkExperienceList/WorkExperienceList';
import EducationList from '../../UI/Common/Education/EducationList/EducationList';
import SkillsList from '../../UI/Common/Skills/SkillsList/SkillsList';
import Subtitle from '../../UI/Common/Subtitle/Subtitle';
import Button from '../../UI/Buttons/Button/Button';

function JobseekerWelcomeFormStep2(props) {
    const { t } = useTranslation();
    const [formLoading, setFormLoading] = useState(false);
    const [isOpenLanguagePopup, setIsOpenLanguagePopup] = useState(false);
    const [isOpenWorkExperiencePopup, setIsOpenWorkExperiencePopup] = useState(false);

    const formik = useFormik({
        initialValues: {
            languages: [],
            workExperience: [],
            education: [
                // {
                //     id: 1,
                //     institution: 'Harvard University',
                //     startDate: '2018',
                //     endDate: '2020',
                // }
            ],
            skills: [
                // {
                //     id: 1,
                //     name: 'Works well under pressure',
                // }
            ]
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

    const handleOptionRemove = (field, id) => {
        const filteredField = formik.values[field].filter((option) => option.id !== id);
        formik.setFieldValue(field, filteredField);
    }

    const handlePopupClose = (popupName) => {
        if (popupName === 'language') {
            setIsOpenLanguagePopup(false);
        } else if (popupName === 'workExperience') {
            setIsOpenWorkExperiencePopup(false);
        }
    }

    const handlePopupOpen = (popupName) => {
        if (popupName === 'language') {
            setIsOpenLanguagePopup(true);
        } else if (popupName === 'workExperience') {
            setIsOpenWorkExperiencePopup(true);
        }
    }

    const handleAddLanguage = (values) => {

        // check if language already exists
        const languageExists = formik.values.languages.find((language) => language.languageCode === values.languageCode);

        if (!languageExists) {
            formik.setFieldValue('languages', [...formik.values.languages, { id: Date.now(), ...values }]);
            handlePopupClose('language');
        }

    }

    const handleAddWorkExperience = (values) => {
        formik.setFieldValue('workExperience', [...formik.values.workExperience, { id: Date.now(), ...values }]);
        handlePopupClose('workExperience');
    }

    return (
        <>
            <form onSubmit={formik.handleSubmit} {...props}>
                <div style={{marginBottom: 20}}>
                    <Subtitle 
                        hasButton 
                        buttonText={t('general.UI.add')}
                        buttonOnClick={() => handlePopupOpen('language')}
                    >
                        {t('general.UI.languages')}
                    </Subtitle>
                    <LanguageLevelList languages={formik.values.languages} onRemove={handleOptionRemove} />
                </div>
                <div style={{marginBottom: 20}}>
                    <Subtitle 
                        hasButton 
                        buttonText={t('general.UI.add')}
                        buttonOnClick={() => handlePopupOpen('workExperience')}
                    >
                        {t('general.UI.work_experience')}
                    </Subtitle>
                    <WorkExperienceList experience={formik.values.workExperience} onRemove={handleOptionRemove} />
                </div>
                <div style={{marginBottom: 20}}>
                    <Subtitle 
                        hasButton 
                        buttonText={t('general.UI.add')}
                        buttonOnClick={() => alert('Add Education')}
                    >
                        {t('general.UI.education')}
                    </Subtitle>
                    <EducationList education={formik.values.education} onRemove={handleOptionRemove} />
                </div>
                <div style={{marginBottom: 20}}>
                    <Subtitle 
                        hasButton 
                        buttonText={t('general.UI.add')}
                        buttonOnClick={() => alert('Add Skills')}
                    >
                        {t('general.UI.skills')}
                    </Subtitle>
                    <SkillsList skills={formik.values.skills} onRemove={handleOptionRemove} />
                </div>
                <div>
                    <Button type="submit" style={{display: 'block'}}>
                        {formLoading ? t('general.UI.please_wait') : t('general.UI.proceed')}
                    </Button>
                </div>
            </form>

            {isOpenLanguagePopup && 
                <BasicPopup 
                    isOpen={isOpenLanguagePopup}
                    closePopup={() => handlePopupClose('language')}
                >
                    <LanguageForm onSubmit={handleAddLanguage} />
                </BasicPopup>
            }
            {isOpenWorkExperiencePopup && 
                <BasicPopup 
                    isOpen={isOpenWorkExperiencePopup}
                    closePopup={() => handlePopupClose('workExperience')}
                >
                    <WorkExperienceForm onSubmit={handleAddWorkExperience} />
                </BasicPopup>
            }
        </>
    );
}

export default JobseekerWelcomeFormStep2;