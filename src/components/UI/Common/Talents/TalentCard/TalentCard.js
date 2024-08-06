import { useState } from 'react';
import LinkWrapper from '../../../../wrappers/LinkWrapper';
import { useTranslation } from 'react-i18next';
import Flag from 'react-flags';

import LanguageLevelList from '../../LanguageLevel/LanguageLevelList/LanguageLevelList';
import SkillsList from '../../Skills/SkillsList/SkillsList';

import styles from './TalentCard.module.css';

import user_image_placeholder from '../../../../../assets/images/other/user_image_placeholder.svg';

function TalentCard({ disabled, talent, ...props }) {
    const { t } = useTranslation();

    const [showMore, setShowMore] = useState(false);

    let additional_card_classes = '';
    if (disabled) {
        additional_card_classes = styles.disabled;
    }

    if (talent.hidden) {
        additional_card_classes += ' ' + styles.hidden;
    }

    if (talent.verification_status) {
        additional_card_classes += ' ' + styles.verified;
    }

    let logic_test_bar_color = '';

    switch (true) {
        case talent.logic_test_result >= 8:
            logic_test_bar_color = '#34A853';
            break;
        case talent.logic_test_result >= 6:
            logic_test_bar_color = '#AEB930';
            break;
        case talent.logic_test_result >= 4:
            logic_test_bar_color = '#F2C94C';
            break;
        case talent.logic_test_result >= 2:
            logic_test_bar_color = '#F2884C';
            break;
        default:
            logic_test_bar_color = '#EA4335';
            break;
    }

    return (
        <div className={`${styles.card} ${additional_card_classes}`} {...props}>

            <div className={styles.card_head}>
                
                <div className={styles.col}>
                    {talent.profile_image ? (
                        <LinkWrapper to={`/jobseekers/${talent.slug}`}>
                            <img src={process.env.REACT_APP_UPLOADS_PATH + talent.profile_image} alt={`${talent.first_name} ${talent.last_name}`} />
                        </LinkWrapper>
                    ) : (
                        <LinkWrapper to={`/jobseekers/${talent.slug}`}>
                            <img src={user_image_placeholder} alt={`${talent.first_name} ${talent.last_name}`} />
                        </LinkWrapper>
                    )}

                    <div className={styles.card_head_info}>
                        <LinkWrapper to={`/jobseekers/${talent.slug}`}>
                            <h5>{talent.first_name} {talent.last_name}</h5>
                        </LinkWrapper>
                        <div>
                            <Flag 
                                name={talent.country}
                                format="svg"
                                shiny={false}
                                basePath="/vendor/flags"
                            />
                            <span>{t('general.country.' + talent.country)}</span>
                        </div>
                    </div>
                </div>

                {talent.logic_test_result && (
                    <div className={styles.col}>
                        <p>{talent.logic_test_result * 10}%</p>
                        <div className={styles.card_head_test}>
                            <span style={{width: (talent.logic_test_result * 10) + '%', backgroundColor: logic_test_bar_color}}></span>
                        </div>
                        <p>{t('general.talent_card.work_proficiency_test')}</p>
                    </div>
                )}

            </div>

            <div className={styles.card_body}>
                {talent.description && <p style={{fontWeight: 600, marginBottom: 10}}>{t('general.talent_card.about')} {talent.first_name} {talent.last_name}</p>}

                {(showMore) ? (
                    <>
                        <div dangerouslySetInnerHTML={{__html: talent.description}}></div>

                        {talent.languages.length > 0 && (
                            <>
                                <h6 style={{marginTop: 20, fontWeight: 600}}>{t('general.talent_card.languages_knowledge')}</h6>
                                <LanguageLevelList languages={talent.languages} />
                            </>
                        )}

                        {talent.skills.length > 0 && (
                            <>
                                <h6 style={{marginTop: 20, fontWeight: 600}}>{t('general.talent_card.skills')}</h6>
                                <SkillsList skills={talent.skills} />
                            </>
                        )}
                    </>
                ) : (

                    talent.description && talent.description.length > 200 ? (
                        <>
                            <div dangerouslySetInnerHTML={{__html: talent.description.slice(0, 250) + '... '}}></div>
                        </>
                    ) : (
                        <div dangerouslySetInnerHTML={{__html: talent.description}}></div>
                    )

                )}

                <button
                    onClick={() => setShowMore(!showMore)}
                >
                    {showMore ? t('general.UI.show_less') : t('general.UI.show_more')}
                </button>

            </div>

        </div>
    );
}

export default TalentCard;