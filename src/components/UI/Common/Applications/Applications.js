import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import BubbleCheckbox from '../BubbleCheckbox/BubbleCheckbox';
import ApplicationsCard from './ApplicationsCard/ApplicationsCard';
import Pagination from '../../Common/Pagination/Pagination';

import { getJobApplicationsList } from '../../../../services/jobService';

import styles from './Applications.module.css';

function Applications({ job_id, ...props }) {
    const { t } = useTranslation();

    const userToken = useSelector(state => state.user.token);
    const user = useSelector(state => state.user.user);

    const [jobId] = useState(job_id);
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const [showGoodFit, setShowGoodFit] = useState(false);
    const [showPossibleFit, setShowPossibleFit] = useState(false);
    const [showRejected, setShowRejected] = useState(false);
    const [applications, setApplications] = useState([]);
    const [applicationsTotal, setApplicationsTotal] = useState(0);

    useEffect(() => {

        getJobApplicationsList(jobId, userToken, page, 10, {
            show_good_fit: showGoodFit,
            show_possible_fit: showPossibleFit,
            show_rejected: showRejected
        })
        .then(response => {

            if (user && user.account_type === 'employer' && user.active_subscription) {
                response.applications = response.applications.map(application => {
                    application.hidden = false;
                    return application;
                });
            }
            else {
                response.applications = response.applications.map(application => {
                    application.hidden = true;

                    application.application.proposal_text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
                    application.jobseeker.full_name = 'John Doe';

                    return application;
                });

            }

            setApplications(response.applications);
            setApplicationsTotal(response.total);
            setPageCount(response.totalPages);
        })
        .catch(error => {
            console.log(error);
        });

    }, [jobId, user, userToken, page, showGoodFit, showPossibleFit, showRejected]);

    const handlePageChange = (newPage) => {
        setPage(newPage);
    }

    const handleFilterChange = (filter) => {
        setPage(1);

        switch(filter) {
            case 'good_fit':
                setShowGoodFit(!showGoodFit);
                break;
            case 'possible_fit':
                setShowPossibleFit(!showPossibleFit);
                break;
            case 'rejected':
                setShowRejected(!showRejected);
                break;
            default:
                break;
        }
    }

    return (
        <>
            <div className={styles.head}>
                <p>{t('general.UI.applications')}: {applicationsTotal}</p>
                <div>
                    <BubbleCheckbox 
                        name="good_fit"
                        color="green"
                        label={t('job.good_fit')}
                        value={showGoodFit}
                        onChange={() => handleFilterChange('good_fit')}
                    />
                    <BubbleCheckbox 
                        name="possible_fit"
                        color="yellow"
                        label={t('job.possible_fit')}
                        value={showPossibleFit}
                        onChange={() => handleFilterChange('possible_fit')}
                    />
                    <BubbleCheckbox 
                        name="rejected"
                        color="red"
                        label={t('job.rejected')}
                        value={showRejected}
                        onChange={() => handleFilterChange('rejected')}
                    />
                </div>
            </div>

            <div className={styles.body}>
                {applications.map(application => {
                    return (
                        <ApplicationsCard
                            key={`application-${application.application.id}`}
                            application={application}
                        />
                    );
                })}
            </div>

            {pageCount > 0 && <Pagination totalPages={pageCount} currentPage={page} onPageChange={handlePageChange} />}
        </>
    );
}

export default Applications;