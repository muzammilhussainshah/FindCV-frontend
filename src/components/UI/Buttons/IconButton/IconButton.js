import LinkWrapper from '../../../wrappers/LinkWrapper';
import styles from './IconButton.module.css';

function IconButton({ color, icon, ...props }) {

    let classes = styles.button;

    if (color) {
        classes += ' ' + styles[color];
    }

    if (props.to) {
        return (
            <LinkWrapper className={classes} {...props}>
                <img src={icon} alt="" />
            </LinkWrapper>
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