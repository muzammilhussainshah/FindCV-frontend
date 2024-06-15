import styles from './BubbleCheckbox.module.css';

function BubbleCheckbox({ color = 'blue', name, label, value, ...props }) {

    let classes = styles[color];

    return (
        <div className={styles.wrapper}>
            <input type="checkbox" checked={value} id={name} name={name} {...props} />
            <label htmlFor={name} className={classes}>{label}</label>
        </div>
    );
}

export default BubbleCheckbox;