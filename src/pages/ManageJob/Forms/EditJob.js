import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { Helmet } from 'react-helmet';
import Yup from '../../../utils/yupExtensions';
import toast from 'react-hot-toast';

import { updateJob, getJob } from '../../../services/jobService';
import { useGetJobCategoriesHook, useGetCurrenciesHook } from '../../../utils/utilityHooks';

import BasicPopup from '../../../components/UI/Popups/BasicPopup/BasicPopup';
import LanguageForm from '../../../components/Forms/Common/LanguageForm/LanguageForm';
import SkillsForm from '../../../components/Forms/Common/SkillsForm/SkillsForm';

import LanguageLevelList from '../../../components/UI/Common/LanguageLevel/LanguageLevelList/LanguageLevelList';
import SkillsList from '../../../components/UI/Common/Skills/SkillsList/SkillsList';

import Subtitle from '../../../components/UI/Common/Subtitle/Subtitle'
import Button from '../../../components/UI/Buttons/Button/Button';
import FormField from '../../../components/UI/FormUI/FormField/FormField';
import FormNumberField from '../../../components/UI/FormUI/FormNumberField/FormNumberField';
import FormOptionField from '../../../components/UI/FormUI/FormOptionField/FormOptionField';
import FormSelectField from '../../../components/UI/FormUI/FormSelectField/FormSelectField';
import FormRichTextField from '../../../components/UI/FormUI/FormRichTextField/FormRichTextField';

import styles from './EditJob.module.css';

function EditJob() {
    const { t } = useTranslation();
    const { id } = useParams();
    const navigate = useNavigate();
    const userToken = useSelector(state => state.user.token);
    const user = useSelector(state => state.user.user);

    const [formLoading, setFormLoading] = useState(false);
    const [isOpenLanguagePopup, setIsOpenLanguagePopup] = useState(false);
    const [isOpenSkillsPopup, setIsOpenSkillsPopup] = useState(false);
    const [formInitialValues, setFormInitialValues] = useState({
        title: '',
        description: '',
        country: '',
        category: '',
        city: '',
        languages: [],
        skills: [],
        payment_type: 'monthly',
        job_type: 'full_time',
        hours_low: 30,
        hours_high: 40,
        salary_low: 300,
        salary_high: 500,
        currency: 'usd'
    });

    const formik = useFormik({
        initialValues: formInitialValues,
        validationSchema: Yup.object({
            title: Yup.string().required(t('general.UI.required')),
            description: Yup.string().required(t('general.UI.required')),
            country: Yup.string().required(t('general.UI.required')),
            category: Yup.string().required(t('general.UI.required')),
            city: Yup.string().required(t('general.UI.required')),
            payment_type: Yup.string().required(t('general.UI.required')),
            job_type: Yup.string().required(t('general.UI.required')),
            hours_low: Yup.number().min(1, t('general.UI.minimum_possible_value_is_1')).max(168, t('general.UI.maximum_possible_value_is_168')).required(t('general.UI.required')),
            hours_high: Yup.number().min(1, t('general.UI.minimum_possible_value_is_1')).max(168, t('general.UI.maximum_possible_value_is_168')).required(t('general.UI.required')),
            salary_low: Yup.number().min(1, t('general.UI.minimum_possible_value_is_1')).required(t('general.UI.required')),
            salary_high: Yup.number().min(1, t('general.UI.minimum_possible_value_is_1')).required(t('general.UI.required')),
            currency: Yup.string().required(t('general.UI.required'))
        }),
        onSubmit: values => {

            if (formLoading) {
                return;
            }

            setFormLoading(true);

            const formData = new FormData();
            formData.append('token', userToken);

            formData.append('title', values.title);
            formData.append('city', values.city);
            formData.append('country', values.country);
            formData.append('category', values.category);
            formData.append('description', values.description);
            formData.append('payment_type', values.payment_type);
            formData.append('job_type', values.job_type);
            formData.append('currency', values.currency);
            formData.append('salary_from', values.salary_low);
            formData.append('salary_to', values.salary_high);
            formData.append('hours_from', values.hours_low);
            formData.append('hours_to', values.hours_high);

            if (values.status) {
                formData.append('status', values.status);
            }

            if (values.languages.length > 0) {
                values.languages.forEach((language, index) => {
                    formData.append(`languages[${index}][languageCode]`, language.languageCode);
                    formData.append(`languages[${index}][level]`, language.level);
                });
            }
            else {
                formData.append('languages', '');
            }

            if (values.skills.length > 0) {
                values.skills.forEach((skill, index) => {
                    formData.append(`skills[${index}][code]`, skill.code);
                });
            }
            else {
                formData.append('skills', '');
            }

            if (id) {
                formData.append('job_id', id);
            }

            toast.promise(updateJob(formData), {
                loading: t('general.UI.loading'),
                success: <b>{t('general.UI.success')}</b>,
                error: (err) => {
                    return <b>{err.error}</b>;
                },
            })
            .then((response) => {

                if (!id) {
                    navigate('/job/' + response.job_id);
                }

                setFormLoading(false);
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
        if (id) {

            getJob(id)
                .then((response) => {
                    delete response.id;

                    if (user.id !== response.employer_id) {
                        navigate('/my-jobs');
                    }

                    response.languages = response.languages.map((language) => {
                        return {
                            id: id + '-' + language.languageCode,
                            languageCode: language.languageCode,
                            level: language.level
                        };
                    });

                    response.skills = response.skills.map((skill) => {
                        return {
                            id: id + '-skill-' + skill.skill_code,
                            code: skill.skill_code
                        };
                    });

                    setFormInitialValues({...response});
                    formik.setValues({...response});
                })
                .catch((error) => {

                    if (error?.error === 'Job not found') {
                        navigate('/my-jobs');
                    }

                    console.log(error);
                });

        }
        else {
            setFormInitialValues({
                title: '',
                description: '',
                country: '',
                category: '',
                city: '',
                languages: [],
                skills: [],
                payment_type: 'monthly',
                job_type: 'full_time',
                hours_low: 30,
                hours_high: 40,
                salary_low: 300,
                salary_high: 500,
                currency: 'usd'
            });
            formik.setValues({
                title: '',
                description: '',
                country: '',
                category: '',
                city: '',
                languages: [],
                skills: [],
                payment_type: 'monthly',
                job_type: 'full_time',
                hours_low: 30,
                hours_high: 40,
                salary_low: 300,
                salary_high: 500,
                currency: 'usd'
            });
        }
    // eslint-disable-next-line
    }, [id, user.id, navigate]);

    const handlePopupClose = (popupName) => {
        if (popupName === 'language') {
            setIsOpenLanguagePopup(false);
        } else if (popupName === 'skills') {
            setIsOpenSkillsPopup(false);
        }
    }

    const handlePopupOpen = (popupName) => {
        if (popupName === 'language') {
            setIsOpenLanguagePopup(true);
        } else if (popupName === 'skills') {
            setIsOpenSkillsPopup(true);
        }
    }

    const handleAddLanguage = (values) => {

        // check if language already exists
        const languageExists = formik.values.languages.find((language) => language.languageCode === values.languageCode);

        if (!languageExists) {
            formik.setFieldValue('languages', [...formik.values.languages, { id: Date.now(), ...values }]);
            handlePopupClose('language');
        }

    }

    const handleAddSkills = (values) => {
        formik.setFieldValue('skills', [...formik.values.skills, ...values.skills.map((skill) => {
            return {
                id: Date.now() + '-' + skill,
                code: skill,
                name: t('general.skill.' + skill)
            }
        })]);
        handlePopupClose('skills');
    }

    const handleOptionRemove = (field, id) => {
        const filteredField = formik.values[field].filter((option) => option.id !== id);
        formik.setFieldValue(field, filteredField);
    }

    const categoryOptions = useGetJobCategoriesHook();
    const currencyOptions = useGetCurrenciesHook();
    const paymentTypeOptions = [
        { value: 'monthly', label: t('general.UI.monthly') },
        { value: 'hourly', label: t('general.UI.hourly') }
    ];
    const jobTypeOptions = [
        { value: 'full_time', label: t('general.UI.full_time') },
        { value: 'part_time', label: t('general.UI.part_time') },
        { value: 'remote', label: t('general.UI.remote') }
    ];
    const statusOptions = [
        { value: 'active', label: t('general.UI.active') },
        { value: 'paused', label: t('general.UI.paused') },
        { value: 'closed', label: t('general.UI.closed') }
    ];

    return (
        <>
            {id ? (
                <Helmet>
                    <title>FindCV - Edit Job</title>
                </Helmet>
            ) : (
                <Helmet>
                    <title>FindCV - Create Job</title>
                </Helmet>
            )}
            <div className={styles.create_job_wrapper}>
                {id ? (<h1>{t('forms.manage_job.title_edit')}</h1>) : (<h1>{t('forms.manage_job.title_create')}</h1>)}

                <form onSubmit={formik.handleSubmit}>
                    <div className={styles.create_job_block}>
                        <Subtitle dark>{t('forms.manage_job.subtitle_general')}</Subtitle>
                        <div>
                            <FormField 
                                name="title" 
                                type="text" 
                                label={t('forms.manage_job.job_title')}
                                hasBorder
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.title}
                                error={formik.touched.title && formik.errors.title}
                            />
                        </div>
                        <div>
                            <FormSelectField
                                name="category"
                                label={t('forms.manage_job.job_category')}
                                placeholder={t('general.UI.select')}
                                type="default"
                                hasBorder
                                options={categoryOptions}
                                onFormikChange={formik.handleChange}
                                value={formik.values.category}
                                error={formik.touched.category && formik.errors.category}
                            />
                        </div>
                        <div>
                            <FormSelectField
                                name="country" 
                                type="country" 
                                label={t('forms.manage_job.job_location_country')}
                                placeholder={t('general.UI.select')}
                                hasBorder
                                onFormikChange={formik.handleChange}
                                value={formik.values.country}
                                error={formik.touched.country && formik.errors.country}
                            />
                        </div>
                        <div>
                            <FormField 
                                name="city" 
                                type="text" 
                                label={t('forms.manage_job.job_location_city')}
                                hasBorder
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.city}
                                error={formik.touched.city && formik.errors.city}
                            />
                        </div>
                        {id && (
                            <div>
                                <FormSelectField
                                    name="status"
                                    label={t('forms.manage_job.job_status')}
                                    placeholder={t('general.UI.select')}
                                    type="default"
                                    hasBorder
                                    options={statusOptions}
                                    onFormikChange={formik.handleChange}
                                    value={formik.values.status}
                                    error={formik.touched.status && formik.errors.status}
                                />
                            </div>
                        )}
                    </div>

                    <div className={styles.create_job_block}>
                        <Subtitle dark>{t('forms.manage_job.subtitle_salary')}</Subtitle>
                        <div className={styles.create_job_salary}>
                            <label>{t('forms.manage_job.salary')}</label>
                            <div>
                                <div>
                                    <FormSelectField 
                                        name="currency"
                                        type="default"
                                        hasBorder
                                        options={currencyOptions}
                                        onFormikChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.currency}
                                        error={formik.touched.currency && formik.errors.currency}
                                    />
                                </div>
                                <div>
                                    <FormNumberField 
                                        name="salary_low"
                                        hasBorder
                                        min={1}
                                        step={0.1}
                                        prefix={t('general.UI.from')}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.salary_low}
                                        error={formik.touched.salary_low && formik.errors.salary_low}
                                    />
                                </div>
                                <div>
                                    <FormNumberField 
                                        name="salary_high"
                                        hasBorder
                                        min={1}
                                        step={0.1}
                                        prefix={t('general.UI.to')}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.salary_high}
                                        error={formik.touched.salary_high && formik.errors.salary_high}
                                    />
                                </div>
                            </div>
                        </div>
                        <div>
                            <FormOptionField
                                name="payment_type"
                                label={t('forms.manage_job.payment_type')}
                                type="radio"
                                dark
                                options={paymentTypeOptions}
                                onChange={formik.handleChange}
                                value={formik.values.payment_type}
                                error={formik.touched.payment_type && formik.errors.payment_type}
                            />
                        </div>
                        <div>
                            <FormOptionField
                                name="job_type"
                                label={t('forms.manage_job.job_type')}
                                type="radio"
                                dark
                                options={jobTypeOptions}
                                onChange={formik.handleChange}
                                value={formik.values.job_type}
                                error={formik.touched.job_type && formik.errors.job_type}
                            />
                        </div>
                        <div className={styles.create_job_working_hours}>
                            <label>{t('forms.manage_job.working_hours_per_week')}</label>
                            <div>
                                <div>
                                    <FormNumberField 
                                        name="hours_low"
                                        hasBorder
                                        min={1}
                                        max={168}
                                        step={1}
                                        prefix={t('general.UI.from')}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.hours_low}
                                        error={formik.touched.hours_low && formik.errors.hours_low}
                                    />
                                </div>
                                <div>
                                    <FormNumberField 
                                        name="hours_high"
                                        hasBorder
                                        min={1}
                                        max={168}
                                        step={1}
                                        prefix={t('general.UI.to')}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.hours_high}
                                        error={formik.touched.hours_high && formik.errors.hours_high}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.create_job_block}>
                        <Subtitle dark>{t('forms.manage_job.subtitle_description')}</Subtitle>
                        <div>
                            <FormRichTextField
                                name="description"
                                label={t('forms.manage_job.description')}
                                hasBorder
                                onFormikChange={formik.handleChange}
                                value={formik.values.description}
                                error={formik.touched.description && formik.errors.description}
                            />
                        </div>
                    </div>

                    <div className={styles.create_job_block}>
                        <Subtitle 
                            dark
                            hasButton 
                            buttonText={t('general.UI.add')}
                            buttonOnClick={() => handlePopupOpen('language')}
                        >
                            {t('forms.manage_job.subtitle_language')}
                        </Subtitle>
                        <div style={{marginBottom: 20}}>
                            <LanguageLevelList languages={formik.values.languages} onRemove={handleOptionRemove} />
                        </div>
                    </div>

                    <div className={styles.create_job_block}>
                        <Subtitle 
                            dark
                            hasButton 
                            buttonText={t('general.UI.add')}
                            buttonOnClick={() => handlePopupOpen('skills')}
                        >
                            {t('forms.manage_job.subtitle_skills')}
                        </Subtitle>
                        <div style={{marginBottom: 10}}>
                            <SkillsList skills={formik.values.skills} onRemove={handleOptionRemove} />
                        </div>
                    </div>

                    <div style={{textAlign: 'center'}}>
                        <Button type="submit">
                            { formLoading && t('general.UI.loading') }
                            { (!formLoading && id) && t('general.UI.save') }
                            { (!formLoading && !id) && t('general.UI.publish') }
                        </Button>
                    </div>
                </form>
            </div>
            {isOpenLanguagePopup && 
                <BasicPopup 
                    isOpen={isOpenLanguagePopup}
                    closePopup={() => handlePopupClose('language')}
                >
                    <LanguageForm onSubmit={handleAddLanguage} />
                </BasicPopup>
            }
            {isOpenSkillsPopup && 
                <BasicPopup 
                    isOpen={isOpenSkillsPopup}
                    closePopup={() => handlePopupClose('skills')}
                >
                    <SkillsForm onSubmit={handleAddSkills} excludeSkills={formik.values.skills.map(option => option.code)} />
                </BasicPopup>
            }
        </>
    );
}
    
export default EditJob;