import { useEffect, useState } from 'react';

import JobsCard from '../JobsCard/JobsCard';
import Pagination from '../../Pagination/Pagination';
import BlockLoader from '../../../../../components/UI/Loaders/BlockLoader';

import { getJobsList } from '../../../../../services/jobService';

import styles from './JobsList.module.css';

function JobsList({ per_page, filters, onFetchJobs, children, ...props }) {
    const [loading, setLoading] = useState(true);
    const [paginationLoading, setPaginationLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        getJobsList(page, per_page, filters)
            .then((response) => {
                // console.log(response);
                setJobs(response.jobs);
                setTotalPages(response.totalPages);
                setLoading(false);
                setPaginationLoading(false);

                if (onFetchJobs) {
                    onFetchJobs({
                        total: response.total,
                        active: response.active,
                        paused: response.paused,
                        closed: response.closed
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    // eslint-disable-next-line
    }, [page, filters, per_page]);

    const handlePageChange = (page) => {
        setPage(page);
        setPaginationLoading(true);
    };

    return (
        <div {...props} className={styles.list}>
            {jobs && jobs.map((job) => {
                return <JobsCard key={job.id} job={job} disabled={paginationLoading} />;
            })}

            {loading && (Array.from({ length: per_page }, (_, index) => {
                return <BlockLoader key={index} height={320} marginBottom={20} />;
            }))}

            {totalPages > 0 && <Pagination totalPages={totalPages} currentPage={page} onPageChange={handlePageChange} />}
        </div>
    );
}

export default JobsList;