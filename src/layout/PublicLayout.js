import React, {Component} from 'react';
import {Col, Container, Row} from 'react-bootstrap';

class PublicLayout extends Component {
    render() {
        const {title, children} = this.props;

        return (
            <section className="public-layout">
                <Container>
                    <Row className="justify-content-center">
                        {title && <Col
                            xs={12}
                            className="mb-5"
                        >
                            <h1 className="text-center text-primary">{title}</h1>
                        </Col>}
                        {children}
                    </Row>
                </Container>
            </section>
        );
    }
}

export default PublicLayout;
