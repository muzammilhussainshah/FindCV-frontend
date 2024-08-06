import { useTranslation } from 'react-i18next';

import LanguageSwitch from '../UI/LanguageSwitch/LanguageSwitch';
import SimpleLink from '../UI/Buttons/SimpleLink/SimpleLink';

import styles from './defaultFooter.module.css';

import logoImage from '../../assets/images/logo.png';
// import twitter_icon from '../../assets/images/icons/twitter.svg';
// import twitter_icon_white from '../../assets/images/icons/twitter-white.svg';
import facebook_icon from '../../assets/images/icons/facebook.svg';
import facebook_icon_white from '../../assets/images/icons/facebook-white.svg';
// import google_icon from '../../assets/images/icons/google.svg';
// import google_icon_white from '../../assets/images/icons/google-white.svg';
import instagram_icon from '../../assets/images/icons/instagram.svg';
import instagram_icon_white from '../../assets/images/icons/instagram-white.svg';

function DefaultFooter() {
    const { t } = useTranslation();

    return (
        <>
            <div className={styles.footer_top}>
                <div className="fcv-content">
                    <div className="fcv-row">
                        <h3>{t('defaultFooter.find_jobs')}</h3>
                        <div className={styles.footer_top_jobs_list}>
                            <ul>
                                <li>
                                    <a href="https://findcv.com/jobs-in-uae/">{t('defaultFooter.jobs_in_uae')}</a>
                                </li>
                                <li>
                                    <a href="https://findcv.com/jobs-in-saudi-arabia/">{t('defaultFooter.jobs_in_saudi_arabia')}</a>
                                </li>
                                <li>
                                    <a href="https://findcv.com/jobs-in-oman/">{t('defaultFooter.jobs_in_oman')}</a>
                                </li>
                                <li>
                                    <a href="https://findcv.com/jobs-in-kuwait/">{t('defaultFooter.jobs_in_kuwait')}</a>
                                </li>
                            </ul>

                            <ul>
                                <li>
                                    <a href="https://findcv.com/jobs-in-bahrain/">{t('defaultFooter.jobs_in_bahrain')}</a>
                                </li>
                                <li>
                                    <a href="https://findcv.com/jobs-in-qatar/">{t('defaultFooter.jobs_in_qatar')}</a>
                                </li>
                            </ul>

                            <ul>
                                <li>
                                    <a href="https://findcv.com/jobs-in-dubai/">{t('defaultFooter.jobs_in_dubai')}</a>
                                </li>
                                <li>
                                    <a href="https://findcv.com/jobs-in-al-ain/">{t('defaultFooter.jobs_in_al_ain')}</a>
                                </li>
                                <li>
                                    <a href="https://findcv.com/jobs-in-abu-dhabi/">{t('defaultFooter.jobs_in_abu_dhabi')}</a>
                                </li>
                                <li>
                                    <a href="https://findcv.com/jobs-in-riyadh/">{t('defaultFooter.jobs_in_riyadh')}</a>
                                </li>
                            </ul>

                            <ul>
                                <li>
                                    <a href="https://findcv.com/jobs-in-jeddah/">{t('defaultFooter.jobs_in_jeddah')}</a>
                                </li>
                                <li>
                                    <a href="https://findcv.com/jobs-in-muscat/">{t('defaultFooter.jobs_in_muscat')}</a>
                                </li>
                                <li>
                                    <a href="https://findcv.com/jobs-in-doha/">{t('defaultFooter.jobs_in_doha')}</a>
                                </li>
                                <li>
                                    <a href="https://findcv.com/jobs-in-manama/">{t('defaultFooter.jobs_in_manama')}</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <footer className={styles.footer}>
                <div className="fcv-content">
                    <div className="fcv-row">

                        <div className={styles.footer_main}>
                            <div className={styles.col}>
                                <img src={logoImage} alt="FindCV logo" />
                                <p>{t('defaultFooter.moto')}</p>
                                <LanguageSwitch />

                                <nav>
                                    {/* <a href="https://twitter.com/" target="_blank" rel="noreferrer">
                                        <img src={twitter_icon} alt="Twitter" />
                                        <img src={twitter_icon_white} alt="Twitter" />
                                    </a> */}
                                    <a href="https://www.facebook.com/people/Findcvcom/61555972312508/?mibextid=LQQJ4d&rdid=vbYHHM8HONcHB6Zs&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2FNPjtUhqVN7XHFZ1N%2F%3Fmibextid%3DLQQJ4d" target="_blank" rel="noreferrer">
                                        <img src={facebook_icon} alt="Facebook" />
                                        <img src={facebook_icon_white} alt="Facebook" />
                                    </a>
                                    {/* <a href="https://google.com/" target="_blank" rel="noreferrer">
                                        <img src={google_icon} alt="Google" />
                                        <img src={google_icon_white} alt="Google" />
                                    </a> */}
                                    <a href="https://www.instagram.com/findcvcom/" target="_blank" rel="noreferrer">
                                        <img src={instagram_icon} alt="Instagram" />
                                        <img src={instagram_icon_white} alt="Instagram" />
                                    </a>
                                </nav>
                            </div>

                            <div className={styles.col}>
                                <nav>
                                    <h6>{t('defaultFooter.menu_title_1')}</h6>
                                    <SimpleLink to="/jobseekers">{t('defaultFooter.talents')}</SimpleLink>
                                    <SimpleLink href="https://findcv.com/for-employers/">{t('defaultFooter.about')}</SimpleLink>
                                    <SimpleLink href="https://findcv.com/for-employers#so-faq">{t('defaultFooter.faqs')}</SimpleLink>
                                </nav>
                                <nav>
                                    <h6>{t('defaultFooter.menu_title_2')}</h6>
                                    <SimpleLink to="/jobs">{t('defaultFooter.jobs')}</SimpleLink>
                                    <SimpleLink href="https://findcv.com/for-talents/">{t('defaultFooter.about')}</SimpleLink>
                                    <SimpleLink href="https://findcv.com/for-talents#so-faq">{t('defaultFooter.faqs')}</SimpleLink>
                                </nav>
                                <nav>
                                    <h6>{t('defaultFooter.menu_title_3')}</h6>
                                    <SimpleLink href="https://findcv.com/">{t('defaultFooter.homepage')}</SimpleLink>
                                    <SimpleLink href="https://findcv.com/about">{t('defaultFooter.about')}</SimpleLink>
                                    <SimpleLink href="https://findcv.com/contact-us">{t('defaultFooter.contact_us')}</SimpleLink>
                                    <SimpleLink href="https://findcv.com/blog">{t('defaultFooter.blog')}</SimpleLink>
                                </nav>
                            </div>
                        </div>
                        <div className={styles.footer_second}>
                            <div className={styles.col}>
                                <SimpleLink href="https://findcv.com/privacy-policy">{t('defaultFooter.privacy_policy')}</SimpleLink>
                                <SimpleLink href="https://findcv.com/terms-of-use">{t('defaultFooter.terms_of_use')}</SimpleLink>
                            </div>

                            <div className={styles.col}>
                                <p>{t('defaultFooter.privacy_text')}</p>
                            </div>

                            <div className={styles.col}>
                                <p>Made by <a href="https://zenith.team/" rel='nofollow'>Zenith</a></p>
                            </div>
                        </div>

                    </div>
                </div>
            </footer>
        </>
    );
}

export default DefaultFooter;