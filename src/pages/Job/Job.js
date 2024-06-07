import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { getJob } from '../../services/jobService';
import { getTimeAgo, getCurrencySymbol } from '../../utils/formatHelpers';

import Flag from 'react-flags';
import Subtitle from '../../components/UI/Common/Subtitle/Subtitle'
import LanguageLevelList from '../../components/UI/Common/LanguageLevel/LanguageLevelList/LanguageLevelList';
import SkillsList from '../../components/UI/Common/Skills/SkillsList/SkillsList';
import Table from '../../components/UI/Common/Table/Table';
import BubbleButton from '../../components/UI/Buttons/BubbleButton/BubbleButton';
import Button from '../../components/UI/Buttons/Button/Button';
import BlockLoader from '../../components/UI/Loaders/BlockLoader';

import styles from './Job.module.css';

import category_icon from '../../assets/images/icons/job_categories/construction.svg';

function Job() {
    const { id } = useParams();
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [job, setJob] = useState(null);

    useEffect(() => {

        getJob(id)
            .then((response) => {
                response.skills = response.skills.map(skill => {
                    return {
                        id: skill.skill_code + '-' + skill.job_id,
                        job_id: skill.job_id,
                        code: skill.skill_code
                    }
                });

                console.log(response);
                setJob(response);
            })
            .catch((error) => {
                console.log(error);
            });

    }, [id]);

    const handleBackClick = () => {
        navigate(-1);
    };

    const handleApplyClick = () => {
        console.log('handleApplyClick');
    };

    const infoTableData = [];
    let date = '';

    if (job) {

        if (job?.createdAt) {
            const date_info = getTimeAgo(new Date(job.createdAt));
            date = t('general.UI.posted') + ' ';
    
            if (date_info.unit_plural === 'second' || date_info.unit_plural === 'seconds') {
                date += t('general.UI.just_now');
            }
            else {
                date += date_info.count + ' ' + t('general.UI.' + date_info.unit_plural) + ' ' + t('general.UI.ago');
            }
    
        }

        if (job?.country) {
            infoTableData.push({
                key: 'country',
                label: 'Country',
                value: (
                    <>
                        <Flag 
                            name={job.country}
                            format="svg"
                            shiny={false}
                            basePath="/vendor/flags"
                        /> {t('general.country.' + job.country)}
                    </>
                )
            });
        }

        if (job?.city) {
            infoTableData.push({
                key: 'city',
                label: 'City/Town/Village',
                value: job.city
            });
        }

        if (job?.job_type) {
            infoTableData.push({
                key: 'job_type',
                label: 'Job Type',
                value: t('general.UI.' + job.job_type)
            });
        }

        let salary = '';
        let salary_period = t('general.UI.month');
        const currency = getCurrencySymbol(job.currency);

        if (job.salary_low !== job.salary_high) {
            salary = currency + job.salary_low + ' - ' + currency + job.salary_high;
        }
        else {
            salary = currency + job.salary_low;
        }

        if (job.payment_type === 'hourly') {
            salary_period = t('general.UI.hour');
        }

        if (salary !== '') {
            infoTableData.push({
                key: 'salary',
                label: 'Salary',
                value: (
                    <>
                        {salary} /<span style={{opacity: 0.5, marginLeft: 5}}>{salary_period}</span>
                    </>
                )
            });
        }

        let working_hours = '';

        if (job.hours_low !== job.hours_high) {
            working_hours = job.hours_low + ' - ' + job.hours_high;
        }
        else {
            working_hours = job.hours_low;
        }

        if (working_hours !== '') {
            infoTableData.push({
                key: 'working_hours',
                label: 'Working hours / week',
                value: working_hours
            });
        }

    }

    return (
        <>
            {job ? (
                <div className={styles.wrapper}>
                    <div className={styles.head}>
                        <div>
                            <BubbleButton 
                                onClick={handleBackClick}
                                small
                                dark
                                icon="arrow-back"
                                icon_position="left"
                            >
                                Back
                            </BubbleButton>
                        </div>
                        <div>
                            <BubbleButton 
                                onClick={handleApplyClick}
                                small
                            >
                                Apply
                            </BubbleButton>
                        </div>
                    </div>
                    <div className={styles.body}>

                        <div className={styles.job_head}>
                            <div className={styles.job_head_icon}>
                                <img src={category_icon} alt="Category Icon" />
                            </div>
                            <div>
                                <h1>Pool cleaner</h1>
                                <p>Beautiful Pools Co.</p>
                            </div>
                        </div>

                        <p className={styles.job_date}>{date}</p>

                        <Subtitle dark>Description</Subtitle>
                        <div className={styles.job_description} dangerouslySetInnerHTML={{__html: job.description}}></div>

                        <Subtitle dark style={{marginBottom: 0}}>Valuable Information</Subtitle>
                        <Table data={infoTableData} style={{marginBottom: 30}} />

                        <Subtitle dark>Language Requirements</Subtitle>
                        <LanguageLevelList languages={job.languages} style={{marginBottom: 30}} />

                        <Subtitle dark>Required Skills</Subtitle>
                        <SkillsList skills={job.skills} />

                        <div className={styles.job_apply}>
                            <Button>Apply</Button>
                        </div>

                    </div>
                </div>
            ) : (
                <div className={styles.wrapper}>
                    <BlockLoader height={60} marginBottom={20}/>
                    <BlockLoader height={800} marginBottom={50}/>
                </div>
            )}
        </>
    );
}
    
export default Job;