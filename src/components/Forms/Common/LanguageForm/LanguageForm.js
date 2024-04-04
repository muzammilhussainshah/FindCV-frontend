import { useTranslation } from 'react-i18next';
import FormSelectField from '../../../UI/FormUI/FormSelectField/FormSelectField';
import Button from '../../../UI/Buttons/Button/Button';

function LanguageForm() {

    return (
        <form>
            <div>
                <FormSelectField 
                    name="add_languages" 
                    type="language" 
                    placeholder="Select language"
                    onChange={(e) => console.log(e)}
                />
            </div>
            <Button type="submit">Add</Button>
        </form>
    );
}

export default LanguageForm;