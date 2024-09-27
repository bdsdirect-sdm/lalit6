import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
interface LoginFormValues {
    email: string;
    password: string;
}

const LoginForm: React.FC = () => {
    const navigate = useNavigate();
    const initialValues: LoginFormValues = {
        email: '',
        password: '',
    };

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().required('Password is required'),
    });

    // const handleSubmit = async (values: LoginFormValues) => {
    //     try {
    //         const response = await fetch('/api/login', {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify(values),
    //         });

    //         if (response.ok) {
    //             const token = await response.json();
    //             localStorage.setItem('token', token);
    //             alert('Login successful!');
    //         } else {
    //             alert('Login failed');
    //         }
    //     } catch (error) {
    //         console.error(error);
    //     }

    // };
    const handleSubmit = async (values: LoginFormValues) => {

        const url = "http://localhost:3000";
        try {
            console.log("/login", values);
            const response = await axios.post(`${url}/api/v1/user/login`, values, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.status === 200) {
                alert('login successful!');
                navigate('/profile');
            }
        } catch (error) {
            console.log(error);
            if (axios.isAxiosError(error)) {
                if (error.response && error.response.status === 409) {
                    alert('Email already exists');
                } else {
                    alert('An error occurred during signup');
                }
            } else {
                console.error(error);
            }
        }
    };
    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            <Form>
                <div>
                    <label htmlFor="email">Email</label>
                    <Field type="email" id="email" name="email" />
                    <ErrorMessage name="email" component="div" />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <Field type="password" id="password" name="password" />
                    <ErrorMessage name="password" component="div" />
                </div>
                <button type="submit">Submit</button>
                <Link to="/signup">Sign up</Link>
            </Form>
        </Formik>
    );
};

export default LoginForm;
