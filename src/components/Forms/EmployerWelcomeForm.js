import { useFormik } from 'formik';
import * as Yup from 'yup';
// import toast from 'react-hot-toast';
import FormField from '../FormField/FormField';
import FormOptionField from '../FormOptionField/FormOptionField';
import FormSelectField from '../FormSelectField/FormSelectField';
import Button from '../Buttons/Button/Button';

function EmployerWelcomeForm(props) {

    const formik = useFormik({
        initialValues: {
            name: '',
            city: '',
            country: '',
            company_name: '',
            nationality: '',
            employer_status: 'business'
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Required'),
            city: Yup.string().required('Required'),
            company_name: Yup.string().when('employer_status', {
                is: 'business',
                then: schema => schema.required('Required'),
                otherwise: schema => schema.notRequired()
            }),
            nationality: Yup.string().when('employer_status', {
                is: 'individual',
                then: schema => schema.required('Required'),
                otherwise: schema => schema.notRequired()
            }),
        }),
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    const employerStatusOptions = [
        { value: 'business', label: 'Business' },
        { value: 'individual', label: 'Individual' }
    ];

    let conditionalFields = '';

    if (formik.values.employer_status === 'business') {
        conditionalFields = (
            <div>
                <FormField 
                    name="company_name" 
                    type="company_name" 
                    placeholder="Company Name*" 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.company_name}
                    error={formik.touched.company_name && formik.errors.company_name}
                />
            </div>
        );
    }
    else {
        conditionalFields = (
            <div>
                <FormField 
                    name="nationality" 
                    type="nationality" 
                    placeholder="Nationality*" 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.nationality}
                    error={formik.touched.nationality && formik.errors.nationality}
                />
            </div>
        );
    }

    return (
        <form onSubmit={formik.handleSubmit} {...props}>
            <div>
                <FormField 
                    name="name" 
                    type="name" 
                    placeholder="Name*"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                    error={formik.touched.name && formik.errors.name}
                />
            </div>
            <div>
                <FormSelectField
                    name="country" 
                    type="country" 
                    placeholder="Country*" 
                    // onChange={formik.handleChange}
                    value={formik.values.country}
                    error={formik.touched.country && formik.errors.country}
                />
            </div>
            <div>
                <FormField 
                    name="city" 
                    type="city" 
                    placeholder="City*" 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.city}
                    error={formik.touched.city && formik.errors.city}
                />
            </div>
            <div>
                <FormOptionField
                    name="employer_status"
                    label="You are:"
                    type="radio"
                    onChange={formik.handleChange}
                    options={employerStatusOptions}
                    value={formik.values.employer_status}
                />
            </div>
            {conditionalFields}
            <Button type="submit" style={{display: 'block'}}>Proceed</Button>
        </form>
    );
}

export default EmployerWelcomeForm;