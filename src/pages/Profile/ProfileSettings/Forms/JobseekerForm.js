import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import Yup from '../../../../utils/yupExtensions';
import toast from 'react-hot-toast';

import { updateUser } from '../../../../services/userService';
import { fetchUserByToken } from '../../../../app/features/userSlice';
import { formatDateForMySQL } from '../../../../utils/formatHelpers';

import BasicPopup from '../../../../components/UI/Popups/BasicPopup/BasicPopup';
import LanguageForm from '../../../../components/Forms/Common/LanguageForm/LanguageForm';
import WorkExperienceForm from '../../../../components/Forms/Common/WorkExperienceForm/WorkExperienceForm';
import EducationForm from '../../../../components/Forms/Common/EducationForm/EducationForm';
import SkillsForm from '../../../../components/Forms/Common/SkillsForm/SkillsForm';

import LanguageLevelList from '../../../../components/UI/Common/LanguageLevel/LanguageLevelList/LanguageLevelList';
import WorkExperienceList from '../../../../components/UI/Common/WorkExperience/WorkExperienceList/WorkExperienceList';
import EducationList from '../../../../components/UI/Common/Education/EducationList/EducationList';
import SkillsList from '../../../../components/UI/Common/Skills/SkillsList/SkillsList';

import FormField from '../../../../components/UI/FormUI/FormField/FormField';
import FormDateField from '../../../../components/UI/FormUI/FormDateField/FormDateField';
import FormFileField from '../../../../components/UI/FormUI/FormFileField/FormFileField';
import FormSelectField from '../../../../components/UI/FormUI/FormSelectField/FormSelectField';
import FormOptionField from '../../../../components/UI/FormUI/FormOptionField/FormOptionField';
import FormImageField from '../../../../components/UI/FormUI/FormImageField/FormImageField';
import Button from '../../../../components/UI/Buttons/Button/Button';
import Subtitle from '../../../../components/UI/Common/Subtitle/Subtitle'

import styles from './Form.module.css';

import user_image_placeholder from '../../../../assets/images/other/user_image_placeholder.svg';

function JobseekerForm({user}) {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const userToken = useSelector(state => state.user.token);

    const [formLoading, setFormLoading] = useState(false);
    const [isOpenLanguagePopup, setIsOpenLanguagePopup] = useState(false);
    const [isOpenWorkExperiencePopup, setIsOpenWorkExperiencePopup] = useState(false);
    const [isOpenEducationPopup, setIsOpenEducationPopup] = useState(false);
    const [isOpenSkillsPopup, setIsOpenSkillsPopup] = useState(false);

    console.log(user);

    const formik = useFormik({
        initialValues: {
            email: user.email,
            gender: user.gender,
            birthdate: user.birth_date,
            country: user.country,
            nationality: user.nationality,
            password: '',
            password_repeat: '',
            profile_image: '',
            cv_file: '',
            cv_ref_letter: '',
            languages: user.languages,
            workExperience: user.work_experiences,
            education: user.education,
            skills: user.skills
        },
        validationSchema: Yup.object({
            country: Yup.string().required(t('general.UI.required')),
            email: Yup.string().email(t('forms.create_account.invalid_email_address')).required(t('general.UI.required')),
            gender: Yup.string().required(t('general.UI.required')),
            birthdate: Yup.string().required(t('general.UI.required')),
            nationality: Yup.string().required(t('general.UI.required')),
            password: Yup.string().min(8, t('forms.create_account.must_be_at_least_8_characters')),
            password_repeat: Yup.string().when('password', {
                is: val => (val && val.length > 0 ? true : false),
                then: schema => schema.oneOf([Yup.ref('password'), null], t('forms.create_account.passwords_must_match')).required(t('forms.create_account.required')),
                otherwise: schema => schema.notRequired()
            }),
            cv_file: Yup.mixed()
                .fileSize(1024 * 1024 * 5, t('forms.welcome_job_seeker.step_1.file_size_must_be_less_than_5MB'))
                .fileType([
                    'application/pdf', 
                    'application/msword', 
                    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                    'application/vnd.oasis.opendocument.text'
                ], t('forms.welcome_job_seeker.step_1.unsupported_file_format')),
            cv_ref_letter: Yup.mixed()
                .fileSize(1024 * 1024 * 5, t('forms.welcome_job_seeker.step_1.file_size_must_be_less_than_5MB'))
                .fileType([
                    'application/pdf', 
                    'application/msword', 
                    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                    'application/vnd.oasis.opendocument.text'
                ], t('forms.welcome_job_seeker.step_1.unsupported_file_format')),
            profile_image: Yup.mixed()
                .fileSize(1024 * 1024 * 5, t('forms.welcome_job_seeker.step_1.file_size_must_be_less_than_5MB'))
                .fileType(['image/jpg', 'image/jpeg', 'image/png'], t('forms.welcome_job_seeker.step_1.unsupported_file_format'))
        }),
        onSubmit: values => {

            if (formLoading) {
                return;
            }

            setFormLoading(true);

            const formData = new FormData();
            formData.append('token', userToken);

            if (values.profile_image && values.profile_image !== '') {
                formData.append('profile_image', values.profile_image);
            }
            if (values.cv_file && values.cv_file !== '') {
                formData.append('cv_file', values.cv_file);
            }
            if (values.cv_ref_letter && values.cv_ref_letter !== '') {
                formData.append('cv_ref_letter', values.cv_ref_letter);
            }

            formData.append('gender', values.gender);
            formData.append('country', values.country);
            formData.append('nationality', values.nationality);
            formData.append('birth_date', formatDateForMySQL(values.birthdate));

            if (values.languages.length > 0) {
                values.languages.forEach((language, index) => {
                    formData.append(`languages[${index}][languageCode]`, language.languageCode);
                    formData.append(`languages[${index}][level]`, language.level);
                });
            }

            if (values.education.length > 0) {
                values.education.forEach((education, index) => {

                    if (index < 5) {
                        formData.append(`education[${index}][institution]`, education.institution);
                        formData.append(`education[${index}][diploma]`, education.diploma);
                        formData.append(`education[${index}][start]`, education.startDate);
                        formData.append(`education[${index}][end]`, education.endDate);
                        formData.append(`education[${index}][id]`, 0);
                    }
                });
            }

            if (values.workExperience.length > 0) {
                values.workExperience.forEach((experience, index) => {
                    formData.append(`workExperience[${index}][position]`, experience.position);
                    formData.append(`workExperience[${index}][country]`, experience.country);
                    formData.append(`workExperience[${index}][company]`, experience.company);
                    formData.append(`workExperience[${index}][start]`, experience.startDate);
                    formData.append(`workExperience[${index}][end]`, experience.endDate);
                });
            }

            if (values.skills.length > 0) {
                values.skills.forEach((skill, index) => {
                    formData.append(`skills[${index}][code]`, skill.code);
                });
            }

            if (values.password) {
                formData.append('password', values.password);
            }

            toast.promise(updateUser(formData), {
                loading: "Updating profile...",
                success: <b>Profile updated!</b>,
                error: (err) => {
                    return <b>{err.response.data.error}</b>;
                },
            })
            .then(() => {
                dispatch(fetchUserByToken(userToken));
            })
            .then(() => {
                setFormLoading(false);
            })
            .catch((error) => {
                
                if (error.response.data.field) {
                    formik.setErrors({
                        [error.response.data.field]: error.response.data.error
                    });
                }

                setFormLoading(false);

            });

        },
    });

    const genderOptions = [
        { value: 'male', label: t('forms.welcome_job_seeker.step_1.male') },
        { value: 'female', label: t('forms.welcome_job_seeker.step_1.female') }
    ];

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

    const handleOptionRemove = (field, id) => {
        const filteredField = formik.values[field].filter((option) => option.id !== id);
        formik.setFieldValue(field, filteredField);
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
            <form onSubmit={formik.handleSubmit} className={styles.form_wrapper}>
                <div className={styles.col}>
                    <div className={styles.profile_image_wrapper}>
                        <FormImageField 
                            name="profile_image" 
                            type="file"
                            accept="image/jpg, image/jpeg, image/png"
                            className={styles.profile_image}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder={user.profile_image ? process.env.REACT_APP_UPLOADS_PATH + user.profile_image : user_image_placeholder}
                            value={formik.values.profile_image}
                            error={formik.touched.profile_image && formik.errors.profile_image}
                        />
                    </div>
                </div>
                <div className={styles.col}>
                    <Subtitle dark>General Information</Subtitle>
                    <div>
                        <FormField 
                            name="email" 
                            type="email" 
                            label="Email*"
                            hasBorder
                            icon={user.email_verified && 'verified'}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                            error={formik.touched.email && formik.errors.email}
                        />
                    </div>
                    <div>
                        <FormOptionField
                            name="gender"
                            label={t('forms.welcome_job_seeker.step_1.gender')}
                            type="radio"
                            dark
                            options={genderOptions}
                            onChange={formik.handleChange}
                            value={formik.values.gender}
                            error={formik.touched.gender && formik.errors.gender}
                        />
                    </div>
                    <div>
                        <FormDateField
                            name="birthdate" 
                            type="date" 
                            label="Birth Date*"
                            hasBorder
                            onChange={formik.handleChange}
                            value={formik.values.birthdate}
                            error={formik.touched.birthdate && formik.errors.birthdate}
                        />
                    </div>
                    <div>
                        <FormSelectField
                            name="country" 
                            type="country" 
                            label="Country of current residence*"
                            hasBorder
                            onFormikChange={formik.handleChange}
                            value={formik.values.country}
                            error={formik.touched.country && formik.errors.country}
                        />
                    </div>
                    <div>
                        <FormSelectField
                            name="nationality" 
                            type="nationality" 
                            label="Nationality*"
                            hasBorder
                            onFormikChange={formik.handleChange}
                            value={formik.values.nationality}
                            error={formik.touched.nationality && formik.errors.nationality}
                        />
                    </div>
                    <div>
                        <FormFileField 
                            name="cv_file" 
                            type="file" 
                            label="Resume (CV)"
                            hasBorder
                            accept=".pdf,.doc,.docx,.odt"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder={user.cv_file && user.cv_file.split('/').pop()}
                            value={formik.values.cv_file}
                            error={formik.touched.cv_file && formik.errors.cv_file}
                        />
                    </div>
                    <div>
                        <FormFileField 
                            name="cv_ref_letter" 
                            type="file" 
                            label="Reference letter"
                            hasBorder
                            accept=".pdf,.doc,.docx,.odt"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder={user.cv_ref_letter && user.cv_ref_letter.split('/').pop()}
                            value={formik.values.cv_ref_letter}
                            error={formik.touched.cv_ref_letter && formik.errors.cv_ref_letter}
                        />
                    </div>
                    <br />

                    <Subtitle 
                        dark
                        hasButton 
                        buttonText={t('general.UI.add')}
                        buttonOnClick={() => handlePopupOpen('language')}
                    >
                        {t('general.UI.languages')}
                    </Subtitle>
                    <div style={{marginBottom: 40}}>
                        <LanguageLevelList isDark languages={formik.values.languages} onRemove={handleOptionRemove} />
                    </div>

                    <Subtitle 
                        dark
                        hasButton 
                        buttonText={t('general.UI.add')}
                        buttonOnClick={() => handlePopupOpen('workExperience')}
                    >
                        {t('general.UI.work_experience')}
                    </Subtitle>
                    <div style={{marginBottom: 40}}>
                        <WorkExperienceList isDark experience={formik.values.workExperience} onRemove={handleOptionRemove} />
                    </div>

                    <Subtitle 
                        dark
                        hasButton 
                        buttonText={t('general.UI.add')}
                        buttonOnClick={() => handlePopupOpen('education')}
                    >
                        {t('general.UI.education')}
                    </Subtitle>
                    <div style={{marginBottom: 40}}>
                        <EducationList isDark education={formik.values.education} onRemove={handleOptionRemove} />
                    </div>

                    <Subtitle 
                        dark
                        hasButton 
                        buttonText={t('general.UI.add')}
                        buttonOnClick={() => handlePopupOpen('skills')}
                    >
                        {t('general.UI.skills')}
                    </Subtitle>
                    <div style={{marginBottom: 40}}>
                        <SkillsList isDark skills={formik.values.skills} onRemove={handleOptionRemove} />
                    </div>

                    <Subtitle dark>Change Password</Subtitle>
                    <div>
                        <FormField 
                            name="password" 
                            type="password" 
                            label="New Password"
                            hasBorder
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                            error={formik.touched.password && formik.errors.password}
                        />
                    </div>
                    <div>
                        <FormField 
                            name="password_repeat" 
                            type="password" 
                            label="Repeat Password"
                            hasBorder
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password_repeat}
                            error={formik.touched.password_repeat && formik.errors.password_repeat}
                        />
                    </div>

                    <div style={{textAlign: 'center'}}>
                        <Button type="submit">
                            { formLoading ? t('general.UI.loading') : t('general.UI.save') }
                        </Button>
                    </div>
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
    
export default JobseekerForm;