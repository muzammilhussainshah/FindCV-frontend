import { Link } from 'react-router-dom';

function LinkWrapper({ children, onClick, ...props }) {

    const handleClick = () => {
        if (onClick) {
            onClick();
        }
        else {
            window.scrollTo(0, 0);
        }
    }

    return (
        <Link {...props} onClick={handleClick}>
            {children}
        </Link>
    );
}

export default LinkWrapper;