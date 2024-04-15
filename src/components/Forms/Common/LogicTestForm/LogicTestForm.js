import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import Yup from '../../../../utils/yupExtensions';

import FormOptionField from '../../../UI/FormUI/FormOptionField/FormOptionField';
import Button from '../../../UI/Buttons/Button/Button';

// import styles from './LogicTestForm.module.css';

function LogicTestForm({questions, props}) {
    const { t } = useTranslation();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const initialValues = {};
    questions.forEach((question, index) => {
        initialValues['question_' + index] = '';
    });

    const validationSchemaOptions = {};
    questions.forEach((question, index) => {
        validationSchemaOptions['question_' + index] = Yup.string().required('Required');
    });

    const validationSchema = Yup.object(validationSchemaOptions);

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: values => {
            console.log(values);

            setIsSubmitting(true);

            // onSubmit({ 
            //     languageCode: values.language.toUpperCase(),
            //     level: values.languageLevel 
            // });
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} {...props}>
            {questions && questions.map((question, index) => {
                return (
                    <div key={'question_' + index}>
                        <FormOptionField 
                            name={'question_' + index}
                            label={(index+1) + '. ' + question.question}
                            type="radio"
                            onePerLine
                            onChange={formik.handleChange}
                            options={question.answers}
                            value={formik.values['question_' + index]}
                            error={formik.errors['question_' + index]}
                        />
                    </div>
                );
            })}
            <Button type="submit" style={{display: 'block'}}>
                {isSubmitting ? t('general.UI.loading') : t('general.UI.submit')}
            </Button>
        </form>
    );
}

export default LogicTestForm;