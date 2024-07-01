import LinkWrapper from '../../../wrappers/LinkWrapper';
import styles from './SimpleLink.module.css';

function SimpleLink({ onClick, children, style = {}, ...props }) {
    // console.log(props);

    const icon_class = props.icon ? `icon-${props.icon}` : '';
    const icon_position = props.icon_position ? `icon-${props.icon_position}` : '';
    const defaultClass = props.className ? props.className : '';
    const linkClass = `${styles.link} ${icon_class} ${icon_position} ${defaultClass}`;
    const href = props.href ? props.href : false;
    const target = props.target ? props.target : '_self';
    const to = props.to ? props.to : false;

    const handleClick = () => {
        if (onClick) {
            onClick();
        }
        else {
            window.scrollTo(0, 0);
        }
    }

    if (onClick && !href && !to) {
        return (
            <span className={linkClass} onClick={onClick} style={style}>
                <span>{children}</span>
            </span>
        );
    }
    else if (href) {
        return (
            <a className={linkClass} href={href} target={target} onClick={handleClick} style={style}>
                <span>{children}</span>
            </a>
        );
    }
    else {
        return (
            <LinkWrapper className={linkClass} to={to} onClick={onClick} style={style}>
                <span>{children}</span>
            </LinkWrapper>
        );
    
    }
}

export default SimpleLink;
