import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUserByToken } from '../../app/features/userSlice';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import FormField from '../FormField/FormField';
import Button from '../Buttons/Button/Button';

import { login } from '../../services/authService';

function LoginForm(props) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    const [formLoading, setFormLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            
            if (user.registration_process === 'completed') {
                // navigate('/dashboard');
            }
            else {
                navigate('/welcome');
            }

        }
    }, [navigate, user]);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string().required('Required'),
        }),
        onSubmit: values => {
            // alert(JSON.stringify(values, null, 2));

            if (formLoading) {
                return;
            }

            setFormLoading(true);

            toast.promise(login(values.email, values.password), {
                loading: 'Logging in...',
                success: <b>Logged in successfully!</b>,
                error: (err) => {
                    return <b>{err.response.data.error}</b>;
                },
            })
            .then((response) => {
                toast.promise(dispatch(fetchUserByToken(response)), {
                    loading: 'Receiving Data...',
                    success: <b>User Verified</b>,
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
            <div>
                <FormField 
                    name="password" 
                    type="password" 
                    placeholder="Password" 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    error={formik.touched.password && formik.errors.password}
                />
            </div>
            <Button type="submit">
                {formLoading ? 'Processing...' : 'Login'}
            </Button>
        </form>
    );
}

export default LoginForm;