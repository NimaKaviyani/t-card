import React, {useState} from 'react';
import {Button, Form} from 'react-bootstrap';
import Loader from 'react-loader-spinner';
import {Redirect} from 'react-router-dom';
import {SignInSchema} from '../constants/validationSchemas';
import {popupAlert} from '../utils/utils';
import {Cookies} from 'react-cookie';

const cookies = new Cookies();

function LoginForm() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errors, setErrors] = useState({});
    const [fields, setFields] = useState({
        mobile: '',
        password: '',
    });

    const handleChange = (e) => {
        let {...newFields} = fields,
            target = e.target;
        newFields[target.name] = target.value;
        setFields(newFields);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleValidation((values) => {
            handleRequest(values);
        });
    };

    const handleValidation = (callback) => {
        SignInSchema.validate(fields, {abortEarly: false}).then(response => {
            callback(response);
        }).catch(error => {
            let errors = {};
            error.inner.forEach((item, index, array) => {
                errors[item.path] = item.message;
                if (index + 1 === array.length) {
                    setErrors(errors);
                }
            });
        });
    };

    const handleRequest = (values) => {
        setLoading(true);
        setTimeout(() => {
            if (fields.mobile === '09125477664' && fields.password === '12345678') {
                popupAlert(200, 'ورود با موفقیت!', 'success');
                cookies.set('uid', 'asdfasdfadfadfadsfad');
                console.log('values: ', values);
                setTimeout(() => {setSuccess(true);}, 10);
            } else {
                popupAlert(422, 'اطلاعات وارد شده اشتباه می باشد.', 'danger');
            }
            setLoading(false);
        }, 1500);
    };

    if (success) {
        return <Redirect to="/profile" />;
    }
    return (
        <Form
            className="auth-form"
            onSubmit={(e) => handleSubmit(e)}
        >
            <Loader
                className={['loading', loading ? 'active' : null].join(' ')}
                type="ThreeDots"
                color="#6d48e5"
                height={50}
                width={50}
            />
            <Form.Group controlId="mobile">
                <Form.Label>شماره همراه</Form.Label>
                <Form.Control
                    name="mobile"
                    placeholder="شماره همراه خود را وارد نمایید."
                    value={fields.mobile}
                    onChange={handleChange}
                    className="ltr"
                />
                {errors.mobile && <Form.Text className="text-danger mt-0">
                    {errors.mobile}
                </Form.Text>}
            </Form.Group>
            <Form.Group controlId="password">
                <Form.Label>کلمه عبور</Form.Label>
                <Form.Control
                    type="password"
                    name="password"
                    value={fields.password}
                    onChange={handleChange}
                    className="ltr"
                    placeholder="کلمه عبور خود را وارد نمایید."
                />
                {errors.password && <Form.Text className="text-danger mt-0">
                    {errors.password}
                </Form.Text>}
            </Form.Group>
            <Button
                variant="primary"
                block
                type="submit"
                onClick={(e) => handleSubmit(e)}
            >ورود</Button>
            <Form.Text className="text-muted text-center">
                نام کاربری صحیح "09125477664" و کلمه عبور "12345678" می باشد.
            </Form.Text>
        </Form>
    );
}

export default LoginForm;
