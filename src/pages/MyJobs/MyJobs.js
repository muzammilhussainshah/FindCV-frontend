import { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';

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

    const handleUpdateJobsCounters = useCallback((jobs) => {
        setJobsCounters({
            ...jobs
        });
    }, [jobsCounters]);

    return (
        <div className={styles.wrapper}>
            <h1>My Jobs</h1>

            <div className={styles.head}>
                <div>
                    <span>My Jobs: {jobsCounters.total}</span>
                    <span>Active: {jobsCounters.active}</span>
                    <span>Paused: {jobsCounters.paused}</span>
                    <span>Closed: {jobsCounters.closed}</span>
                </div>
                <div>
                    <Button to="/create-job">Post New Job</Button>
                </div>
            </div>

            <JobsList 
                per_page={10}
                filters={{
                    employer_id: user.id
                }}
                onFetchJobs={handleUpdateJobsCounters}
            />
        </div>
    );
}
    
export default MyJobs;