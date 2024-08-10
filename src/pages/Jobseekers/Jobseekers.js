import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { useDebounce, useGetEducationLevelsHook } from '../../utils/utilityHooks';

import Talents from '../../components/UI/Common/Talents/Talents';
import FormField from '../../components/UI/FormUI/FormField/FormField';
import FormSelectField from '../../components/UI/FormUI/FormSelectField/FormSelectField';
import FormOptionField from '../../components/UI/FormUI/FormOptionField/FormOptionField';
import FormRangeField from '../../components/UI/FormUI/FormRangeField/FormRangeField';

import styles from './Jobseekers.module.css';

function Jobseekers() {
    const { t } = useTranslation();
    const location = useLocation();

    const query = new URLSearchParams(location.search);
    let initialTalentCountry = query.getAll('country') || [];
    let initialTalentLanguage = query.getAll('language') || [];
    let initialTalentNationality = query.getAll('nationality') || [];
    let initialTalentEducation = query.getAll('education') || [];
    let initialTalentGender = query.get('gender') || 'any';
    let initialTalentSearch = query.get('search') || '';

    if (initialTalentCountry.length) {
        initialTalentCountry = initialTalentCountry[0].split(',');
    }
    if (initialTalentLanguage.length) {
        initialTalentLanguage = initialTalentLanguage[0].split(',');
    }
    if (initialTalentNationality.length) {
        initialTalentNationality = initialTalentNationality[0].split(',');
    }
    if (initialTalentEducation.length) {
        initialTalentEducation = initialTalentEducation[0].split(',');
    }

    const [talentSearch, setTalentSearch] = useState(initialTalentSearch);
    const [talentCountry, setTalentCountry] = useState(initialTalentCountry);
    const [talentLanguage, setTalentLanguage] = useState(initialTalentLanguage);
    const [talentNationality, setTalentNationality] = useState(initialTalentNationality);
    const [talentEducation, setTalentEducation] = useState(initialTalentEducation);
    const [talentGender, setTalentGender] = useState(initialTalentGender);
    const [talentExperience, setTalentExperience] = useState([0, 50]);

    const handleFilterChange = (value) => {
        
        switch (value.target.name) {
            case 'filter_country':
                setTalentCountry(value.target.value);
                break;
            case 'filter_language':
                setTalentLanguage(value.target.value);
                break;
            case 'filter_nationality':
                setTalentNationality(value.target.value);
                break;
            case 'filter_gender':
                setTalentGender(value.target.value);
                break;
            case 'filter_education':
                setTalentEducation(value.target.value);
                break;
            default:
                break;
        }

    }

    const handleFilterRangeChange = useDebounce((value) => {
        setTalentExperience(value);
    }, 700);

    const handleFilterSearchChange = useDebounce((value) => {
        setTalentSearch(value.target.value);
    }, 700);

    const genderOptions = [
        { value: 'any', label: t('general.UI.any') },
        { value: 'male', label: t('forms.welcome_job_seeker.step_1.male') },
        { value: 'female', label: t('forms.welcome_job_seeker.step_1.female') }
    ];

    const educationLevels = useGetEducationLevelsHook();

    const filters = {
        gender: talentGender,
        minimum_experience: talentExperience[0],
        maximum_experience: talentExperience[1],
        search: talentSearch
    };

    if (talentCountry.length > 0) {
        filters.country = talentCountry;
    }
    if (talentLanguage.length > 0) {
        filters.language = talentLanguage;
    }
    if (talentNationality.length > 0) {
        filters.nationality = talentNationality;
    }
    if (talentEducation.length > 0) {
        filters.education_level = talentEducation;
    }

    return (
        <div className={styles.wrapper}>
            <Helmet>
                <title>FindCV - Discover Employees</title>
            </Helmet>
            <h1>{t('talents.title')}</h1>

            <div className={styles.content}>

                <div className={styles.col}>

                    <div className={styles.sidebar}>
                        <div className={styles.sidebar_head}>
                            <span></span>
                            <h5>{t('talents.filters')}</h5>
                        </div>
                        <form>
                            <div>
                                <FormField
                                    name="filter_search"
                                    label={t('talents.search')}
                                    type="text"
                                    hasBorder
                                    icon="search"
                                    onChange={handleFilterSearchChange}
                                />
                            </div>
                            <div>
                                <FormSelectField
                                    name="filter_country"
                                    placeholder={t('general.UI.select')}
                                    label={t('talents.country_of_current_residence')}
                                    type="country"
                                    isMulti
                                    hasBorder
                                    onFormikChange={handleFilterChange}
                                    value={talentCountry}
                                />
                            </div>
                            <div>
                                <FormSelectField
                                    name="filter_nationality"
                                    placeholder={t('general.UI.select')}
                                    label={t('talents.nationality')}
                                    type="nationality"
                                    isMulti
                                    hasBorder
                                    onFormikChange={handleFilterChange}
                                    value={talentNationality}
                                />
                            </div>
                            <div>
                                <FormSelectField
                                    name="filter_education"
                                    placeholder={t('general.UI.select')}
                                    label={t('talents.education_level')}
                                    type="default"
                                    isMulti
                                    hasBorder
                                    onFormikChange={handleFilterChange}
                                    options={educationLevels}
                                    value={talentEducation}
                                />
                            </div>
                            <div>
                                <FormSelectField
                                    name="filter_language"
                                    placeholder={t('general.UI.select')}
                                    label={t('talents.language')}
                                    type="language"
                                    isMulti
                                    hasBorder
                                    onFormikChange={handleFilterChange}
                                    value={talentLanguage}
                                />
                            </div>
                            <div>
                                <FormOptionField
                                    name="filter_gender"
                                    label={t('talents.gender')}
                                    type="radio"
                                    dark
                                    options={genderOptions}
                                    onChange={handleFilterChange}
                                    value={talentGender}
                                />
                            </div>
                            <div>
                                <FormRangeField
                                    name="filter_experience"
                                    label={(talentExperience[0] > 0 || talentExperience[1] < 50) ? `${t('talents.experience')}: ${talentExperience[0]}-${talentExperience[1]}` : t('talents.experience')}
                                    type="radio"
                                    dark
                                    min={0}
                                    max={50}
                                    defaultValue={talentExperience}
                                    allowCross={false}
                                    range
                                    showTooltip
                                    onChange={handleFilterRangeChange}
                                    // value={talentGender}
                                />
                            </div>
                        </form>
                    </div>

                </div>

                <div className={`${styles.col} pagination_scroll_target`}>
                    <Talents 
                        per_page={10} 
                        filters={filters}
                    />
                </div>

            </div>

        </div>
    );
}
    
export default Jobseekers;