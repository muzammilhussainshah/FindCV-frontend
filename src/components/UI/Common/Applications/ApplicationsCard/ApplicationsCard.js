import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import Flag from 'react-flags';
import Button from '../../../Buttons/Button/Button';
import SimpleLink from '../../../Buttons/SimpleLink/SimpleLink';
import IconButton from '../../../Buttons/IconButton/IconButton';
import SidePopup from '../../../Popups/SidePopup/SidePopup';
import ApplicationPopup from '../ApplicationsPopup/ApplicationPopup';

import { updateApplicationField } from '../../../../../services/jobService';

import styles from './ApplicationsCard.module.css';

import user_image_placeholder from '../../../../../assets/images/other/user_image_placeholder.svg';
import star_icon from '../../../../../assets/images/icons/star-white.svg';
import question_icon from '../../../../../assets/images/icons/question-white.svg';
import close_icon from '../../../../../assets/images/icons/close-white.svg';

function ApplicationsCard({ application, ...props }) {
    const { t } = useTranslation();
    const userToken = useSelector(state => state.user.token);

    const [applicationData, setApplicationData] = useState(application);
    const [showFullText, setShowFullText] = useState(false);
    const [popupOpen, setPopupOpen] = useState(false);
    // console.log(application);

    let card_classes = styles.card;

    if (applicationData.jobseeker.verification_status) {
        card_classes += ' ' + styles.verified;
    }

    if (applicationData.application.status) {
        card_classes += ' ' + styles[applicationData.application.status];
    }

    if (applicationData.hidden) {
        card_classes += ' ' + styles.hidden;
    }

    const handleStatusChange = (status) => {
        updateApplicationField({
            application_id: applicationData.application.id,
            token: userToken,
            field: 'status',
            value: status
        })
        .then((response) => {
            setApplicationData((prevState) => ({
                ...prevState,
                application: {
                    ...prevState.application,
                    status: status
                }
            }));
        })
        .catch((error) => {
            console.log(error);
        });
    }

    return (
        <>
            <div className={card_classes} {...props}>
                <div className={styles.card_image}>
                    {applicationData.jobseeker.profile_image ? (
                        <img src={process.env.REACT_APP_UPLOADS_PATH + applicationData.jobseeker.profile_image} alt={`${applicationData.jobseeker.first_name} ${applicationData.jobseeker.last_name}`} />
                    ) : (
                        <img src={user_image_placeholder} alt={`${applicationData.jobseeker.first_name} ${applicationData.jobseeker.last_name}`} />
                    )}
                    <Button 
                        style={{width: '100%', padding: 4, minWidth: 0}}
                        onClick={() => setPopupOpen(true)}
                    >
                        {t('general.UI.view')}
                    </Button>
                </div>
                <div className={styles.card_body}>
                    <div className={styles.card_body_head}>
                        <h5>{applicationData.jobseeker.first_name} {applicationData.jobseeker.last_name}</h5>
                        <Flag 
                            name={applicationData.jobseeker.country}
                            format="svg"
                            shiny={false}
                            basePath="/vendor/flags"
                        />
                        <span>{t('general.country.' + applicationData.jobseeker.country)}</span>
                    </div>
                    
                    <div className={styles.card_body_text}>
                        {(showFullText) ? (
                            <>
                                <div dangerouslySetInnerHTML={{__html: applicationData.application.proposal_text}}></div>
                                <SimpleLink 
                                    onClick={() => setShowFullText(false)}
                                >
                                    {t('general.UI.show_less')}
                                </SimpleLink>
                            </>
                        ) : (

                            applicationData.application.proposal_text.length > 500 ? (
                                <>
                                    <div dangerouslySetInnerHTML={{__html: applicationData.application.proposal_text.slice(0, 450) + '... '}}></div>
                                    <SimpleLink 
                                        onClick={() => setShowFullText(true)}
                                    >
                                        {t('general.UI.show_more')}
                                    </SimpleLink>
                                </>
                            ) : (
                                <div dangerouslySetInnerHTML={{__html: applicationData.application.proposal_text}}></div>
                            )

                        )}
                    </div>

                </div>
                <div className={styles.card_actions}>
                    {applicationData.application.status !== 'good_fit' && (
                        <IconButton 
                            color="green"
                            icon={star_icon}
                            onClick={() => handleStatusChange('good_fit')}
                        />
                    )}
                    {applicationData.application.status !== 'possible_fit' && (
                        <IconButton 
                            color="yellow"
                            icon={question_icon}
                            onClick={() => handleStatusChange('possible_fit')}
                        />
                    )}
                    {applicationData.application.status !== 'rejected' && (
                        <IconButton 
                            color="red"
                            icon={close_icon}
                            onClick={() => handleStatusChange('rejected')}
                        />
                    )}
                </div>
            </div>
            <SidePopup
                isOpen={popupOpen}
                closePopup={() => setPopupOpen(false)}
            >
                <ApplicationPopup jobseeker={applicationData.jobseeker} />
            </SidePopup>
        </>
    );
}

export default ApplicationsCard;