import Flag from 'react-flags';
import BubbleButton from '../../../Buttons/BubbleButton/BubbleButton';

import category_icon from '../../../../../assets/images/icons/job_categories/construction.svg';
import money_icon from '../../../../../assets/images/icons/money-alt.svg';
import users_icon from '../../../../../assets/images/icons/users-alt.svg';
import suitcase_icon from '../../../../../assets/images/icons/suitcase-alt.svg';

import styles from './JobsCard.module.css';

function JobsCard({ test, ...props }) {

    const desc = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

    return (
        <div className={styles.job_card} {...props}>
            <div className={styles.job_card_head}>
                <div className={styles.job_card_head_info}>

                    <div className={styles.job_card_head_info_icon}>
                        <img src={category_icon} alt="Category Icon" />
                    </div>

                    <div className={styles.job_card_head_info_main}>
                        <h5>Pool cleaner</h5>
                        <div>
                            <Flag 
                                name={"IN"}
                                format="svg"
                                shiny={false}
                                basePath="/vendor/flags"
                            />
                            <p>India, Delhi - Microsoft</p>
                        </div>
                    </div>

                </div>
                <div>
                    <BubbleButton small>View</BubbleButton>
                </div>
            </div>
            <div className={styles.job_card_body}>
                <p className={styles.job_card_body_date}>Posted 3 days ago</p>
                <div className={styles.job_card_body_main}>
                    {desc.length > 240 ? (
                        <p>
                            {desc.slice(0, 240) + '... '}
                            <span>Show More</span>
                        </p>
                    ) : (
                        <p>{desc}</p>
                    )}
                </div>
            </div>
            <div className={styles.job_card_footer}>
                <p>
                    <img src={money_icon} alt="Salary Icon" />
                    <span>$4.300 <span>/ month</span></span>
                </p>
                <p>
                    <img src={users_icon} alt="Applications Icon" />
                    <span>162 Applications</span>
                </p>
                <p>
                    <img src={suitcase_icon} alt="Jobtype Icon" />
                    <span>Full-time</span>
                </p>
            </div>
        </div>
    );
}

export default JobsCard;