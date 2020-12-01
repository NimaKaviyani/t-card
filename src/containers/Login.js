import React, {Component} from 'react';
import {Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import PublicLayout from '../layout/PublicLayout';
import LoginForm from '../components/LoginForm';

class Login extends Component {
    render() {
        return (
            <PublicLayout title="ورود">
                <Col
                    xl={5}
                    lg={6}
                    md={7}
                >
                    <LoginForm />
                    <div className="text-center mt-3">
                        عضو نیستید؟ <Link to="/register">ساخت حساب کاربری!</Link>
                    </div>
                </Col>
            </PublicLayout>
        );
    }
}

export default Login;
