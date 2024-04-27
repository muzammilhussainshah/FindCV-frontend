import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { getUser } from '../../../services/userService';

import BlockLoader from '../../../components/UI/Loaders/BlockLoader';
import InfoBlock from '../../../components/UI/Common/InfoBlock/InfoBlock';

import styles from './EmployerProfile.module.css';

import user_image_placeholder from '../../../assets/images/other/user_image_placeholder.svg';
import location_icon from '../../../assets/images/icons/location.svg';
import website_icon from '../../../assets/images/icons/globe.svg';
import company_size_icon from '../../../assets/images/icons/users.svg';
import industry_icon from '../../../assets/images/icons/building.svg';

function EmployerProfile() {
    const { t } = useTranslation();
    const { id } = useParams();

    const [employer, setEmployer] = useState(null);

    useEffect(() => {
        getUser('employer', id)
            .then((response) => {
                setEmployer(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);

    return (
        <>
            {employer ? (
                <div className={styles.employer_profile}>
                    <div className={styles.employer_profile_col}>
                        {employer.profile_image ? (
                            <img className={styles.employer_profile_image} src={employer.profile_image} alt={employer.company_name ? employer.company_name : employer.name} />
                        ) : (
                            <img className={styles.employer_profile_image} src={user_image_placeholder} alt={employer.company_name ? employer.company_name : employer.name} />
                        )}
                    </div>
                    <div className={styles.employer_profile_col}>
                        <h1>{employer.company_name ? employer.company_name : employer.name }</h1>

                        {employer.company_size && <InfoBlock icon={company_size_icon} label="Company Size" text={employer.company_size} />}
                        {employer.company_website && <InfoBlock icon={website_icon} label="Website" text={employer.company_website} />}
                        {employer.company_industries && <InfoBlock icon={industry_icon} label="Industry" text={employer.company_industries.replaceAll(';', ', ')} />}
                        <InfoBlock icon={location_icon} label="Location" text={`${t('general.country.' + employer.country)}, ${employer.city}`} style={{marginBottom: 30}} />

                        <h4>Jobs</h4>
                        {/* add job posting component */}
                    </div>
                </div>
            ) : (
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

                        <h4>Jobs</h4>
                        <BlockLoader height={320} marginBottom={20} />
                        <BlockLoader height={320} marginBottom={20} />
                        <BlockLoader height={320} />
                    </div>
                </div>
            )}
        </>
    );
}
    
export default EmployerProfile;