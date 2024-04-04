import { Link } from 'react-router-dom';
import styles from './Button.module.css';

function Button({ className, icon, icon_position, children, ...props }) {
    // console.log(props);

    const icon_class = icon ? `icon-${icon}` : '';
    const icon_position_class = icon_position ? `icon-${icon_position}` : '';
    const defaultClass = className ? className : '';
    const buttonClass = `${styles.button} ${icon_class} ${icon_position_class} ${defaultClass}`;

    if (props.href) {
        return (
            <a className={buttonClass} {...props}>
                <span>{children}</span>
            </a>
        );
    }
    else if (props.type) {
        return (
            <button className={buttonClass} {...props}>
                <span>{children}</span>
            </button>
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

export default Button;
