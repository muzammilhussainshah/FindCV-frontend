import EducationBlock from '../EducationBlock/EducationBlock';

function EducationList({ children, isDark, education, onRemove, ...props }) {

    return (
        <div {...props}>
            {education && education.map((single) => (
                <EducationBlock
                    key={single.id}
                    id={single.id}
                    isDark={isDark}
                    institution={single.institution}
                    startDate={single.startDate}
                    endDate={single.endDate}
                    diploma={single.diploma}
                    onRemove={onRemove}
                />
            ))}
        </div>
    );
}

export default EducationList;