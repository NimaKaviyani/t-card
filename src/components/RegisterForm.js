import React, {Component} from 'react';
import {Button, Col, Form} from 'react-bootstrap';
import moment from 'moment-jalaali';
import {DatePicker} from 'jalali-react-datepicker';
import Loader from 'react-loader-spinner';
import {Redirect} from 'react-router-dom';
import {SignUpSchema} from '../constants/validationSchemas';
import {popupAlert} from '../utils/utils';
import Countdown from 'react-countdown';

class RegisterForm extends Component {
    state = {
        fields: {
            fullName: '',
            nationalCode: '',
            mobile: '',
            email: '',
            birthDate: moment(),
            gender: '',
            state: '',
            city: '',
            postalCode: '',
            address: '',
            validateCode: '',
        },
        errors: {},
        codeSent: false,
        counterTime: Date.now(),
        isLoading: false,
        success: false,
    };

    countRef = React.createRef();

    handleChange = (e) => {
        let {...fields} = this.state.fields,
            target = e.target;
        fields[target.name] = target.value;
        this.setState({
            fields,
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.handleValidation((values) => {
            if (this.state.codeSent) {
                this.handleRequest();
            } else {
                this.handleRequestCode(() => {
                    console.log('values: ', values);
                });
            }
        });
    };

    handleValidation = (callback) => {
        SignUpSchema.validate(this.state.fields, {abortEarly: false}).then(response => {
            callback(response);
        }).catch(error => {
            let errors = {};
            error.inner.forEach((item, index, array) => {
                errors[item.path] = item.message;
                if (index + 1 === array.length) {
                    this.setState({
                        errors,
                    });
                }
            });
        });
    };

    handleRequestCode = (callback) => {
        this.setState({isLoading: true});
        setTimeout(() => {
            popupAlert(422, 'کد تایید ارسال شد.', 'success');
            this.setState({
                codeSent: true,
                isLoading: false,
                counterTime: Date.now() + 10000,
            }, () => {
                this.countRef.current.start();
                if (callback) {
                    callback(true);
                }
            });
        }, 1500);
    };

    handleRequest = () => {
        this.setState({isLoading: true});
        setTimeout(() => {
            if (this.state.fields.validateCode === '1234') {
                popupAlert(422, 'عضویت با موفقیت انجام شد.', 'success');
                this.setState({
                    isLoading: false,
                    success: true,
                });
            } else {
                popupAlert(422, 'کد فعال سازی اشتباه است!', 'danger');
                this.setState({
                    isLoading: false,
                });
            }
        }, 1500);
    };

    render() {
        const {
            fields, errors, codeSent,
            counterTime, success, isLoading,
        } = this.state;
        const renderer = ({/*hours, */minutes, seconds, completed}) => {
            if (completed) {
                // Render a completed state
                return <Button
                    variant="link"
                    className="small"
                    onClick={() => this.handleRequestCode()}
                >ارسال مجدد</Button>;
            } else {
                // Render a countdown
                return <small>درخواست مجدد کد تایید تا {minutes}:{seconds} دیگر.</small>;
            }
        };
        if (success) {
            return <Redirect to="/" />;
        }
        return (
            <Form
                className="auth-form"
                onSubmit={this.handleSubmit}
            >
                <Loader
                    className={['loading', isLoading ? 'active' : null].join(' ')}
                    type="ThreeDots"
                    color="#6d48e5"
                    height={50}
                    width={50}
                />
                <div className={['before-code', codeSent ? null : 'active'].join(' ')}>
                    <Form.Row>
                        <Form.Group
                            as={Col}
                            md={6}
                            controlId="fullName"
                        >
                            <Form.Label>نام و نام خانوادگی</Form.Label>
                            <Form.Control
                                name="fullName"
                                placeholder="نام و نام خانوادگی خود را وارد نمایید."
                                value={fields.fullName}
                                onChange={this.handleChange}
                            />
                            {errors.fullName && <Form.Text className="text-danger mt-0">
                                {errors.fullName}
                            </Form.Text>}
                        </Form.Group>
                        <Form.Group
                            as={Col}
                            md={6}
                            controlId="nationalCode"
                        >
                            <Form.Label>کد ملی</Form.Label>
                            <Form.Control
                                name="nationalCode"
                                placeholder="کد ملی خود را وارد نمایید."
                                value={fields.nationalCode}
                                onChange={this.handleChange}
                                className="ltr"
                            />
                            {errors.nationalCode && <Form.Text className="text-danger mt-0">
                                {errors.nationalCode}
                            </Form.Text>}
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group
                            as={Col}
                            md={6}
                            controlId="mobile"
                        >
                            <Form.Label>شماره همراه</Form.Label>
                            <Form.Control
                                name="mobile"
                                placeholder="شماره همراه خود را وارد نمایید."
                                value={fields.mobile}
                                onChange={this.handleChange}
                                className="ltr"
                            />
                            {errors.mobile && <Form.Text className="text-danger mt-0">
                                {errors.mobile}
                            </Form.Text>}
                        </Form.Group>
                        <Form.Group
                            as={Col}
                            md={6}
                            controlId="email"
                        >
                            <Form.Label>آدرس ایمیل</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                placeholder="آدرس ایمیل خود را وارد نمایید."
                                value={fields.email}
                                onChange={this.handleChange}
                                className="ltr"
                            />
                            {errors.email && <Form.Text className="text-danger mt-0">
                                {errors.email}
                            </Form.Text>}
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group
                            as={Col}
                            md={6}
                            controlId="birthDate"
                        >
                            <DatePicker
                                isGregorian={false}
                                timePicker={false}
                                value={fields.birthDate}
                                label="تاریخ تولد"
                                placeholder="تاریخ تولد شما"
                                onClickSubmitButton={date => {
                                    let {...newFields} = this.state.fields;
                                    newFields.birthDate = date.value;
                                    this.setState({fields: newFields});
                                }}
                                className="form-control ltr"
                            />
                            {errors.birthDate && <Form.Text className="text-danger mt-0">
                                {errors.birthDate}
                            </Form.Text>}
                        </Form.Group>
                        <Form.Group
                            as={Col}
                            md={6}
                            controlId="gender"
                        >
                            <Form.Label>جنسیت</Form.Label>
                            <Form.Control
                                name="gender"
                                as="select"
                                value={fields.gender}
                                onChange={this.handleChange}
                            >
                                <option
                                    disabled
                                    value=""
                                >انتخاب کنید
                                </option>
                                <option value="male">مرد</option>
                                <option value="female">زن</option>
                            </Form.Control>
                            {errors.gender && <Form.Text className="text-danger mt-0">
                                {errors.gender}
                            </Form.Text>}
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group
                            as={Col}
                            md={4}
                            controlId="state"
                        >
                            <Form.Label>استان</Form.Label>
                            <Form.Control
                                name="state"
                                placeholder="استان محل سکونت"
                                value={fields.state}
                                onChange={this.handleChange}
                            />
                            {errors.state && <Form.Text className="text-danger mt-0">
                                {errors.state}
                            </Form.Text>}
                        </Form.Group>
                        <Form.Group
                            as={Col}
                            md={4}
                            controlId="city"
                        >
                            <Form.Label>شهر</Form.Label>
                            <Form.Control
                                name="city"
                                placeholder="شهر محل سکونت"
                                value={fields.city}
                                onChange={this.handleChange}
                            />
                            {errors.city && <Form.Text className="text-danger mt-0">
                                {errors.city}
                            </Form.Text>}
                        </Form.Group>
                        <Form.Group
                            as={Col}
                            md={4}
                            controlId="postalCode"
                        >
                            <Form.Label>کد پستی</Form.Label>
                            <Form.Control
                                name="postalCode"
                                placeholder="کدپستی ۱۰ رقمی"
                                value={fields.postalCode}
                                onChange={this.handleChange}
                                className="ltr"
                            />
                            {errors.postalCode && <Form.Text className="text-danger mt-0">
                                {errors.postalCode}
                            </Form.Text>}
                        </Form.Group>
                    </Form.Row>
                    <Form.Group controlId="address">
                        <Form.Label>آدرس</Form.Label>
                        <Form.Control
                            name="address"
                            placeholder="ناحیه، محله، خیابان، کوچه، پلاک، طبقه، واحد..."
                            value={fields.address}
                            onChange={this.handleChange}
                        />
                        {errors.address && <Form.Text className="text-danger mt-0">
                            {errors.address}
                        </Form.Text>}
                    </Form.Group>
                </div>
                <div className={['after-code', codeSent ? 'active' : null].join(' ')}>
                    <p className="text-success text-center">کد فعالسازی به شماره همراه شما ارسال شد</p>
                    <div className="text-center">
                        <Countdown
                            autoStart={false}
                            ref={this.countRef}
                            date={counterTime}
                            renderer={renderer}
                        />
                    </div>
                    <Form.Group controlId="validateCode">
                        <Form.Label>کد فعالسازی</Form.Label>
                        <Form.Control
                            name="validateCode"
                            placeholder="1234"
                            value={fields.validateCode}
                            onChange={this.handleChange}
                            className="ltr"
                        />
                        {errors.validateCode && <Form.Text className="text-danger mt-0">
                            {errors.validateCode}
                        </Form.Text>}
                        <Form.Text className="text-muted">
                            کد صحیح برای عضویت "1234" می باشد.
                        </Form.Text>
                    </Form.Group>
                </div>
                <Button
                    onClick={this.handleSubmit}
                    className="mt-4"
                    variant={codeSent ? 'primary' : 'info'}
                    block
                    type="submit"
                >
                    {codeSent ? 'عضویت' : 'ارسال کد فعالسازی'}
                </Button>
            </Form>
        );
    }
}

export default RegisterForm;
