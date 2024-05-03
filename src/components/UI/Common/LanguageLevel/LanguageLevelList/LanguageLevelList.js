import LanguageLevelBar from '../LanguageLevelBar/LanguageLevelBar';

function LanguageLevelList({ children, isDark, languages, onRemove, ...props }) {

    return (
        <div {...props}>
            {languages && languages.map((language) => (
                <LanguageLevelBar
                    key={language.id}
                    id={language.id}
                    isDark={isDark}
                    languageCode={language.languageCode}
                    level={language.level}
                    onRemove={onRemove}
                />
            ))}
        </div>
    );
}

export default LanguageLevelList;