import styles from './Table.module.css';

function Table({data, ...props}) {
    return (
        <table className={styles.table} {...props}>
            <tbody>
                {data.map((line) => (
                    <tr key={line.key}>
                        <th>{line.label}</th>
                        <td>{line.value}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default Table;