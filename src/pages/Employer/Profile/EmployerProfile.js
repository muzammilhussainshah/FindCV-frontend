import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';

import { getUser } from '../../../services/userService';

import BlockLoader from '../../../components/UI/Loaders/BlockLoader';
import InfoBlock from '../../../components/UI/Common/InfoBlock/InfoBlock';
import JobsList from '../../../components/UI/Common/Jobs/JobsList/JobsList';

import styles from './EmployerProfile.module.css';

import user_image_placeholder from '../../../assets/images/other/user_image_placeholder.svg';
import location_icon from '../../../assets/images/icons/location.svg';
import website_icon from '../../../assets/images/icons/globe.svg';
import nationality_icon from '../../../assets/images/icons/passport.svg';
import company_size_icon from '../../../assets/images/icons/users.svg';
import industry_icon from '../../../assets/images/icons/building.svg';

function EmployerProfile() {
    const { t } = useTranslation();
    const { slug } = useParams();

    const [employer, setEmployer] = useState(null);

    useEffect(() => {
        getUser('employer', slug)
            .then((response) => {
                setEmployer(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [slug]);

    let industry_text = '';
    let city = '';

    if (employer && employer.company_industries) {
        employer.company_industries.split(';').forEach((industry, index) => {
            if (index === 0) {
                industry_text += t('general.company_industries.' + industry);
            } else {
                industry_text += ', ' + t('general.company_industries.' + industry);
            }
        });
    }

    if (employer && employer.city) {

        if (t('general.city.' + employer.city) !== 'general.city.' + employer.city) {
            city = t('general.city.' + employer.city);
        }
        else {
            city = employer.city;
        }

    }

    return (
        <>
            {employer ? (
                <>
                    <Helmet>
                        <title>FindCV - {employer.company_name ? employer.company_name : `${employer.first_name} ${employer.last_name}`}</title>
                    </Helmet>
                    <div className={styles.employer_profile}>
                        <div className={styles.employer_profile_col}>
                            {employer.profile_image ? (
                                <img className={styles.employer_profile_image} src={process.env.REACT_APP_UPLOADS_PATH + employer.profile_image} alt={employer.company_name ? employer.company_name : `${employer.first_name} ${employer.last_name}`} />
                            ) : (
                                <img className={styles.employer_profile_image} src={user_image_placeholder} alt={employer.company_name ? employer.company_name : `${employer.first_name} ${employer.last_name}`} />
                            )}
                        </div>
                        <div className={styles.employer_profile_col}>
                            <h1>{employer.company_name ? employer.company_name : `${employer.first_name} ${employer.last_name}`}</h1>

                            {employer.company_size && <InfoBlock icon={company_size_icon} label={t('employer.company_size')} text={employer.company_size} />}
                            {employer.company_website && <InfoBlock icon={website_icon} label={t('employer.website')} text={employer.company_website} />}
                            {employer.company_industries && <InfoBlock icon={industry_icon} label={t('employer.industry')} text={industry_text} />}
                            {employer.nationality && <InfoBlock icon={nationality_icon} label={t('employer.nationality')} text={t('general.nationality.' + employer.nationality)} />}
                            <InfoBlock icon={location_icon} label={t('employer.location')} text={`${t('general.country.' + employer.country)}, ${city}`} style={{marginBottom: 30}} />

                            <h4 className='pagination_scroll_target'>{t('employer.jobs')}</h4>
                            <JobsList 
                                per_page={5}
                                hide_url_params={true}
                                filters={{
                                    employer_id: employer.id,
                                    status: 'active'
                                }}
                            />
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <Helmet>
                        <title>FindCV - Employer Profile</title>
                    </Helmet>
                    <div className={styles.employer_profile}>
                        <div className={styles.employer_profile_col}>
                            <BlockLoader height={300} />
                        </div>
                        <div className={styles.employer_profile_col}>
                            <BlockLoader height={60} marginBottom={50} />

                            <BlockLoader height={40} marginBottom={10} />
                            <BlockLoader height={40} marginBottom={10} />
                            <BlockLoader height={40} marginBottom={10} />
                            <BlockLoader height={40} marginBottom={35} />
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
    
export default EmployerProfile;