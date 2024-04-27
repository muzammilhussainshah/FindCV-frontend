import styles from './BlockLoader.module.css';

const BlockLoader = ({height, marginBottom, children, ...props}) => {

    const style = {
        height: height ? `${height}px` : '200px',
        marginBottom: marginBottom ? `${marginBottom}px` : '0'
    };

    if (height > 200) {
        style.borderRadius = '15px';
    }
    else {
        style.borderRadius = '5px';
    }

    return (
        <div className={styles.blockLoader} style={style} {...props}>
            {children}
        </div>
    );
};

export default BlockLoader;