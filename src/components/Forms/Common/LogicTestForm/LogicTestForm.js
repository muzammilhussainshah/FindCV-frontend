import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import Yup from '../../../../utils/yupExtensions';
import toast from 'react-hot-toast';

import { fetchUserByToken } from '../../../../app/features/userSlice';
import { submitAnswers } from '../../../../services/logicTestService';

import FormOptionField from '../../../UI/FormUI/FormOptionField/FormOptionField';
import Button from '../../../UI/Buttons/Button/Button';
import Notice from '../../../UI/Common/Notice/Notice';

// import styles from './LogicTestForm.module.css';

function LogicTestForm({isDark, callback, questions, answersToken, props}) {
    const userToken = useSelector(state => state.user.token);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { t } = useTranslation();
    const dispatch = useDispatch();

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

            setIsSubmitting(true);

            if (isSubmitting) {
                return;
            }

            toast.promise(submitAnswers({ token: userToken, answers_token: answersToken, answers: values }), {
                loading: t('general.UI.loading'),
                success: <b>{t('general.UI.success')}</b>,
                error: (err) => {
                    return <b>{t('general.UI.something_went_wrong')}</b>;
                },
            })
            .then((data) => {
                dispatch(fetchUserByToken(userToken));
            })
            .then((data) => {
                if (callback) {
                    callback();
                }
            })
            .catch((err) => {
                toast.error(t('general.UI.something_went_wrong'));
                setIsSubmitting(false);
            });

        },
    });

    return (
        <form onSubmit={formik.handleSubmit} {...props}>
            <Notice warning>{t('forms.logic_test.notice')}</Notice>

            {questions && questions.map((question, index) => {
                return (
                    <div key={'question_' + index}>
                        <FormOptionField 
                            name={'question_' + index}
                            label={(index+1) + '. ' + question.question}
                            type="radio"
                            onePerLine
                            dark={isDark}
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