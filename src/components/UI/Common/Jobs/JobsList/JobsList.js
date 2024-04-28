import JobsCard from '../JobsCard/JobsCard';

import styles from './JobsList.module.css';

function JobsList({ children, jobs, ...props }) {

    return (
        <div {...props} className={styles.list}>
            <JobsCard key="job-1" />
            <JobsCard key="job-2" />
            <JobsCard key="job-3" />
            {/* {jobs && jobs.map((single) => (
                <JobsCard
                    key={single.id}
                    id={single.id}
                />
            ))} */}
        </div>
    );
}

export default JobsList;