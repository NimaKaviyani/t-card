import React, {Component} from 'react';
import {Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import RegisterForm from '../components/RegisterForm';
import PublicLayout from '../layout/PublicLayout';
// import {popupAlert} from '../utils/utils';

class Register extends Component {

    render() {
        return (
            <PublicLayout title="عضویت">
                <Col
                    xl={7}
                    lg={8}
                    md={10}
                >
                    <RegisterForm />
                    <div className="text-center mt-3">
                        <Link to="/">قبلا عضو شده‌اید؟</Link>
                    </div>
                </Col>
            </PublicLayout>
        );
    }
}

export default Register;
