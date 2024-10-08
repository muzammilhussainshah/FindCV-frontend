import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import LinkWrapper from '../../components/wrappers/LinkWrapper';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { Helmet } from 'react-helmet';
import Yup from '../../utils/yupExtensions'; 
import toast from 'react-hot-toast';

import { updateFavourites, updateApplications } from '../../app/features/userSlice';
import { getJob, sendJobProposal, addJobToFavourites, removeJobFromFavourites, updateJobField } from '../../services/jobService';
import { getTimeAgo, getCurrencySymbol, getTrimmedName } from '../../utils/formatHelpers';

import Flag from 'react-flags';
import Subtitle from '../../components/UI/Common/Subtitle/Subtitle'
import Applications from '../../components/UI/Common/Applications/Applications';
import JobsList from '../../components/UI/Common/Jobs/JobsList/JobsList';
import LanguageLevelList from '../../components/UI/Common/LanguageLevel/LanguageLevelList/LanguageLevelList';
import SkillsList from '../../components/UI/Common/Skills/SkillsList/SkillsList';
import Table from '../../components/UI/Common/Table/Table';
import FormRichTextField from '../../components/UI/FormUI/FormRichTextField/FormRichTextField';
import BubbleButton from '../../components/UI/Buttons/BubbleButton/BubbleButton';
import IconButton from '../../components/UI/Buttons/IconButton/IconButton';
import Button from '../../components/UI/Buttons/Button/Button';
import BasicPopup from '../../components/UI/Popups/BasicPopup/BasicPopup';
import BlockLoader from '../../components/UI/Loaders/BlockLoader';

import styles from './Job.module.css';

import category_icon from '../../assets/images/icons/job_categories/construction.svg';
import star_icon from '../../assets/images/icons/star-white.svg';
import pen_icon from '../../assets/images/icons/pen-white.svg';
import pause_icon from '../../assets/images/icons/pause-white.svg';
import play_icon from '../../assets/images/icons/play-white.svg';
import close_icon from '../../assets/images/icons/close-white.svg';

function Job() {
    const { slug } = useParams();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector(state => state.user.user);
    const userToken = useSelector(state => state.user.token);
    const [job, setJob] = useState(null);
    const [isApplyPopupOpen, setIsApplyPopupOpen] = useState(false);
    const [formLoading, setFormLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            proposal_text: ''
        },
        validationSchema: Yup.object({
            proposal_text: Yup.string().min(100, t('job.must_be_at_least_100_characters')).required(t('general.UI.required'))
        }),
        onSubmit: async (values) => {

            if (formLoading) {
                return;
            }

            setFormLoading(true);

            toast.promise(sendJobProposal({
                    job_id: job.id, 
                    token: userToken, 
                    proposal_text: values.proposal_text
                }), {
                loading: t('general.UI.please_wait'),
                success: <b>{t('general.UI.success')}</b>,
                error: (err) => {
                    return <b>{err.response.data.error}</b>;
                },
            })
            .then((response) => {
                dispatch(updateApplications([...user.applications, parseInt(job.id, 10)]));
                setFormLoading(false);
                setIsApplyPopupOpen(false);
            })
            .catch((error) => {
                
                if (error?.response?.data?.field) {
                    formik.setErrors({
                        [error.response.data.field]: error.response.data.error
                    });
                }

                setFormLoading(false);

            });

        },
    });

    useEffect(() => {

        getJob(slug)
            .then((response) => {
                response.skills = response.skills.map(skill => {
                    return {
                        id: skill.skill_code + '-' + skill.job_id,
                        job_id: skill.job_id,
                        code: skill.skill_code
                    }
                });

                // console.log(response);
                setJob(response);
            })
            .catch((error) => {
                console.log(error);
            });

    }, [slug]);

    const handleBackClick = () => {
        navigate(-1);
    };

    const handleApplyClick = (e) => {
        e.preventDefault();

        if (user) {
            setIsApplyPopupOpen(true);
        }
        else {
            navigate('/login');
        }

    };

    const handlePopupClose = () => {
        setIsApplyPopupOpen(false);
    };

    const handleAddToFavourites = () => {
        addJobToFavourites({
            job_id: job.id, 
            token: userToken
        })
        .then((response) => {
            dispatch(updateFavourites([...user.favourites, parseInt(job.id, 10)]));
            toast.success(t('job.job_added_to_favorites'));
        })
        .catch((error) => {
            
            if (error?.response?.data?.error) {
                toast.error(error.response.data.error);
            }

        });
    };

    const handleRemoveFromFavourites = () => {
        removeJobFromFavourites({
            job_id: job.id, 
            token: userToken
        })
        .then((response) => {
            dispatch(updateFavourites(user.favourites.filter(item => item !== parseInt(job.id, 10))));
            toast.success(t('job.job_removed_from_favorites'));
        })
        .catch((error) => {
            
            if (error?.response?.data?.error) {
                toast.error(error.response.data.error);
            }

        });
    };

    const handlePauseClick = () => {
        updateJobField({
            job_id: job.id, 
            token: userToken,
            field: 'status',
            value: (job.status === 'paused' || job.status === 'closed') ? 'active' : 'paused'
        })
        .then((response) => {
            setJob((prevState) => ({
                ...prevState,
                status: (prevState.status === 'paused' || prevState.status === 'closed') ? 'active' : 'paused'
            }));
        })
        .catch((error) => {
            
            if (error?.response?.data?.error) {
                toast.error(error.response.data.error);
            }

        });
    };

    const handleCloseClick = () => {
        updateJobField({
            job_id: job.id, 
            token: userToken,
            field: 'status',
            value: 'closed'
        })
        .then((response) => {
            setJob((prevState) => ({
                ...prevState,
                status: 'closed'
            }));
        })
        .catch((error) => {
            
            if (error?.response?.data?.error) {
                toast.error(error.response.data.error);
            }

        });
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
                label: t('job.country'),
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

            let city = job.city;

            if (t('general.city.' + city) !== 'general.city.' + city) {
                city = t('general.city.' + city);
            }

            infoTableData.push({
                key: 'city',
                label: t('job.city_town_village'),
                value: city
            });

        }

        if (job?.job_type) {
            infoTableData.push({
                key: 'job_type',
                label: t('job.job_type'),
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
                label: t('job.salary'),
                value: (
                    <>
                        {salary} /<span style={{opacity: 0.5, marginLeft: 5, marginRight: 5}}>{salary_period}</span>
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
                label: t('job.working_hours_per_week'),
                value: working_hours
            });
        }

    }

    // console.log(user);

    return (
        <>
            {job ? (
                <>

                    <Helmet>
                        <title>FindCV - {job.title}</title>
                        <meta name="description" content={job.description} />
                    </Helmet>

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
                                    {t('general.UI.back')}
                                </BubbleButton>
                            </div>
                            <div>
                                {(user?.account_type !== 'employer' && !user?.applications?.includes(parseInt(job.id, 10))) && (
                                    <BubbleButton 
                                        onClick={handleApplyClick}
                                        type="default"
                                        small
                                    >
                                        {t('general.UI.apply')}
                                    </BubbleButton>
                                )}
                                {user?.applications?.includes(parseInt(job.id, 10)) && <strong style={{color: '#34A853'}}>{t('general.UI.applied')}</strong>}

                                {user?.account_type === 'jobseeker' && (
                                    user?.favourites?.includes(parseInt(job.id, 10)) ? (
                                        <IconButton
                                            color="red"
                                            icon={star_icon}
                                            onClick={handleRemoveFromFavourites}
                                        ></IconButton>
                                    ) : (
                                        <IconButton
                                            color="green"
                                            icon={star_icon}
                                            onClick={handleAddToFavourites}
                                        ></IconButton>
                                    )
                                
                                )}

                                {user?.account_type === 'employer' && (
                                    
                                    user?.jobs?.includes(parseInt(job.id, 10)) && (

                                        <div className={styles.head_actions}>
                                            <IconButton
                                                icon={pen_icon}
                                                to={`/jobs/${job.id}/edit`}
                                            ></IconButton>
                                            <IconButton
                                                color={(job.status === 'paused' || job.status === 'closed') ? 'green' : 'yellow'}
                                                icon={(job.status === 'paused' || job.status === 'closed') ? play_icon : pause_icon}
                                                onClick={handlePauseClick}
                                            ></IconButton>

                                            {job.status !== 'closed' && (
                                                <IconButton
                                                    color="red"
                                                    icon={close_icon}
                                                    onClick={handleCloseClick}
                                                ></IconButton>
                                            )}
                                        </div>

                                    )
                                    
                                )}
                            </div>
                        </div>

                        <div className={styles.body}>

                            <div className={styles.job_head}>
                                <div className={styles.job_head_icon}>
                                    <img src={category_icon} alt="Category Icon" />
                                </div>
                                <div>
                                    <h1>{job.title}</h1>
                                    <p>{t('general.job_category.' + job.category)} - <LinkWrapper to={`/employers/${job.employer.slug}`}>{job.employer.company_name ? job.employer.company_name : getTrimmedName(job.employer.first_name + ' ' + job.employer.last_name)}</LinkWrapper></p>
                                </div>
                            </div>

                            <p className={styles.job_date}>{date}</p>

                            <Subtitle dark>{t('job.description')}</Subtitle>
                            <div className={styles.job_description} dangerouslySetInnerHTML={{__html: job.description}}></div>

                            <Subtitle dark style={{marginBottom: 0}}>{t('job.valuable_information')}</Subtitle>
                            <Table data={infoTableData} style={{marginBottom: 30}} />

                            <Subtitle dark>{t('job.language_requirements')}</Subtitle>
                            <LanguageLevelList languages={job.languages} style={{marginBottom: 30}} />

                            <Subtitle dark>{t('job.required_skills')}</Subtitle>
                            <SkillsList skills={job.skills} />

                            {(user?.account_type !== 'employer' && !user?.applications?.includes(parseInt(job.id, 10))) && (
                                <div className={styles.job_apply}>
                                    <Button onClick={handleApplyClick} type="default">{t('general.UI.apply')}</Button>
                                </div>
                            )}

                        </div>

                        {(user?.account_type === 'employer' && user?.jobs?.includes(parseInt(job.id, 10))) ? (
                            <Applications job_id={job.id} />
                        ) : (
                            <>
                                <div className={`${styles.jobs_head} pagination_scroll_target`}>
                                    <p>{t('job.similar_jobs')}</p>
                                </div>
                                <JobsList 
                                    per_page={4}
                                    max_pages={4}
                                    hide_url_params={true}
                                    filters={{
                                        exclude_ids: [job.id],
                                        related_to: job.id
                                    }}
                                />
                            </>
                        )}
                        
                    </div>
                    <BasicPopup isOpen={isApplyPopupOpen} closePopup={handlePopupClose}>
                        <form onSubmit={formik.handleSubmit}>
                            <div>
                                <FormRichTextField
                                    name="proposal_text"
                                    label={t('job.proposal_message')}
                                    hasBorder
                                    onFormikChange={formik.handleChange}
                                    value={formik.values.proposal_text}
                                    error={formik.touched.proposal_text && formik.errors.proposal_text}
                                />
                            </div>
                            <div style={{textAlign: 'center'}}>
                                <Button type="submit">
                                    {formLoading ? t('general.UI.loading') : t('general.UI.submit')}
                                </Button>
                            </div>
                        </form>
                    </BasicPopup>
                </>
            ) : (
                <>
                    <Helmet>
                        <title>FindCV - Job Posting</title>
                    </Helmet>
                    <div className={styles.wrapper}>
                        <BlockLoader height={60} marginBottom={20}/>
                        <BlockLoader height={800} marginBottom={50}/>
                    </div>
                </>
            )}
        </>
    );
}
    
export default Job;