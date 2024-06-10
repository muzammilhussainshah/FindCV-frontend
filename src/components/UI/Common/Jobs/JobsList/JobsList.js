import deepEqual from 'deep-equal';
import { useEffect, useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import JobsCard from '../JobsCard/JobsCard';
import Pagination from '../../Pagination/Pagination';
import BlockLoader from '../../../../../components/UI/Loaders/BlockLoader';

import { getJobsList } from '../../../../../services/jobService';

import styles from './JobsList.module.css';

function JobsList({ per_page, max_pages, hide_url_params = false, filters, onPageChange, onFetchJobs, children, ...props }) {
    const navigate = useNavigate();
    const location = useLocation();

    const query = new URLSearchParams(location.search);
    const initialPage = parseInt(query.get('page')) || 1;

    const [loading, setLoading] = useState(true);
    const [paginationLoading, setPaginationLoading] = useState(false);
    const [page, setPage] = useState(initialPage);
    const [filtersList, setFiltersList] = useState(filters);
    const [totalPages, setTotalPages] = useState(0);
    const [jobs, setJobs] = useState([]);

    const updateURL = useCallback((params) => {
        delete params.employer_id;
        delete params.include_ids;
        delete params.exclude_ids;
        delete params.status;

        const searchParams = new URLSearchParams(params);
        navigate(`?${searchParams.toString()}`);
    }, [navigate]);

    useEffect(() => {

        if (!deepEqual(filters, filtersList)) {
            setFiltersList(filters);
            setPage(1);

            if (!hide_url_params) {
                updateURL({ page: 1, ...filters });
            }
        }

    }, [filters, hide_url_params, filtersList, page, updateURL]);

    useEffect(() => {
        getJobsList(page, per_page, max_pages, filters)
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
    }, [page, filtersList, per_page]);

    const handlePageChange = (value) => {
        setPage(value);
        setPaginationLoading(true);

        if (!hide_url_params) {
            updateURL({ page: value, ...filtersList });
        }
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