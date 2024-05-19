import styles from './List.module.css';

function List({isOpen, icon, children, ...props}) {
    return (
        <ul className={`${styles.list} ${styles[icon]}`} {...props}>
            {children}
        </ul>
    );
}

export default List;