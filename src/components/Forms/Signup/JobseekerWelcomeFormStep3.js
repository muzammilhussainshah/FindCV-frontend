import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import LogicTestForm from '../Common/LogicTestForm/LogicTestForm';
import Button from '../../UI/Buttons/Button/Button';

import { fetchUserByToken } from '../../../app/features/userSlice';
import { updateUser } from '../../../services/userService';
import { getQuestions } from '../../../services/logicTestService';

import styles from './JobseekerWelcomeForms.module.css';

function JobseekerWelcomeFormStep3(props) {
    const userToken = useSelector(state => state.user.token);
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const [showTest, setShowTest] = useState(false);
    const [testOptions, setTestOptions] = useState([]);

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
        getQuestions({ token: userToken })
        .then((data) => {
            
            if (data.questions) {
                const questions = data.questions.map((question, index) => {
                    return {
                        id: index,
                        question: question.question,
                        answers: Object.entries(question.answers).map(([key, value]) => {
                            return { label: value, value: key };
                        })
                    }
                });
                setTestOptions(questions);

                setShowTest(true);
            }

        });
    }

    let content = '';

    if (showTest) {
        content = <LogicTestForm questions={testOptions} />;
    }
    else {
        content = <>
            <div className={styles.logic_test_info}>
                <span>Test on logic</span>
                <span>10-15 minutes</span>
            </div>
            <div className={styles.logic_test_buttons}>
                <Button type="button" outlined onClick={handleTestSkip}>Skip</Button>
                <Button type="button" onClick={handleStartTest}>Take Test</Button>
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