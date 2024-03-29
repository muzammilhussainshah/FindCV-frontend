import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserByToken } from '../../app/features/userSlice';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import FormField from '../FormField/FormField';
import FormOptionField from '../FormOptionField/FormOptionField';
import Button from '../Buttons/Button/Button';

import { signup } from '../../services/authService';

function CreateAccountForm(props) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    const [formLoading, setFormLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/welcome');
        }
    }, [navigate, user]);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            password_repeat: '',
            account_type: 'employer'
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string().min(8, 'Must be at least 8 characters').required('Required'),
            password_repeat: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Required')
        }),
        onSubmit: async (values) => {

            if (formLoading) {
                return;
            }

            setFormLoading(true);

            toast.promise(signup(values.email, values.password, values.account_type), {
                loading: 'Creating Account...',
                success: <b>Account created successfully!</b>,
                error: (err) => {
                    return <b>{err.response.data.error}</b>;
                },
            })
            .then((response) => {
                toast.promise(dispatch(fetchUserByToken(response)), {
                    loading: 'Logging in...',
                    success: <b>Successfully logged in</b>,
                    error: (err) => {
                        return <b>{err.response.data.error}</b>;
                    },
                });
            })
            .catch((error) => {
                
                if (error.response.data.field) {
                    formik.setErrors({
                        [error.response.data.field]: error.response.data.error
                    });
                }

                setFormLoading(false);

            });

        },
    });

    const accountTypeOptions = [
        { value: 'employer', label: 'Employer' },
        { value: 'jobseeker', label: 'Job Seeker' }
    ];

    return (
        <form onSubmit={formik.handleSubmit} {...props}>
            <div>
                <FormField 
                    name="email" 
                    type="email" 
                    placeholder="Email*" 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    error={formik.touched.email && formik.errors.email}
                />
            </div>
            <div>
                <FormField 
                    name="password" 
                    type="password" 
                    placeholder="Password*" 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    error={formik.touched.password && formik.errors.password}
                />
            </div>
            <div>
                <FormField 
                    name="password_repeat" 
                    type="password" 
                    placeholder="Repeat Password*" 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password_repeat}
                    error={formik.touched.password_repeat && formik.errors.password_repeat}
                />
            </div>
            <div>
                <FormOptionField
                    name="account_type"
                    label="Account Type*"
                    type="radio"
                    onChange={formik.handleChange}
                    options={accountTypeOptions}
                    value={formik.values.account_type}
                />
            </div>
            <Button type="submit" style={{display: 'block', marginTop: 30}}>
                {formLoading ? 'Please wait...' : 'Proceed'}
            </Button>
        </form>
    );
}

export default CreateAccountForm;