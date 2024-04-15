import styles from './Notice.module.css';

function Notice({warning, children, props}) {

    let wrapperClass = styles.notice;

    if (warning) {
        wrapperClass = `${wrapperClass} ${styles.warning}`;
    }

    return (
        <div className={wrapperClass} {...props}>
            {children}
        </div>
    );
}

export default Notice;