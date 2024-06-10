import { Link } from 'react-router-dom';
import styles from './IconButton.module.css';

function IconButton({ color, icon, ...props }) {

    let classes = styles.button;

    if (color) {
        classes += ' ' + styles[color];
    }

    if (props.to) {
        return (
            <Link className={classes} {...props} >
                <img src={icon} alt="" />
            </Link>
        );
    }
    else {
        return (
            <div className={classes} {...props} >
                <img src={icon} alt="" />
            </div>
        );
    }
}

export default IconButton;