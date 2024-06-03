import Button from '../../components/UI/Buttons/Button/Button'

import styles from './MyJobs.module.css';

function MyJobs() {

    return (
        <div className={styles.wrapper}>
            <h1>My Jobs</h1>

            <div className={styles.head}>
                <div>
                    <span>My Jobs: 3</span>
                    <span>Active: 1</span>
                    <span>Closed: 2</span>
                </div>
                <div>
                    <Button to="/create-job">Post New Job</Button>
                </div>
            </div>
        </div>
    );
}
    
export default MyJobs;