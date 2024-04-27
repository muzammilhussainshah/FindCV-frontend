import styles from './InfoBlock.module.css';

function InfoBlock({icon, label, text, ...props}) {
    return (
        <div className={styles.infoBlock} {...props}>
            <img src={icon} alt={label} />
            <span>{label}</span>
            <span>{text}</span>
        </div>
    );
}

export default InfoBlock;