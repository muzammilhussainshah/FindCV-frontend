import { Link } from 'react-router-dom';
import styles from './Button.module.css';

function Button({ className, icon, icon_position, disabled = false, outlined, children, ...props }) {
    // console.log(props);

    const icon_class = icon ? `icon-${icon}` : '';
    const icon_position_class = icon_position ? `icon-${icon_position}` : '';
    const defaultClass = className ? className : '';
    let buttonClass = `${styles.button} ${icon_class} ${icon_position_class} ${defaultClass}`;

    if (outlined) {
        buttonClass += ` ${styles.buttonOutline}`;
    }

    if (props.href) {
        return (
            <a className={buttonClass} disabled={disabled} {...props}>
                <span>{children}</span>
            </a>
        );
    }
    else if (props.type) {
        return (
            <button className={buttonClass} disabled={disabled} {...props}>
                <span>{children}</span>
            </button>
        );
    
    }
    else {
        return (
            <Link className={buttonClass} disabled={disabled} {...props}>
                <span>{children}</span>
            </Link>
        );
    
    }
}

export default Button;
