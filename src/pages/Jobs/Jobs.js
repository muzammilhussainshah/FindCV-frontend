import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { useGetJobCategoriesHook } from '../../utils/utilityHooks';

import JobsList from '../../components/UI/Common/Jobs/JobsList/JobsList';
import FormSelectField from '../../components/UI/FormUI/FormSelectField/FormSelectField';

import styles from './Jobs.module.css';

function Jobs() {
    const { t } = useTranslation();

    const [jobsFoundTotal, setJobsFoundTotal] = useState(0);
    const [sortby, setSortby] = useState('relevance');
    const [jobType, setJobType] = useState('all');
    const [jobCategory, setJobCategory] = useState('all');
    const [jobCountry, setJobCountry] = useState([]);
    const [jobLanguage, setJobLanguage] = useState([]);

    const handleUpdateJobsCounters = useCallback((jobs) => {
        setJobsFoundTotal(jobs.total);
    }, []);

    const handleSortbyChange = (value) => {
        setSortby(value);
    }

    const handleFilterChange = (value) => {
        
        switch (value.target.name) {
            case 'filter_job_type':
                setJobType(value.target.value);
                break;
            case 'filter_category':
                setJobCategory(value.target.value);
                break;
            case 'filter_country':
                setJobCountry(value.target.value);
                break;
            case 'filter_language':
                setJobLanguage(value.target.value);
                break;
            default:
                break;
        }

    }

    const categoryOptions = [{ value: 'all', label: t('general.UI.all') }, ...useGetJobCategoriesHook()];
    const sortbyOptions = [
        { value: 'relevance', label: t('jobs.relevance') },
        { value: 'newest', label: t('jobs.newest') },
        { value: 'oldest', label: t('jobs.oldest') },
        { value: 'salary', label: t('jobs.salary') }
    ];
    const jobTypeOptions = [
        { value: 'all', label: t('general.UI.all') },
        { value: 'full_time', label: t('general.UI.full_time') },
        { value: 'part_time', label: t('general.UI.part_time') },
        { value: 'remote', label: t('general.UI.remote') }
    ];

    return (
        <div className={styles.wrapper}>
            <h1>{t('jobs.title')}</h1>

            <div className={styles.content}>

                <div className={styles.col}>

                    <div className={styles.sidebar}>
                        <div className={styles.sidebar_head}>
                            <span></span>
                            <h5>{t('jobs.filters')}</h5>
                        </div>
                        <form>
                            <div>
                                <FormSelectField
                                    name="filter_job_type"
                                    placeholder={t('general.UI.select')}
                                    label={t('jobs.job_type')}
                                    type="default"
                                    options={jobTypeOptions}
                                    onFormikChange={handleFilterChange}
                                    value={jobType}
                                />
                            </div>
                            <div>
                                <FormSelectField
                                    name="filter_category"
                                    placeholder={t('general.UI.select')}
                                    label={t('jobs.category')}
                                    type="default"
                                    options={categoryOptions}
                                    onFormikChange={handleFilterChange}
                                    value={jobCategory}
                                />
                            </div>
                            <div>
                                <FormSelectField
                                    name="filter_country"
                                    placeholder={t('general.UI.select')}
                                    label={t('jobs.country')}
                                    type="country"
                                    isMulti
                                    onFormikChange={handleFilterChange}
                                    value={jobCountry}
                                />
                            </div>
                            <div>
                                <FormSelectField
                                    name="filter_language"
                                    placeholder={t('general.UI.select')}
                                    label={t('jobs.language')}
                                    type="language"
                                    isMulti
                                    onFormikChange={handleFilterChange}
                                    value={jobLanguage}
                                />
                            </div>
                        </form>
                    </div>

                </div>

                <div className={styles.col}>
                    <div className={styles.head}>
                        <div>
                            <p>{t('jobs.jobs_found')} <span>{jobsFoundTotal}</span></p>
                        </div>
                        <div>
                            <p>{t('jobs.sort_by')}</p>
                            <FormSelectField
                                name="sortby"
                                placeholder={t('general.UI.select')}
                                type="default"
                                options={sortbyOptions}
                                onChange={handleSortbyChange}
                                value={sortby}
                            />
                        </div>
                    </div>

                    <JobsList 
                        per_page={10}
                        filters={{
                            sortby: sortby,
                            job_type: jobType,
                            category: jobCategory,
                            country: jobCountry,
                            language: jobLanguage
                        }}
                        onFetchJobs={handleUpdateJobsCounters}
                    />
                </div>

            </div>

        </div>
    );
}
    
export default Jobs;