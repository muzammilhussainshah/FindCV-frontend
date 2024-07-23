import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import Yup from '../../../../utils/yupExtensions';

import FormSelectField from '../../../UI/FormUI/FormSelectField/FormSelectField';
import Button from '../../../UI/Buttons/Button/Button';

import { useGetJobCategoriesHook } from '../../../../utils/utilityHooks';

import styles from './OccupationsForm.module.css';

function OccupationsForm({ onSubmit, excludeOccupations, ...props }) {
    const { t } = useTranslation();

    const formik = useFormik({
        initialValues: {
            occupations: []
        },
        validationSchema: Yup.object({
            occupations: Yup.array().min(1, t('forms.occupations.required'))
        }),
        onSubmit: values => {
            onSubmit(values);
        },
    });

    let options = useGetJobCategoriesHook();

    if (excludeOccupations) {
        options = options.filter(option => !excludeOccupations.includes(option.value));
    }

    const handleOccupationsChange = (value) => {
        formik.setFieldValue('occupations', value);
    }

    return (
        <form onSubmit={formik.handleSubmit} {...props}>
            <div>
                <FormSelectField
                    name="occupations" 
                    type="default"
                    placeholder={t('forms.occupations.your_occupations')}
                    isMulti
                    hasBorder
                    options={options}
                    onChange={handleOccupationsChange}
                    value={formik.values.occupations}
                    error={formik.touched.occupations && formik.errors.occupations}
                />
            </div>
            <div>
                <Button type="submit" className={styles.button}>{t('forms.occupations.add')}</Button>
            </div>
        </form>
    );
}

export default OccupationsForm;