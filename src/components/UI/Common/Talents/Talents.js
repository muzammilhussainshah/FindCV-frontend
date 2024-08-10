import deepEqual from 'deep-equal';
import { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import TalentCard from './TalentCard/TalentCard';
import Pagination from '../Pagination/Pagination';
import BlockLoader from '../../../../components/UI/Loaders/BlockLoader';

import { getTalentsList } from '../../../../services/TalentsService';

import styles from './Talents.module.css';

function Talents({ per_page, max_pages, hide_url_params = false, filters = {}, onPageChange, ...props }) {
    const navigate = useNavigate();
    const location = useLocation();

    // const userToken = useSelector(state => state.user.token);
    const user = useSelector(state => state.user.user);

    const query = new URLSearchParams(location.search);
    const initialPage = parseInt(query.get('page')) || 1;

    const [loading, setLoading] = useState(true);
    const [paginationLoading, setPaginationLoading] = useState(false);
    const [page, setPage] = useState(initialPage);
    const [filtersList, setFiltersList] = useState(filters);
    const [totalPages, setTotalPages] = useState(0);
    const [count, setCount] = useState(0);
    const [talents, setTalents] = useState([]);

    const updateURL = useCallback((params) => {
        delete params.include_ids;
        delete params.exclude_ids;

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
        getTalentsList(page, per_page, max_pages, filters)
            .then((response) => {
                // console.log(response);

                setTalents(response.talents.map((talent) => {

                    if (talent.languages) {
                        talent.languages = talent.languages.map((language) => {
                            return { 
                                ...language, 
                                id: talent.user_id + '-' + language.languageCode
                            };
                        });
                    }

                    if (talent.skills) {
                        talent.skills = talent.skills.map((skill) => {
                            return { 
                                ...skill, 
                                code: skill.skill_code,
                                id: skill.user_id + '-' + skill.skill_code
                            };
                        });
                    }

                    if (user && user.account_type === 'employer' && user.active_subscription) {
                        //
                    }
                    else {
                        talent.hidden = true;
                        talent.first_name = 'John';
                        talent.last_name = 'Doe';
                        talent.description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
                    }

                    return talent;
                }));

                // console.log(response);

                setCount(response.total);
                setTotalPages(response.totalPages);
                setLoading(false);
                setPaginationLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
    // eslint-disable-next-line
    }, [page, filtersList, per_page]);

    const handlePageChange = (value) => {
        setPage(value);
        setPaginationLoading(true);

        // Scroll to first card
        const target = document.querySelector('.pagination_scroll_target');
        if (target) {
            window.scrollTo(0, target.offsetTop);
        }

        if (!hide_url_params) {
            updateURL({ page: value, ...filtersList });
        }
    };

    return (
        <div {...props} className={styles.list}>
            {talents && talents.map((talent) => {
                return <TalentCard key={'talent-' + talent.id} talent={talent} disabled={paginationLoading} />;
            })}

            {loading && (Array.from({ length: per_page }, (_, index) => {
                return <BlockLoader key={index} height={280} marginBottom={20} />;
            }))}

            {count === 0 && !loading && <div className={styles.no_results}>No candidates found</div>}

            {totalPages > 0 && <Pagination totalPages={totalPages} currentPage={page} onPageChange={handlePageChange} />}
        </div>
    );
}

export default Talents;