import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { useGetJobCategoriesHook } from '../../utils/utilityHooks';

import JobsList from '../../components/UI/Common/Jobs/JobsList/JobsList';
import FormSelectField from '../../components/UI/FormUI/FormSelectField/FormSelectField';
import FormField from '../../components/UI/FormUI/FormField/FormField';

import styles from './Jobs.module.css';

function Jobs() {
    const { t } = useTranslation();
    const location = useLocation();

    const query = new URLSearchParams(location.search);
    const initialSortby = query.get('sortby') || 'relevance';
    const initialSearch = query.get('search') || '';
    let initialJobType = query.getAll('job_type') || [];
    let initialJobCategory = query.getAll('category') || [];
    let initialJobCountry = query.getAll('country') || [];
    let initialJobLanguage = query.getAll('language') || [];

    if (initialJobCategory.length) {
        initialJobCategory = initialJobCategory[0].split(',');
    }

    if (initialJobCountry.length) {
        initialJobCountry = initialJobCountry[0].split(',');
    }

    if (initialJobLanguage.length) {
        initialJobLanguage = initialJobLanguage[0].split(',');
    }

    if (initialJobType.length) {
        initialJobType = initialJobType[0].split(',');
    }

    const [jobsFoundTotal, setJobsFoundTotal] = useState(0);
    const [sortby, setSortby] = useState(initialSortby);
    const [search, setSearch] = useState(initialSearch);
    const [jobType, setJobType] = useState(initialJobType);
    const [jobCategory, setJobCategory] = useState(initialJobCategory);
    const [jobCountry, setJobCountry] = useState(initialJobCountry);
    const [jobLanguage, setJobLanguage] = useState(initialJobLanguage);

    const handleUpdateJobsCounters = useCallback((jobs) => {
        setJobsFoundTotal(jobs.total);
    }, []);

    const handleSortbyChange = (value) => {
        setSortby(value);
    }

    const handleFilterSearchChange = (value) => {
        setSearch(value.target.value);
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

    const categoryOptions = [...useGetJobCategoriesHook()];
    const sortbyOptions = [
        { value: 'relevance', label: t('jobs.relevance') },
        { value: 'newest', label: t('jobs.newest') },
        { value: 'oldest', label: t('jobs.oldest') },
        { value: 'salary', label: t('jobs.salary') }
    ];
    const jobTypeOptions = [
        { value: 'full_time', label: t('general.UI.full_time') },
        { value: 'part_time', label: t('general.UI.part_time') },
        { value: 'remote', label: t('general.UI.remote') }
    ];

    const filters = {};

    if (sortby !== 'relevance') {
        filters.sortby = sortby;
    }
    if (jobType !== 'all') {
        filters.job_type = jobType;
    }
    if (search !== '') {
        filters.search = search;
    }
    if (jobCategory.length > 0) {
        filters.category = jobCategory;
    }
    if (jobCountry.length > 0) {
        filters.country = jobCountry;
    }
    if (jobLanguage.length > 0) {
        filters.language = jobLanguage;
    }

    return (
        <div className={styles.wrapper}>
            <Helmet>
                <title>FindCV - Jobs</title>
            </Helmet>
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
                                <FormField
                                    name="filter_search"
                                    label={t('jobs.search')}
                                    type="text"
                                    hasBorder
                                    icon="search"
                                    onChange={handleFilterSearchChange}
                                    value={search}
                                />
                            </div>
                            <div>
                                <FormSelectField
                                    name="filter_job_type"
                                    placeholder={t('general.UI.select')}
                                    label={t('jobs.job_type')}
                                    type="default"
                                    isMulti
                                    hasBorder
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
                                    isMulti
                                    hasBorder
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
                                    options={['QA', 'AE', 'SA', 'BH', 'KW', 'OM']}
                                    isMulti
                                    hasBorder
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
                                    hasBorder
                                    onFormikChange={handleFilterChange}
                                    value={jobLanguage}
                                />
                            </div>
                        </form>
                    </div>

                </div>

                <div className={`${styles.col} pagination_scroll_target`}>
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
                        filters={filters}
                        onFetchJobs={handleUpdateJobsCounters}
                    />
                </div>

            </div>

        </div>
    );
}

export default Jobs;