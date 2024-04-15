import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';

import LogicTestForm from '../Common/LogicTestForm/LogicTestForm';
import Button from '../../UI/Buttons/Button/Button';
import Notice from '../../UI/Common/Notice/Notice';

import { fetchUserByToken } from '../../../app/features/userSlice';
import { updateUser } from '../../../services/userService';
import { getQuestions } from '../../../services/logicTestService';

import styles from './JobseekerWelcomeForms.module.css';

function JobseekerWelcomeFormStep3(props) {
    const userToken = useSelector(state => state.user.token);
    const language = useSelector((state) => state.translation.language);
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const [isTestLoading, setIsTestLoading] = useState(false);
    const [showTest, setShowTest] = useState(false);
    const [testOptions, setTestOptions] = useState([]);
    const [answersToken, setAnswersToken] = useState('');

    const handleTestSkip = () => {
        updateUser({
            token: userToken,
            step: 3
        })
        .then(() => {
            dispatch(fetchUserByToken(userToken));
        });
    }

    const handleStartTest = () => {
        setIsTestLoading(true);

        toast.promise(getQuestions({ token: userToken, language: language }), {
            loading: t('forms.welcome_job_seeker.step_3.generationg_test'),
            success: <b>{t('forms.welcome_job_seeker.step_3.test_ready')}</b>,
            error: (err) => {
                return <b>{err.response.data.error}</b>;
            },
        })
        .then((data) => {
            let questions = [];
            
            if (data.questions) {

                if (data.questions.questions) {
                    questions = data.questions.questions.map((question, index) => {
                        return {
                            id: index,
                            question: question.question,
                            answers: Object.entries(question.answers).map(([key, value]) => {
                                return { label: value, value: key };
                            })
                        }
                    });
                }
                else {
                    questions = data.questions.map((question, index) => {
                        return {
                            id: index,
                            question: question.question,
                            answers: Object.entries(question.answers).map(([key, value]) => {
                                return { label: value, value: key };
                            })
                        }
                    });
                }

                setAnswersToken(data.answers_token);
                setTestOptions(questions);

                setShowTest(true);
                setIsTestLoading(false);
            }

        })
        .then((data) => {
            updateUser({
                token: userToken,
                step: 3
            })
        })
        .catch((error) => {
            toast.error(error.response.data.error);
            setIsTestLoading(false);
        });

    }

    let content = '';

    if (showTest) {
        content = <LogicTestForm questions={testOptions} answersToken={answersToken} />;
    }
    else {
        content = <>
            <div className={styles.logic_test_info}>
                <span>{t('forms.welcome_job_seeker.step_3.test_on_logic')}</span>
                <span>{t('forms.welcome_job_seeker.step_3.minutes')}</span>
            </div>
            <Notice warning>{t('forms.welcome_job_seeker.step_3.test_frequency')}</Notice>
            <div className={styles.logic_test_buttons}>
                <Button type="button" outlined onClick={handleTestSkip}>
                    {t('general.UI.skip')}
                </Button>
                <Button type="button" onClick={handleStartTest}>
                    {isTestLoading ? t('general.UI.loading') : t('forms.welcome_job_seeker.step_3.take_test')}
                </Button>
            </div>
        </>;
    }

    return (
        <div className={styles.logic_test}>
            {content}
        </div>
    );
}

export default JobseekerWelcomeFormStep3;