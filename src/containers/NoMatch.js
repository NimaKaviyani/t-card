import React, {Component} from 'react';
import {Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import PublicLayout from '../layout/PublicLayout';

class NoMatch extends Component {
    render() {
        return (
            <PublicLayout>
                <Col
                    md={8}
                    sm={10}
                >
                    <h1>404</h1>
                    <p>ای وای... ارور ۴۰۴. صفحه ای که به دنبال آن هستید در حال حاضر در دسترس نیست.</p>
                    <Link to='/'>بازگشت به صفحه اصلی</Link>
                </Col>
            </PublicLayout>
        );
    }
}

export default NoMatch;
