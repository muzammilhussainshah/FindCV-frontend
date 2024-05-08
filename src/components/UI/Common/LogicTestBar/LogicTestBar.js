import styles from './LogicTestBar.module.css';

function LogicTestBar({fill, children, ...props}) {

    let percentage_fill = fill * 10;
    let color = '';
    let desc = '';

    switch (true) {
        case fill === null:
            color = '#B2B2B2';
            desc = 'Not Attempted';
            break;
        case percentage_fill >= 80:
            color = '#34A853';
            desc = `Excellent - (${percentage_fill}%)`;
            break;
        case percentage_fill >= 60:
            color = '#AEB930';
            desc = `Good - (${percentage_fill}%)`;
            break;
        case percentage_fill >= 40:
            color = '#F2C94C';
            desc = `Average - (${percentage_fill}%)`;
            break;
        case percentage_fill >= 20:
            color = '#F2884C';
            desc = `Poor - (${percentage_fill}%)`;
            break;
        default:
            color = '#EA4335';
            desc = `Very Poor - (${fill}%)`;
            break;
    }

    return (
        <div className={styles.bar} style={{borderColor: color}} {...props}>
            <span style={{minWidth: percentage_fill + '%', backgroundColor: color}}>{desc}</span>
            <svg width="610" height="36" viewBox="0 0 610 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="322.938" y="-10.4808" width="14" height="60" transform="rotate(30 322.938 -10.4808)" fill={color} fillOpacity="0.3"/>
                <rect x="354.938" y="-10.4808" width="14" height="60" transform="rotate(30 354.938 -10.4808)" fill={color} fillOpacity="0.3"/>
                <rect x="386.938" y="-10.4808" width="14" height="60" transform="rotate(30 386.938 -10.4808)" fill={color} fillOpacity="0.3"/>
                <rect x="418.938" y="-10.4808" width="14" height="60" transform="rotate(30 418.938 -10.4808)" fill={color} fillOpacity="0.3"/>
                <rect x="450.938" y="-10.4808" width="14" height="60" transform="rotate(30 450.938 -10.4808)" fill={color} fillOpacity="0.3"/>
                <rect x="482.938" y="-10.4808" width="14" height="60" transform="rotate(30 482.938 -10.4808)" fill={color} fillOpacity="0.3"/>
                <rect x="514.938" y="-10.4808" width="14" height="60" transform="rotate(30 514.938 -10.4808)" fill={color} fillOpacity="0.3"/>
                <rect x="546.938" y="-10.4808" width="14" height="60" transform="rotate(30 546.938 -10.4808)" fill={color} fillOpacity="0.3"/>
                <rect x="578.938" y="-10.4808" width="14" height="60" transform="rotate(30 578.938 -10.4808)" fill={color} fillOpacity="0.3"/>
                <rect x="610.938" y="-10.4808" width="14" height="60" transform="rotate(30 610.938 -10.4808)" fill={color} fillOpacity="0.3"/>
                <rect x="290.938" y="-10.4808" width="14" height="60" transform="rotate(30 290.938 -10.4808)" fill={color} fillOpacity="0.3"/>
                <rect x="66.9375" y="-10.4808" width="14" height="60" transform="rotate(30 66.9375 -10.4808)" fill={color} fillOpacity="0.3"/>
                <rect x="98.9375" y="-10.4808" width="14" height="60" transform="rotate(30 98.9375 -10.4808)" fill={color} fillOpacity="0.3"/>
                <rect x="130.938" y="-10.4808" width="14" height="60" transform="rotate(30 130.938 -10.4808)" fill={color} fillOpacity="0.3"/>
                <rect x="162.938" y="-10.4808" width="14" height="60" transform="rotate(30 162.938 -10.4808)" fill={color} fillOpacity="0.3"/>
                <rect x="194.938" y="-10.4808" width="14" height="60" transform="rotate(30 194.938 -10.4808)" fill={color} fillOpacity="0.3"/>
                <rect x="226.938" y="-10.4808" width="14" height="60" transform="rotate(30 226.938 -10.4808)" fill={color} fillOpacity="0.3"/>
                <rect x="258.938" y="-10.4808" width="14" height="60" transform="rotate(30 258.938 -10.4808)" fill={color} fillOpacity="0.3"/>
                <rect x="34.9375" y="-10.4808" width="14" height="60" transform="rotate(30 34.9375 -10.4808)" fill={color} fillOpacity="0.3"/>
                <rect x="2.9375" y="-10.4808" width="14" height="60" transform="rotate(30 2.9375 -10.4808)" fill={color} fillOpacity="0.3"/>
            </svg>
        </div>
    );
}

export default LogicTestBar;