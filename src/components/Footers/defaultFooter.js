import LanguageSwitch from '../UI/LanguageSwitch/LanguageSwitch';
import SimpleLink from '../UI/Buttons/SimpleLink/SimpleLink';

import styles from './defaultFooter.module.css';

import logoImage from '../../assets/images/logo.png';
import twitter_icon from '../../assets/images/icons/twitter.svg';
import twitter_icon_white from '../../assets/images/icons/twitter-white.svg';
import facebook_icon from '../../assets/images/icons/facebook.svg';
import facebook_icon_white from '../../assets/images/icons/facebook-white.svg';
import google_icon from '../../assets/images/icons/google.svg';
import google_icon_white from '../../assets/images/icons/google-white.svg';
import instagram_icon from '../../assets/images/icons/instagram.svg';
import instagram_icon_white from '../../assets/images/icons/instagram-white.svg';

function DefaultFooter() {
    return (
        <footer className={styles.footer}>
            <div className="fcv-content">
                <div className="fcv-row">

                    <div className={styles.footer_main}>
                        <div className={styles.col}>
                            <img src={logoImage} alt="FindCV logo" />
                            <p>Empowering Connections, Shaping Futures.</p>
                            <LanguageSwitch />

                            <nav>
                                <a href="https://twitter.com/" target="_blank" rel="noreferrer">
                                    <img src={twitter_icon} alt="Twitter" />
                                    <img src={twitter_icon_white} alt="Twitter" />
                                </a>
                                <a href="https://facebook.com/" target="_blank" rel="noreferrer">
                                    <img src={facebook_icon} alt="Facebook" />
                                    <img src={facebook_icon_white} alt="Facebook" />
                                </a>
                                <a href="https://google.com/" target="_blank" rel="noreferrer">
                                    <img src={google_icon} alt="Google" />
                                    <img src={google_icon_white} alt="Google" />
                                </a>
                                <a href="https://instagram.com/" target="_blank" rel="noreferrer">
                                    <img src={instagram_icon} alt="Instagram" />
                                    <img src={instagram_icon_white} alt="Instagram" />
                                </a>
                            </nav>
                        </div>

                        <div className={styles.col}>
                            <nav>
                                <h6>For Employer</h6>
                                <SimpleLink to="/talents">Talents</SimpleLink>
                                <SimpleLink href="https://findcv.com/about">About</SimpleLink>
                                <SimpleLink href="https://findcv.com/about#faq">FAQs</SimpleLink>
                            </nav>
                            <nav>
                                <h6>For Job Seeker</h6>
                                <SimpleLink to="/talents">Jobs</SimpleLink>
                                <SimpleLink href="https://findcv.com/about">About</SimpleLink>
                                <SimpleLink href="https://findcv.com/about#faq">FAQs</SimpleLink>
                            </nav>
                            <nav>
                                <h6>Other</h6>
                                <SimpleLink href="https://findcv.com/">Homepage</SimpleLink>
                                <SimpleLink href="https://findcv.com/about">About</SimpleLink>
                                <SimpleLink href="https://findcv.com/contact-us">Contact Us</SimpleLink>
                                <SimpleLink href="https://findcv.com/blog">Blog</SimpleLink>
                            </nav>
                        </div>
                    </div>
                    <div className={styles.footer_second}>
                        <div className={styles.col}>
                            <SimpleLink href="https://findcv.com/terms-of-use">Terms of use</SimpleLink>
                            <SimpleLink href="https://findcv.com/privacy-policy">Privacy Policy</SimpleLink>
                        </div>

                        <div className={styles.col}>
                            <p>© 2024 FindCV. All rights reserved.</p>
                        </div>

                        <div className={styles.col}>
                            <p>Made by <a href="https://zenith.team/">Zenith</a></p>
                        </div>
                    </div>

                </div>
            </div>
        </footer>
    );
}

export default DefaultFooter;