import LanguageLevel from '../LanguageLevel/LanguageLevel';

function LanguageLevelList({ children, languages, ...props }) {

    return (
        <div {...props}>
            {languages && languages.map((language, index) => (
                <LanguageLevel
                    key={index}
                    languageCode={language.languageCode}
                    level={language.level}
                    removable={language.removable}
                />
            ))}
        </div>
    );
}

export default LanguageLevelList;