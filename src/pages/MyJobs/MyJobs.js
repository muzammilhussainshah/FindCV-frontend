import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';

import JobsList from '../../components/UI/Common/Jobs/JobsList/JobsList';
import Button from '../../components/UI/Buttons/Button/Button'

import styles from './MyJobs.module.css';

function MyJobs() {
    const [jobsCounters, setJobsCounters] = useState({
        total: 0,
        active: 0,
        paused: 0,
        closed: 0
    });
    const user = useSelector(state => state.user.user);
    const { t } = useTranslation();

    const handleUpdateJobsCounters = (jobs) => {

        if (jobsCounters.total === jobs.total) {
            return;
        }

        setJobsCounters({
            ...jobs
        });

    };

    return (
        <div className={styles.wrapper}>
            <Helmet>
                <title>FindCV - My Jobs</title>
            </Helmet>

            {user.account_type === 'employer' ? (
                <>
                    <h1>{t('my_jobs.title')}</h1>

                    <div className={styles.head}>
                        <div>
                            <span>{t('my_jobs.my_jobs')}: {jobsCounters.total}</span>
                            <span>{t('general.UI.active')}: {jobsCounters.active}</span>
                            <span>{t('general.UI.paused')}: {jobsCounters.paused}</span>
                            <span>{t('general.UI.closed')}: {jobsCounters.closed}</span>
                        </div>
                        <div>
                            <Button to="/create-job">{t('my_jobs.post_new_job')}</Button>
                        </div>
                    </div>

                    <JobsList 
                        per_page={10}
                        filters={{
                            employer_id: user.id
                        }}
                        onFetchJobs={handleUpdateJobsCounters}
                    />
                </>
            ) : (
                <>
                    <h1>{t('my_jobs.favourites_title')}</h1>

                    <div className={`${styles.head} ${styles.head_favourites}`}>
                        <div>
                            <span>{t('my_jobs.favourites_title')}: {jobsCounters.total}</span>
                        </div>
                        <div></div>
                    </div>

                    <JobsList 
                        per_page={10}
                        filters={{
                            include_ids: user.favourites.length ? user.favourites : [-1]
                        }}
                        onFetchJobs={handleUpdateJobsCounters}
                    />
                </>
            )}
        </div>
    );
}
    
export default MyJobs;