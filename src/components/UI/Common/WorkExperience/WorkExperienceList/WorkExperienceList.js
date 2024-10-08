import WorkExperienceBlock from '../WorkExperienceBlock/WorkExperienceBlock';

function WorkExperienceList({ children, isDark, experience, onRemove, ...props }) {

    return (
        <div {...props}>
            {experience && experience.map((single) => (
                <WorkExperienceBlock
                    key={single.id}
                    id={single.id}
                    isDark={isDark}
                    country={single.country}
                    company={single.company}
                    position={single.position}
                    startDate={single.startDate}
                    endDate={single.endDate}
                    onRemove={onRemove}
                />
            ))}
        </div>
    );
}

export default WorkExperienceList;