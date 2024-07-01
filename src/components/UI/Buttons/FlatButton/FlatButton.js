import LinkWrapper from '../../../wrappers/LinkWrapper';
import styles from './FlatButton.module.css';

function FlatButton({ icon, disabled = false, children, ...props }) {

    if (props.href) {
        return (
            <a className={styles.button} disabled={disabled} {...props}>
                {icon && <img src={icon} alt={children} />}
                <span>{children}</span>
            </a>
        );
    }
    else if (props.type) {
        return (
            <button className={styles.button} disabled={disabled} {...props}>
                {icon && <img src={icon} alt={children} />}
                <span>{children}</span>
            </button>
        );
    
    }
    else {
        return (
            <LinkWrapper className={styles.button} disabled={disabled} {...props}>
                {icon && <img src={icon} alt={children} />}
                <span>{children}</span>
            </LinkWrapper>
        );
    
    }
}

export default FlatButton;