import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';

import { getUser } from '../../../services/userService';

import WorkExperienceList from '../../../components/UI/Common/WorkExperience/WorkExperienceList/WorkExperienceList';
import LanguageLevelList from '../../../components/UI/Common/LanguageLevel/LanguageLevelList/LanguageLevelList';
import EducationList from '../../../components/UI/Common/Education/EducationList/EducationList';
import SkillsList from '../../../components/UI/Common/Skills/SkillsList/SkillsList';
import BlockLoader from '../../../components/UI/Loaders/BlockLoader';
import LogicTestBar from '../../../components/UI/Common/LogicTestBar/LogicTestBar';
import FlatButton from '../../../components/UI/Buttons/FlatButton/FlatButton';
import Button from '../../../components/UI/Buttons/Button/Button';

import styles from './JobseekerProfile.module.css';

import user_image_placeholder from '../../../assets/images/other/user_image_placeholder.svg';
import download_icon from '../../../assets/images/icons/download.svg';
import calendar_icon from '../../../assets/images/icons/calendar_sm.svg';
import location_icon from '../../../assets/images/icons/location.svg';
import passport_icon from '../../../assets/images/icons/passport.svg';
import gender_icon from '../../../assets/images/icons/gender.svg';

function JobseekerProfile() {
    const { t } = useTranslation();
    const { id } = useParams();
    const user = useSelector(state => state.user);

    const [jobseeker, setJobseeker] = useState(null);

    useEffect(() => {

        if (!user.loading) {

            getUser('jobseeker', id)
                .then((response) => {
                    // console.log(response);

                    response.languages = response.languages.map((language) => {
                        return {
                            id: id + '-' + language.languageCode,
                            languageCode: language.languageCode,
                            level: language.level
                        };
                    });

                    response.education = response.education.map((diploma) => {
                        return {
                            id: diploma.id,
                            diploma: {
                                name: diploma.diploma
                            },
                            institution: diploma.institution,
                            startDate: diploma.start,
                            endDate: diploma.end
                        };
                    });

                    response.skills = response.skills.map((skill) => {
                        return {
                            id: id + '-skill-' + skill.skill_code,
                            code: skill.skill_code
                        };
                    });

                    response.age = new Date().getFullYear() - new Date(response.birth_date).getFullYear();

                    if (user.user && ((parseInt(user.user.id, 10) === parseInt(id, 10) && user.user.account_type === 'jobseeker') || (user.user.account_type === 'employer' && user.user.active_subscription))) {
                        response.hidden = false;
                    }
                    else {
                        response.hidden = true;
                        response.full_name = 'Anonymous';
                        response.cv_file = '404/';
                        response.cv_ref_letter = '404/';

                        response.education = response.education.map((diploma) => {
                            return {
                                id: id + '-diploma' + Math.random(),
                                diploma: {
                                    name: 'Diploma Name.pdf'
                                },
                                institution: 'University Name',
                                startDate: '2018',
                                endDate: '2022'
                            };
                        });
                    }

                    setJobseeker(response);
                })
                .catch((error) => {
                    console.log(error);
                });

        }

    }, [id, user]);

    let containerClasses = [styles.jobseeker_profile];
    let blurredBoxClasses = [];

    if (jobseeker) {
        if (jobseeker.verification_status) {
            containerClasses.push(styles.jobseeker_profile_verified);
        }

        if (jobseeker.hidden) {
            containerClasses.push(styles.jobseeker_profile_hidden);
            blurredBoxClasses.push(styles.blurred);
        }
    }

    return (
        <>
            {jobseeker ? (
                <>

                    {jobseeker.hidden ? (
                        <Helmet>
                            <title>FindCV - Employee Profile</title>
                        </Helmet>
                    ) : (
                        <Helmet>
                            <title>FindCV - {jobseeker.full_name}</title>
                        </Helmet>
                    )}

                    <div className={containerClasses.join(' ')}>
                        <div className={styles.jobseeker_profile_col}>
                            {jobseeker.profile_image ? (
                                <img className={styles.jobseeker_profile_image} src={process.env.REACT_APP_UPLOADS_PATH + jobseeker.profile_image} alt={jobseeker.full_name} style={{marginBottom: 10}} />
                            ) : (
                                <img className={styles.jobseeker_profile_image} src={user_image_placeholder} alt={jobseeker.full_name} style={{marginBottom: 10}} />
                            )}

                            <h2>{jobseeker.full_name}</h2>

                            <ul className={styles.jobseeker_profile_list}>
                                <li>
                                    <img src={location_icon} alt="Country" />
                                    <span>{t('general.country.' + jobseeker.country)}</span>
                                </li>
                                <li>
                                    <img src={passport_icon} alt="Nationality" />
                                    <span>{t('general.nationality.' + jobseeker.nationality)}</span>
                                </li>
                                <li>
                                    <img src={gender_icon} alt="Gender" />
                                    <span>{t('general.UI.' + jobseeker.gender)}</span>
                                </li>
                                <li>
                                    <img src={calendar_icon} alt="Birth Date" />
                                    <span>{jobseeker.age} {t('job_seeker.years_old')}</span>
                                </li>
                            </ul>

                            {jobseeker.cv_file && <Button 
                                href={process.env.REACT_APP_UPLOADS_PATH + jobseeker.cv_file} 
                                download 
                                disabled={jobseeker.hidden} 
                                target="_blank" 
                                style={{width: '100%', marginBottom: 10}}>
                                    {t('job_seeker.download_resume')}
                                </Button>}

                            {(jobseeker.hidden && user.user) && <Button to="/profile/subscription" style={{width: '100%'}}>{t('job_seeker.upgrade_subscription_plan')}</Button>}
                            {(jobseeker.hidden && !user.user) && <Button to="/login" style={{width: '100%'}}>{t('job_seeker.create_account_for_access')}</Button>}
                        </div>
                        <div className={styles.jobseeker_profile_col}>
                            <h1>{jobseeker.full_name}</h1>
                            <div className={styles.jobseeker_profile_desc}>
                                {jobseeker.hidden && <p style={{marginBottom: 45}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>}
                                {(!jobseeker.hidden && jobseeker.description) && <div style={{marginBottom: 45}} dangerouslySetInnerHTML={{__html: jobseeker.description}} />}
                                {(jobseeker.hidden && user.user) && <Button to="/profile/subscription">{t('job_seeker.upgrade_subscription_plan')}</Button>}
                                {(jobseeker.hidden && !user.user) && <Button to="/login">{t('job_seeker.create_account_for_access')}</Button>}
                            </div>

                            {jobseeker.work_experiences && (
                                <>
                                    <h4>{t('job_seeker.working_experience')}</h4>
                                    <WorkExperienceList isDark experience={jobseeker.work_experiences} style={{marginBottom: 35}} />
                                </>
                            )}

                            {jobseeker.languages && (
                                <>
                                    <h4>{t('job_seeker.languages')}</h4>
                                    <LanguageLevelList isDark languages={jobseeker.languages} style={{marginBottom: 35}} />
                                </>
                            )}

                            {jobseeker.education && (
                                <>
                                    <h4>{t('job_seeker.education')}</h4>
                                    <EducationList className={blurredBoxClasses} enableLinks isDark education={jobseeker.education} style={{marginBottom: 35}} />
                                </>
                            )}

                            {jobseeker.skills && (
                                <>
                                    <h4>{t('job_seeker.skills')}</h4>
                                    <SkillsList isDark skills={jobseeker.skills} style={{marginBottom: 35}} />
                                </>
                            )}

                            {jobseeker.logic_test_result && (
                                <div style={{marginBottom: 50}}>
                                    <h4>{t('job_seeker.work_proficiency_test')}</h4>
                                    <LogicTestBar fill={jobseeker.logic_test_result} />
                                </div>
                            )}

                            {(jobseeker.cv_file || jobseeker.cv_ref_letter) && (
                                <div className={styles.jobseeker_profile_buttons}>

                                    {jobseeker.cv_file && 
                                        <FlatButton 
                                            disabled={jobseeker.hidden} 
                                            icon={download_icon} 
                                            href={process.env.REACT_APP_UPLOADS_PATH + jobseeker.cv_file} 
                                            download 
                                            target="_blank">
                                            {t('job_seeker.download_cv')}
                                        </FlatButton>}

                                    {jobseeker.cv_ref_letter && 
                                        <FlatButton 
                                            disabled={jobseeker.hidden} 
                                            icon={download_icon} 
                                            href={process.env.REACT_APP_UPLOADS_PATH + jobseeker.cv_ref_letter} 
                                            download 
                                            target="_blank">
                                            {t('job_seeker.download_reference_letter')}
                                        </FlatButton>}

                                </div>
                            )}

                        </div>
                    </div>
                </>
            ) : (
                <>
                    <Helmet>
                        <title>FindCV - Employee Profile</title>
                    </Helmet>
                    <div className={styles.jobseeker_profile}>
                        <div className={styles.jobseeker_profile_col}>
                            <BlockLoader height={300} />
                        </div>
                        <div className={styles.jobseeker_profile_col}>
                            <BlockLoader height={60} marginBottom={50} />

                            <BlockLoader height={150} marginBottom={35} />

                            <h4>{t('job_seeker.working_experience')}</h4>
                            <BlockLoader height={80} marginBottom={20} />
                            <BlockLoader height={80} marginBottom={35} />

                            <h4>{t('job_seeker.languages')}</h4>
                            <BlockLoader height={50} marginBottom={15} />
                            <BlockLoader height={50} marginBottom={35} />

                            <h4>{t('job_seeker.education')}</h4>
                            <BlockLoader height={80} marginBottom={35} />

                            <h4>{t('job_seeker.skills')}</h4>
                            <div className={styles.jobseeker_profile_skills_placeholder}>
                                <BlockLoader width={210} height={30} marginBottom={15} marginRight={15} />
                                <BlockLoader width={80} height={30} marginBottom={15} marginRight={15} />
                                <BlockLoader width={170} height={30} marginBottom={15} marginRight={15} />
                                <BlockLoader width={85} height={30} marginBottom={15} marginRight={15} />
                            </div>

                            <h4 style={{marginTop: 20}}>{t('job_seeker.work_proficiency_test')}</h4>
                            <BlockLoader height={35} marginBottom={70} />
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
    
export default JobseekerProfile;