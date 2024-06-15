import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import WorkExperienceList from '../../WorkExperience/WorkExperienceList/WorkExperienceList';
import LanguageLevelList from '../../LanguageLevel/LanguageLevelList/LanguageLevelList';
import EducationList from '../../Education/EducationList/EducationList';
import SkillsList from '../../Skills/SkillsList/SkillsList';
import LogicTestBar from '../../LogicTestBar/LogicTestBar';
import FlatButton from '../../../Buttons/FlatButton/FlatButton';
import Button from '../../../Buttons/Button/Button';

import styles from './ApplicationPopup.module.css';

import user_image_placeholder from '../../../../../assets/images/other/user_image_placeholder.svg';
import download_icon from '../../../../../assets/images/icons/download.svg';
import calendar_icon from '../../../../../assets/images/icons/calendar_sm.svg';
import location_icon from '../../../../../assets/images/icons/location.svg';
import passport_icon from '../../../../../assets/images/icons/passport.svg';
import gender_icon from '../../../../../assets/images/icons/gender.svg';
import email_icon from '../../../../../assets/images/icons/email.svg';

function ApplicationPopup({ jobseeker, ...props }) {
    const { t } = useTranslation();
    const user = useSelector((state) => state.user);
    const [jobseekerData, setJobseekerData] = useState(null);

    useEffect(() => {

        if (jobseeker) {
            const _jobseeker = {...jobseeker};

            _jobseeker.languages = _jobseeker.languages.map((language) => {
                return {
                    id: _jobseeker.id + '-' + language.languageCode,
                    languageCode: language.languageCode,
                    level: language.level
                };
            });

            _jobseeker.education = _jobseeker.education.map((diploma) => {
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

            _jobseeker.skills = _jobseeker.skills.map((skill) => {
                console.log(skill);
                return {
                    id: _jobseeker.id + '-skill-' + skill.skill_code,
                    code: skill.skill_code
                };
            });

            _jobseeker.age = new Date().getFullYear() - new Date(_jobseeker.birth_date).getFullYear();

            if (user.user && ((parseInt(user.user.id, 10) === parseInt(_jobseeker.id, 10) && user.user.account_type === 'jobseeker') || (user.user.account_type === 'employer' && user.user.active_subscription))) {
                _jobseeker.hidden = false;
            }
            else {
                _jobseeker.hidden = true;
                _jobseeker.email = 'example@gmail.com';
                _jobseeker.full_name = 'Anonymous';
                _jobseeker.cv_file = '404/';
                _jobseeker.cv_ref_letter = '404/';

                _jobseeker.education = _jobseeker.education.map((diploma) => {
                    return {
                        id: _jobseeker.id + '-diploma' + diploma.id,
                        diploma: {
                            name: 'Diploma Name.pdf'
                        },
                        institution: 'University Name',
                        startDate: '2018',
                        endDate: '2022'
                    };
                });
            }

            setJobseekerData(_jobseeker);

        }

    }, [user, jobseeker]);

    let containerClasses = [styles.jobseeker_profile];
    let blurredBoxClasses = [];

    if (jobseekerData) {
        if (jobseekerData.verification_status) {
            containerClasses.push(styles.jobseeker_profile_verified);
        }

        if (jobseekerData.hidden) {
            containerClasses.push(styles.jobseeker_profile_hidden);
            blurredBoxClasses.push(styles.blurred);
        }
    }

    return (
        <>
            {jobseekerData && (
                <div className={containerClasses.join(' ')}>

                    <div className={styles.jobseeker_profile_head}>

                        {jobseekerData.profile_image ? (
                            <img className={styles.jobseeker_profile_image} src={process.env.REACT_APP_UPLOADS_PATH + jobseekerData.profile_image} alt={jobseekerData.full_name} />
                        ) : (
                            <img className={styles.jobseeker_profile_image} src={user_image_placeholder} alt={jobseekerData.full_name} />
                        )}

                        <div>
                            <h4>{jobseekerData.full_name}</h4>

                            <ul className={styles.jobseeker_profile_list}>
                                <li>
                                    <img src={email_icon} alt="Email" />
                                    <span>{jobseekerData.email}</span>
                                </li>
                                <li>
                                    <img src={location_icon} alt="Country" />
                                    <span>{t('general.country.' + jobseekerData.country)}</span>
                                </li>
                                <li>
                                    <img src={passport_icon} alt="Nationality" />
                                    <span>{t('general.nationality.' + jobseekerData.nationality)}</span>
                                </li>
                                <li>
                                    <img src={gender_icon} alt="Gender" />
                                    <span>{t('general.UI.' + jobseekerData.gender)}</span>
                                </li>
                                <li>
                                    <img src={calendar_icon} alt="Birth Date" />
                                    <span>{jobseekerData.age} {t('job_seeker.years_old')}</span>
                                </li>
                            </ul>
                        </div>

                    </div>

                    <div className={styles.jobseeker_profile_desc}>
                        {jobseekerData.hidden && <p style={{marginBottom: 45}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>}
                        {(!jobseekerData.hidden && jobseekerData.description) && <div style={{marginBottom: 45}} dangerouslySetInnerHTML={{__html: jobseekerData.description}} />}
                        {(jobseekerData.hidden && user.user) && <Button to="/profile/subscription">{t('job_seeker.upgrade_subscription_plan')}</Button>}
                        {(jobseekerData.hidden && !user.user) && <Button to="/login">{t('job_seeker.create_account_for_access')}</Button>}
                    </div>

                    {jobseekerData.work_experiences && (
                        <>
                            <h4>{t('job_seeker.working_experience')}</h4>
                            <WorkExperienceList experience={jobseekerData.work_experiences} style={{marginBottom: 35}} />
                        </>
                    )}

                    {jobseekerData.languages && (
                        <>
                            <h4>{t('job_seeker.languages')}</h4>
                            <LanguageLevelList languages={jobseekerData.languages} style={{marginBottom: 35}} />
                        </>
                    )}

                    {jobseekerData.education && (
                        <>
                            <h4>{t('job_seeker.education')}</h4>
                            <EducationList className={blurredBoxClasses} enableLinks education={jobseekerData.education} style={{marginBottom: 35}} />
                        </>
                    )}

                    {jobseekerData.skills && (
                        <>
                            <h4>{t('job_seeker.skills')}</h4>
                            <SkillsList skills={jobseekerData.skills} style={{marginBottom: 35}} />
                        </>
                    )}

                    {jobseekerData.logic_test_result && (
                        <div style={{marginBottom: 50}}>
                            <h4>{t('job_seeker.work_proficiency_test')}</h4>
                            <LogicTestBar fill={jobseekerData.logic_test_result} style={{background: '#fff'}} />
                        </div>
                    )}

                    {(jobseekerData.cv_file || jobseekerData.cv_ref_letter) && (
                        <div className={styles.jobseeker_profile_buttons}>

                            {jobseekerData.cv_file && 
                                <FlatButton 
                                    disabled={jobseekerData.hidden} 
                                    icon={download_icon} 
                                    href={process.env.REACT_APP_UPLOADS_PATH + jobseekerData.cv_file} 
                                    download 
                                    target="_blank">
                                    {t('job_seeker.download_cv')}
                                </FlatButton>}

                            {jobseekerData.cv_ref_letter && 
                                <FlatButton 
                                    disabled={jobseekerData.hidden} 
                                    icon={download_icon} 
                                    href={process.env.REACT_APP_UPLOADS_PATH + jobseekerData.cv_ref_letter} 
                                    download 
                                    target="_blank">
                                    {t('job_seeker.download_reference_letter')}
                                </FlatButton>}

                        </div>
                    )}
                </div>
            )}
        </>
    );
}

export default ApplicationPopup;