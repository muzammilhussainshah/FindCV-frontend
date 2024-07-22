import { useTranslation } from 'react-i18next';
import Flag from 'react-flags';
import BubbleButton from '../../../Buttons/BubbleButton/BubbleButton';
import SimpleLink from '../../../Buttons/SimpleLink/SimpleLink';
import Button from '../../../Buttons/Button/Button';

import { getTimeAgo, getCurrencySymbol } from '../../../../../utils/formatHelpers';

import category_icon from '../../../../../assets/images/icons/job_categories/construction.svg';
import money_icon from '../../../../../assets/images/icons/money-alt.svg';
import users_icon from '../../../../../assets/images/icons/users-alt.svg';
import suitcase_icon from '../../../../../assets/images/icons/suitcase-alt.svg';

import styles from './JobsCard.module.css';

function JobsCard({ disabled, job, ...props }) {
    const { t } = useTranslation();

    const desc = job.description;
    const currency = getCurrencySymbol(job.currency);

    let salary = '';
    let salary_period = t('general.UI.month');
    let date = '';

    if (job.salary_from !== job.salary_to) {
        salary = currency + job.salary_from + ' - ' + currency + job.salary_to;
    }
    else {
        salary = currency + job.salary_from;
    }

    if (job.payment_type === 'hourly') {
        salary_period = t('general.UI.hour');
    }

    if (job.createdAt) {
        const date_info = getTimeAgo(new Date(job.createdAt));
        date = t('general.UI.posted') + ' ';

        if (date_info.unit_plural === 'second' || date_info.unit_plural === 'seconds') {
            date += t('general.UI.just_now');
        }
        else {
            date += date_info.count + ' ' + t('general.UI.' + date_info.unit_plural) + ' ' + t('general.UI.ago');
        }

    }

    let additional_card_classes = '';
    if (disabled) {
        additional_card_classes = styles.disabled;
    }

    let city = job.city;

    if (t('general.city.' + city) !== 'general.city.' + city) {
        city = t('general.city.' + city);
    }

    return (
        <div className={`${styles.job_card} ${styles[job.status]} ${additional_card_classes}`} {...props}>
            {(job.status === 'paused' || job.status === 'closed') && (
                <div className={styles.job_card_status}>
                    <span>{t('general.UI.' + job.status)}</span>
                </div>
            )}
            <div className={styles.job_card_head}>
                <div className={styles.job_card_head_info}>

                    <div className={styles.job_card_head_info_icon}>
                        <img src={category_icon} alt="Category Icon" />
                    </div>

                    <div className={styles.job_card_head_info_main}>
                        <h5>{job.title}</h5>
                        <div>
                            <Flag 
                                name={job.country}
                                format="svg"
                                shiny={false}
                                basePath="/vendor/flags"
                            />
                            <p>{t('general.country.' + job.country)}, {city}</p>
                        </div>
                    </div>

                </div>
                <div>
                    <BubbleButton small to={`/jobs/${job.id}`}>{t('general.UI.view')}</BubbleButton>
                </div>
            </div>
            <div className={styles.job_card_body}>
                <p className={styles.job_card_body_date}>{date}</p>
                <div className={styles.job_card_body_main}>
                    {desc.length > 240 ? (
                        <>
                            <div dangerouslySetInnerHTML={{__html: desc.slice(0, 240) + '... '}}></div>
                            <SimpleLink to={`/jobs/${job.id}`}>{t('general.UI.show_more')}</SimpleLink>
                        </>
                    ) : (
                        <div dangerouslySetInnerHTML={{__html: desc}}></div>
                    )}
                </div>
            </div>
            <div className={styles.job_card_footer}>
                <p>
                    <img src={money_icon} alt="Salary Icon" />
                    <span>{salary} <span>/ {salary_period}</span></span>
                </p>

                {job.applications_count > 0 && (
                    <p>
                        <img src={users_icon} alt="Applications Icon" />
                        <span>{job.applications_count} {t('general.UI.applications')}</span>
                    </p>
                )}

                <p>
                    <img src={suitcase_icon} alt="Jobtype Icon" />
                    <span>{t('general.UI.' + job.job_type)}</span>
                </p>
                <Button to={`/jobs/${job.id}`}>{t('general.UI.view')}</Button>
            </div>
        </div>
    );
}

export default JobsCard;