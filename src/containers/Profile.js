import React, {Component} from 'react';
import {Alert} from 'react-bootstrap';
import AuthLayout from '../layout/AuthLayout';

class Profile extends Component {
    render() {
        return (
            <AuthLayout>
                <Alert variant="success">
                    <Alert.Heading>به تی‌کارت خوش آمدید</Alert.Heading>
                    <p>
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.
                    </p>
                    <hr />
                    <p className="mb-0">
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.
                    </p>
                </Alert>
            </AuthLayout>
        );
    }
}

export default Profile;
