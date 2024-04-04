import { Link } from 'react-router-dom';
import styles from './SimpleLink.module.css';

function SimpleLink({ children, ...props }) {
    // console.log(props);

    const icon_class = props.icon ? `icon-${props.icon}` : '';
    const icon_position = props.icon_position ? `icon-${props.icon_position}` : '';
    const defaultClass = props.className ? props.className : '';
    const linkClass = `${styles.link} ${icon_class} ${icon_position} ${defaultClass}`;
    const href = props.href ? props.href : false;
    const target = props.target ? props.target : '_self';
    const to = props.to ? props.to : false;

    if (href) {
        return (
            <a className={linkClass} href={href} target={target}>
                <span>{children}</span>
            </a>
        );
    }
    else {
        return (
            <Link className={linkClass} to={to}>
                <span>{children}</span>
            </Link>
        );
    
    }
}

export default SimpleLink;
