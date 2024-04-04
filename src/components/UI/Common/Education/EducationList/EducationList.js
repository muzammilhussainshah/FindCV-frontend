import EducationBlock from '../EducationBlock/EducationBlock';

function EducationList({ children, education, onRemove, ...props }) {

    return (
        <div {...props}>
            {education && education.map((single) => (
                <EducationBlock
                    key={single.id}
                    id={single.id}
                    institution={single.institution}
                    startDate={single.startDate}
                    endDate={single.endDate}
                    onRemove={onRemove}
                />
            ))}
        </div>
    );
}

export default EducationList;