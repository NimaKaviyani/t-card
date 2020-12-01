import React, {Component, Fragment} from 'react';
import {Col, Container, Row} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';
import Header from '../components/Header';
import {Cookies} from 'react-cookie';

const cookies = new Cookies();

class AuthLayout extends Component {
    state = {
        isLoaded: false,
        userNotFound: false,
    };

    componentDidMount() {
        let uid = cookies.get('uid');
        console.log('uid: ', uid);
        if (uid) {
            this.setState({
                isLoaded: true,
            });
        } else {
            this.setState({
                isLoaded: true,
                userNotFound: true,
            });
        }
    }

    render() {
        const {children} = this.props;
        const {isLoaded, userNotFound} = this.state;
        if (!isLoaded) {
            return null;
        } else if (isLoaded && userNotFound) {
            return <Redirect to="/" />;
        }
        return (
            <Fragment>
                <Header />
                <Container>
                    <Row className="justify-content-center">
                        <Col xs={12}>
                            {children}
                        </Col>
                        <Col xs={12}>
                            <hr />
                            <p className="text-center">All Rights Reserved!</p>
                        </Col>
                    </Row>
                </Container>
            </Fragment>
        );
    }
}

export default AuthLayout;
