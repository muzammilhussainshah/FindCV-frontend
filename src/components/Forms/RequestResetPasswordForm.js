import { useFormik } from 'formik';
import * as Yup from 'yup';
import FormField from '../FormField/FormField';
import Button from '../Buttons/Button/Button';

function RequestResetPasswordForm(props) {

    const formik = useFormik({
        initialValues: {
            email: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Required')
        }),
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} {...props}>
            <div>
                <FormField 
                    name="email" 
                    type="email" 
                    placeholder="Email" 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    error={formik.touched.email && formik.errors.email}
                />
            </div>
            <Button type="submit">Reset</Button>
        </form>
    );
}

export default RequestResetPasswordForm;