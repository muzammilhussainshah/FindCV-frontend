import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';

import { fetchUserByToken } from '../../../app/features/userSlice';
import { updateUser } from '../../../services/userService';

import BasicPopup from '../../UI/Popups/BasicPopup/BasicPopup';
import LanguageForm from '../Common/LanguageForm/LanguageForm';
import WorkExperienceForm from '../Common/WorkExperienceForm/WorkExperienceForm';
import EducationForm from '../Common/EducationForm/EducationForm';
import SkillsForm from '../Common/SkillsForm/SkillsForm';

import LanguageLevelList from '../../UI/Common/LanguageLevel/LanguageLevelList/LanguageLevelList';
import WorkExperienceList from '../../UI/Common/WorkExperience/WorkExperienceList/WorkExperienceList';
import EducationList from '../../UI/Common/Education/EducationList/EducationList';
import SkillsList from '../../UI/Common/Skills/SkillsList/SkillsList';
import Subtitle from '../../UI/Common/Subtitle/Subtitle';
import Button from '../../UI/Buttons/Button/Button';

function JobseekerWelcomeFormStep2(props) {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const userToken = useSelector(state => state.user.token);

    const [formLoading, setFormLoading] = useState(false);
    const [isOpenLanguagePopup, setIsOpenLanguagePopup] = useState(false);
    const [isOpenWorkExperiencePopup, setIsOpenWorkExperiencePopup] = useState(false);
    const [isOpenEducationPopup, setIsOpenEducationPopup] = useState(false);
    const [isOpenSkillsPopup, setIsOpenSkillsPopup] = useState(false);

    const formik = useFormik({
        initialValues: {
            languages: [],
            workExperience: [],
            education: [],
            skills: []
        },
        onSubmit: values => {

            if (formLoading) {
                return;
            }

            setFormLoading(true);

            const formData = new FormData();
            formData.append('token', userToken);

            // languages
            if (values.languages.length > 0) {
                values.languages.forEach((language, index) => {
                    formData.append(`languages[${index}][languageCode]`, language.languageCode);
                    formData.append(`languages[${index}][level]`, language.level);
                });
            }
            else {
                formData.append('languages', '');
            }

            // work experience
            if (values.workExperience.length > 0) {
                values.workExperience.forEach((experience, index) => {
                    formData.append(`workExperience[${index}][position]`, experience.position);
                    formData.append(`workExperience[${index}][country]`, experience.country);
                    formData.append(`workExperience[${index}][company]`, experience.company);
                    formData.append(`workExperience[${index}][start]`, experience.start);
                    formData.append(`workExperience[${index}][end]`, experience.end);
                });
            }
            else {
                formData.append('workExperience', '');
            }

            toast.promise(updateUser(formData), {
                loading: "updateUser",
                success: <b>updateUser</b>,
                error: (err) => {
                    return <b>{err.response.data.error}</b>;
                },
            })
            // .then(() => {
            //     toast.promise(dispatch(fetchUserByToken(userToken)), {
            //         loading: "fetchUserByToken",
            //         success: <b>fetchUserByToken</b>,
            //         error: (err) => {
            //             return <b>{err.response.data.error}</b>;
            //         },
            //     });
            // })
            .catch((error) => {
                
                if (error.response.data.field) {
                    formik.setErrors({
                        [error.response.data.field]: error.response.data.error
                    });
                }

                setFormLoading(false);

            });

            setFormLoading(false);

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
        } else if (popupName === 'education') {
            setIsOpenEducationPopup(false);
        } else if (popupName === 'skills') {
            setIsOpenSkillsPopup(false);
        }
    }

    const handlePopupOpen = (popupName) => {
        if (popupName === 'language') {
            setIsOpenLanguagePopup(true);
        } else if (popupName === 'workExperience') {
            setIsOpenWorkExperiencePopup(true);
        } else if (popupName === 'education') {
            setIsOpenEducationPopup(true);
        } else if (popupName === 'skills') {
            setIsOpenSkillsPopup(true);
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

    const handleAddEducation = (values) => {
        formik.setFieldValue('education', [...formik.values.education, { id: Date.now(), ...values }]);
        handlePopupClose('education');
    }

    const handleAddSkills = (values) => {
        formik.setFieldValue('skills', [...formik.values.skills, ...values.skills.map((skill) => {
            return {
                id: Date.now() + '-' + skill,
                code: skill,
                name: t('general.skill.' + skill)
            }
        })]);
        handlePopupClose('skills');
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
                        buttonOnClick={() => handlePopupOpen('education')}
                    >
                        {t('general.UI.education')}
                    </Subtitle>
                    <EducationList education={formik.values.education} onRemove={handleOptionRemove} />
                </div>
                <div style={{marginBottom: 20}}>
                    <Subtitle 
                        hasButton 
                        buttonText={t('general.UI.add')}
                        buttonOnClick={() => handlePopupOpen('skills')}
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
            {isOpenEducationPopup && 
                <BasicPopup 
                    isOpen={isOpenEducationPopup}
                    closePopup={() => handlePopupClose('education')}
                >
                    <EducationForm onSubmit={handleAddEducation} />
                </BasicPopup>
            }
            {isOpenSkillsPopup && 
                <BasicPopup 
                    isOpen={isOpenSkillsPopup}
                    closePopup={() => handlePopupClose('skills')}
                >
                    <SkillsForm onSubmit={handleAddSkills} excludeSkills={formik.values.skills.map(option => option.code)} />
                </BasicPopup>
            }
        </>
    );
}

export default JobseekerWelcomeFormStep2;