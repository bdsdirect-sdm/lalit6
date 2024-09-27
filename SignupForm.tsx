import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface SignupFormValues {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const SignupForm: React.FC = () => {
    const initialValues: SignupFormValues = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    };

    const validationSchema = Yup.object({
        firstName: Yup.string().required('First Name is required'),
        lastName: Yup.string().required('Last Name is required'),
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        password: Yup.string()
            .min(8, 'Password must be at least 8 characters long')
            .required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password')], 'Passwords must match')
            .required('Confirm Password is required'),
    });

    const handleSubmit = async (values: SignupFormValues) => {
        const url = "http://localhost:3000";
        try {
            console.log(values);
            const response = await axios.post(`${url}/api/v1/user/register`, JSON.stringify(values), {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.status === 201) {
                alert('Signup successful!');
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
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            <Form>
                <div>
                    <label htmlFor="firstName">First Name</label>
                    <Field type="text" id="firstName" name="firstName" />
                    <ErrorMessage name="firstName" component="div" />
                </div>
                <div>
                    <label htmlFor="lastName">Last Name</label>
                    <Field type="text" id="lastName" name="lastName" />
                    <ErrorMessage name="lastName" component="div" />
                </div>
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
                <div>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <Field type="password" id="confirmPassword" name="confirmPassword" />
                    <ErrorMessage name="confirmPassword" component="div" />
                </div>
                <button type="submit">Submit</button>
                <Link to="/login">Login</Link>
            </Form>
        </Formik>
    );
};

export default SignupForm;
