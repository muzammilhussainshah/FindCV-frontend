import { Link } from 'react-router-dom';
import styles from './BubbleButton.module.css';

function BubbleButton({ className, icon, icon_position, children, ...props }) {
    // console.log(props);

    const icon_class = icon ? `icon-${icon}` : '';
    const icon_position_class = icon_position ? `icon-${icon_position}` : '';
    const defaultClass = className ? className : '';
    const buttonClass = `${styles.button} ${icon_class} ${icon_position_class} ${defaultClass}`;

    const href = props.href ? props.href : false;

    if (href) {
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
