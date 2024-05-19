import { Link } from 'react-router-dom';
import styles from './BubbleButton.module.css';

function BubbleButton({ className, small, dark, icon, icon_position, iconOnlyOnMobile, children, ...props }) {
    // console.log(props);

    const icon_class = icon ? `icon-${icon}` : '';
    const icon_position_class = icon_position ? `icon-${icon_position}` : '';
    const defaultClass = className ? className : '';
    let buttonClass = `${styles.button} ${icon_class} ${icon_position_class} ${defaultClass}`;

    if (small) {
        buttonClass += ` ${styles.small}`;
    }

    if (dark) {
        buttonClass += ` ${styles.dark}`;
    }
    
    if (iconOnlyOnMobile) {
        buttonClass += ` ${styles.iconOnlyOnMobile}`;
    }

    const href = props.href ? props.href : false;

    if (props.type) {
        return (
            <button className={buttonClass} {...props}>
                <span>{children}</span>
            </button>
        );
    }
    else if (href) {
        return (
            <a className={buttonClass} {...props}>
                <span>{children}</span>
            </a>
        );
    }
    else {
        return (
            <Link className={buttonClass} {...props}>
                <span>{children}</span>
            </Link>
        );
    }
}

export default BubbleButton;
