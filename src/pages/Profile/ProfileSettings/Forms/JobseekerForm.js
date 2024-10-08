import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import Yup from '../../../../utils/yupExtensions';
import toast from 'react-hot-toast';

import { updateUser } from '../../../../services/userService';
import { getQuestions } from '../../../../services/logicTestService';
import { fetchUserByToken } from '../../../../app/features/userSlice';
import { formatDateForMySQL } from '../../../../utils/formatHelpers';

import BasicPopup from '../../../../components/UI/Popups/BasicPopup/BasicPopup';
import LanguageForm from '../../../../components/Forms/Common/LanguageForm/LanguageForm';
import WorkExperienceForm from '../../../../components/Forms/Common/WorkExperienceForm/WorkExperienceForm';
import EducationForm from '../../../../components/Forms/Common/EducationForm/EducationForm';
import SkillsForm from '../../../../components/Forms/Common/SkillsForm/SkillsForm';
import OccupationsForm from '../../../../components/Forms/Common/OccupationsForm/OccupationsForm';
import VerificationProcess from '../../../../components/Verification/VerificationProcess/VerificationProcess';

import LanguageLevelList from '../../../../components/UI/Common/LanguageLevel/LanguageLevelList/LanguageLevelList';
import WorkExperienceList from '../../../../components/UI/Common/WorkExperience/WorkExperienceList/WorkExperienceList';
import EducationList from '../../../../components/UI/Common/Education/EducationList/EducationList';
import SkillsList from '../../../../components/UI/Common/Skills/SkillsList/SkillsList';
import OccupationsList from '../../../../components/UI/Common/Occupations/OccupationsList/OccupationsList';
import LogicTestBar from '../../../../components/UI/Common/LogicTestBar/LogicTestBar';
import LogicTestForm from '../../../../components/Forms/Common/LogicTestForm/LogicTestForm';

import FormField from '../../../../components/UI/FormUI/FormField/FormField';
import FormRichTextField from '../../../../components/UI/FormUI/FormRichTextField/FormRichTextField';
import FormDateField from '../../../../components/UI/FormUI/FormDateField/FormDateField';
import FormFileField from '../../../../components/UI/FormUI/FormFileField/FormFileField';
import FormSelectField from '../../../../components/UI/FormUI/FormSelectField/FormSelectField';
import FormOptionField from '../../../../components/UI/FormUI/FormOptionField/FormOptionField';
import FormImageField from '../../../../components/UI/FormUI/FormImageField/FormImageField';

import Notice from '../../../../components/UI/Common/Notice/Notice';
import Button from '../../../../components/UI/Buttons/Button/Button';
import BubbleButton from '../../../../components/UI/Buttons/BubbleButton/BubbleButton';
import Subtitle from '../../../../components/UI/Common/Subtitle/Subtitle'

import styles from './Form.module.css';

import user_image_placeholder from '../../../../assets/images/other/user_image_placeholder.svg';
import user_verified_icon from '../../../../assets/images/icons/check_white.svg';

function JobseekerForm({user}) {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const language = useSelector((state) => state.translation.language);
    const userToken = useSelector(state => state.user.token);

    const [formLoading, setFormLoading] = useState(false);

    const [isOpenLanguagePopup, setIsOpenLanguagePopup] = useState(false);
    const [isOpenWorkExperiencePopup, setIsOpenWorkExperiencePopup] = useState(false);
    const [isOpenEducationPopup, setIsOpenEducationPopup] = useState(false);
    const [isOpenSkillsPopup, setIsOpenSkillsPopup] = useState(false);
    const [isOpenOccupationsPopup, setIsOpenOccupationsPopup] = useState(false);
    const [isOpenLogicTestPopup, setIsOpenLogicTestPopup] = useState(false);
    const [isOpenVerificationPopup, setIsOpenVerificationPopup] = useState(false);

    const [isTestLoading, setIsTestLoading] = useState(false);
    const [showTest, setShowTest] = useState(false);
    const [testOptions, setTestOptions] = useState([]);
    const [answersToken, setAnswersToken] = useState('');

    const genderOptions = [
        { value: 'male', label: t('forms.welcome_job_seeker.step_1.male') },
        { value: 'female', label: t('forms.welcome_job_seeker.step_1.female') }
    ];

    let isLogicMoreThan30Days = true;

    if (user.logic_test_request_date) {
        const logicTestRequestDate = new Date(user.logic_test_request_date);
  
        const currentDate = new Date();
        const thirtyDaysAgo = new Date(currentDate.setDate(currentDate.getDate() - 30));

        isLogicMoreThan30Days = logicTestRequestDate < thirtyDaysAgo;
    }

    const formik = useFormik({
        initialValues: {
            profile_visibility: user.profile_visibility ? true : false,
            description: user.description,
            email: user.email,
            gender: user.gender,
            birthdate: user.birth_date,
            country: user.country,
            nationality: user.nationality,
            working_title: user.working_title,
            password: '',
            password_repeat: '',
            profile_image: '',
            cv_file: '',
            cv_ref_letter: '',
            languages: user.languages,
            workExperience: user.work_experiences,
            education: user.education,
            skills: user.skills,
            occupations: user.occupations,
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

            if (user.email !== values.email) {
                formData.append('email', values.email);
            }

            if (values.profile_image && values.profile_image !== '') {
                formData.append('profile_image', values.profile_image);
            }
            if (values.cv_file && values.cv_file !== '') {
                formData.append('cv_file', values.cv_file);
            }
            if (values.cv_ref_letter && values.cv_ref_letter !== '') {
                formData.append('cv_ref_letter', values.cv_ref_letter);
            }

            formData.append('working_title', values.working_title);
            formData.append('profile_visibility', values.profile_visibility);
            formData.append('gender', values.gender);
            formData.append('country', values.country);
            formData.append('nationality', values.nationality);
            formData.append('description', values.description);
            formData.append('birth_date', formatDateForMySQL(values.birthdate));

            if (values.languages.length > 0) {
                values.languages.forEach((language, index) => {
                    formData.append(`languages[${index}][languageCode]`, language.languageCode);
                    formData.append(`languages[${index}][level]`, language.level);
                });
            }
            else {
                formData.append('languages', '');
            }

            if (values.education.length > 0) {
                values.education.forEach((education, index) => {

                    if (index < 5) {

                        if (education?.action === 'add_new') {
                            formData.append(`education[${index}][institution]`, education.institution);
                            formData.append(`education[${index}][education_level]`, education.education_level);
                            formData.append(`education[${index}][diploma]`, education.diploma);
                            formData.append(`education[${index}][start]`, education.startDate);
                            formData.append(`education[${index}][end]`, education.endDate);
                            formData.append(`education[${index}][id]`, 0);
                        }
                        else {
                            formData.append(`education[${index}][id]`, education.id);
                        }

                    }
                });
            }
            else {
                formData.append('education', '');
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
            else {
                formData.append('workExperience', '');
            }

            if (values.skills.length > 0) {
                values.skills.forEach((skill, index) => {
                    formData.append(`skills[${index}][code]`, skill.code);
                });
            }
            else {
                formData.append('skills', '');
            }

            if (values.occupations.length > 0) {
                values.occupations.forEach((occupation, index) => {
                    formData.append(`occupations[${index}][code]`, occupation.occupation_code);
                });
            }
            else {
                formData.append('occupations', '');
            }

            if (values.password) {
                formData.append('password', values.password);
            }

            toast.promise(updateUser(formData), {
                loading: t('edit_profile.updating_profile'),
                success: <b>{t('edit_profile.profile_updated')}</b>,
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
                
                if (error?.response?.data?.field) {
                    formik.setErrors({
                        [error.response.data.field]: error.response.data.error
                    });
                }

                setFormLoading(false);

            });

        },
    });

    const handlePopupClose = (popupName) => {
        if (popupName === 'language') {
            setIsOpenLanguagePopup(false);
        } else if (popupName === 'workExperience') {
            setIsOpenWorkExperiencePopup(false);
        } else if (popupName === 'education') {
            setIsOpenEducationPopup(false);
        } else if (popupName === 'skills') {
            setIsOpenSkillsPopup(false);
        } else if (popupName === 'occupations') {
            setIsOpenOccupationsPopup(false);
        } else if (popupName === 'logicTest') {
            setIsOpenLogicTestPopup(false);
        } else if (popupName === 'verification') {
            setIsOpenVerificationPopup(false);
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
        } else if (popupName === 'occupations') {
            setIsOpenOccupationsPopup(true);
        } else if (popupName === 'logicTest') {
            setIsOpenLogicTestPopup(true);
        } else if (popupName === 'verification') {
            setIsOpenVerificationPopup(true);
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
        formik.setFieldValue('education', [...formik.values.education, { id: Date.now(), action: 'add_new', ...values }]);
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

    const handleAddOccupations = (values) => {
        formik.setFieldValue('occupations', [...formik.values.occupations, ...values.occupations.map((occupation) => {
            return {
                id: Date.now() + '-' + occupation,
                occupation_code: occupation,
                name: t('general.job_category.' + occupation)
            }
        })]);
        console.log(formik.values.occupations);
        handlePopupClose('occupations');
    }

    const handleStartTest = () => {
        setIsTestLoading(true);

        toast.promise(getQuestions({ token: userToken, language: language }), {
            loading: t('forms.welcome_job_seeker.step_3.generationg_test'),
            success: <b>{t('forms.welcome_job_seeker.step_3.test_ready')}</b>,
            error: (err) => {
                return <b>{err.response.data.error}</b>;
            },
        })
        .then((data) => {
            let questions = [];
            
            if (data.questions) {

                if (data.questions.questions) {
                    questions = data.questions.questions.map((question, index) => {
                        return {
                            id: index,
                            question: question.question,
                            answers: Object.entries(question.answers).map(([key, value]) => {
                                return { label: value, value: key };
                            })
                        }
                    });
                }
                else {
                    questions = data.questions.map((question, index) => {
                        return {
                            id: index,
                            question: question.question,
                            answers: Object.entries(question.answers).map(([key, value]) => {
                                return { label: value, value: key };
                            })
                        }
                    });
                }

                setAnswersToken(data.answers_token);
                setTestOptions(questions);

                setShowTest(true);
                setIsTestLoading(false);
            }

        })
        .catch((error) => {
            toast.error(error.response.data.error);
            setIsTestLoading(false);
        });

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

                    {user.verification_status === 'approved' ? (
                        <div className={styles.profile_verified}>
                            <img src={user_verified_icon} alt="verified" />
                            <span>{t('edit_profile.job_seeker.verified')}</span>
                        </div>
                    ) : (
                        <BubbleButton onClick={() => handlePopupOpen('verification')} style={{width: '100%', marginBottom: 15}}>{t('edit_profile.job_seeker.verify_profile')}</BubbleButton>
                    )}

                    <div className={styles.profile_visibility}>
                        <FormOptionField 
                            name="profile_visibility"
                            dark
                            type="checkbox"
                            options={[
                                { value: true, label: t('edit_profile.job_seeker.show_profile_in_results') },
                            ]}
                            onChange={formik.handleChange}
                            value={formik.values.profile_visibility}
                        />
                    </div>
                </div>
                <div className={styles.col}>

                    {user.verification_status === 'declined' && <Notice warning>{t('edit_profile.job_seeker.profile_verification_denied')}</Notice>}
                    {user.verification_status === 'submitted' && <Notice warning>{t('edit_profile.job_seeker.profile_verification_pending')}</Notice>}

                    <Subtitle dark>{t('edit_profile.job_seeker.general_information_title')}</Subtitle>
                    <div>
                        <FormField 
                            name="email" 
                            type="email" 
                            label={t('edit_profile.job_seeker.email')}
                            hasBorder
                            icon={user.email_verified && 'verified'}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                            error={formik.touched.email && formik.errors.email}
                        />
                        
                        {!user.email_verified && <Notice warning>{t('edit_profile.job_seeker.email_notice')}</Notice>}
                    </div>
                    <div>
                        <FormField 
                            name="working_title" 
                            type="text" 
                            label={t('edit_profile.job_seeker.working_title')}
                            hasBorder
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.working_title}
                            error={formik.touched.working_title && formik.errors.working_title}
                        />
                    </div>
                    <div>
                        <FormRichTextField
                            name="description"
                            label={t('edit_profile.job_seeker.description')}
                            hasBorder
                            onFormikChange={formik.handleChange}
                            value={formik.values.description}
                            error={formik.touched.description && formik.errors.description}
                        />
                    </div>
                    <div>
                        <FormOptionField
                            name="gender"
                            label={t('edit_profile.job_seeker.gender')}
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
                            label={t('edit_profile.job_seeker.birthdate')}
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
                            label={t('edit_profile.job_seeker.country')}
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
                            label={t('edit_profile.job_seeker.nationality')}
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
                            label={t('edit_profile.job_seeker.cv_file')}
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
                            label={t('edit_profile.job_seeker.cv_ref_letter')}
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
                        buttonOnClick={() => handlePopupOpen('occupations')}
                    >
                        {t('general.UI.occupations')}
                    </Subtitle>
                    <div style={{marginBottom: 40}}>
                        <OccupationsList isDark occupations={formik.values.occupations} onRemove={handleOptionRemove} />
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

                    <Subtitle 
                        dark
                        hasButton 
                        buttonText={t('general.UI.try_again')}
                        buttonOnClick={() => handlePopupOpen('logicTest')}
                    >
                        {t('edit_profile.job_seeker.work_proficiency_test_title')}
                    </Subtitle>
                    <div style={{marginBottom: 50}}>
                        <LogicTestBar fill={user.logic_test_result} />
                    </div>

                    <Subtitle dark>{t('edit_profile.job_seeker.change_password_title')}</Subtitle>
                    <div>
                        <FormField 
                            name="password" 
                            type="password" 
                            label={t('edit_profile.job_seeker.password')}
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
                            label={t('edit_profile.job_seeker.password_repeat')}
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
            {isOpenOccupationsPopup && 
                <BasicPopup 
                    isOpen={isOpenOccupationsPopup}
                    closePopup={() => handlePopupClose('occupations')}
                >
                    <OccupationsForm onSubmit={handleAddOccupations} excludeOccupations={formik.values.occupations.map(option => option.code)} />
                </BasicPopup>
            }
            {isOpenLogicTestPopup && 
                <BasicPopup 
                    isOpen={isOpenLogicTestPopup}
                    closePopup={() => handlePopupClose('logicTest')}
                    style={{maxHeight: '80vh', overflowY: 'auto'}}
                >
                    {isLogicMoreThan30Days ? (

                        showTest ? (
                            <LogicTestForm isDark questions={testOptions} answersToken={answersToken} callback={() => handlePopupClose('logicTest')} />
                        ) : (
                            <div style={{textAlign: 'center'}}>
                                <h6 style={{marginBottom: 15}}>{t('edit_profile.job_seeker.work_proficiency_test_title')}</h6>
                                <Button type="button" onClick={handleStartTest}>
                                    {isTestLoading ? t('general.UI.loading') : t('forms.welcome_job_seeker.step_3.take_test')}
                                </Button>
                            </div>
                        )

                    ) : (
                        <h6 style={{textAlign: 'center', marginBottom: 0}}>{t('forms.welcome_job_seeker.step_3.test_frequency')}</h6>
                    )}
                </BasicPopup>
            }
            {isOpenVerificationPopup && 
                <BasicPopup
                    className={styles.verification_popup}
                    isOpen={isOpenVerificationPopup}
                    closePopup={() => handlePopupClose('verification')}
                >
                    <VerificationProcess finish_callback={() => handlePopupClose('verification')} />
                </BasicPopup>
            }
        </>
    );
}
    
export default JobseekerForm;