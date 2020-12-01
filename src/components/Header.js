import React, {Component} from 'react';
import {Container, Dropdown, Nav, Navbar, NavItem, NavLink} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import avatar from '../assets/img/avatar.png';
import {Cookies} from 'react-cookie';

const cookies = new Cookies();

class Header extends Component {
    handleSignOut = () => {
        cookies.remove('uid');
        setTimeout(() => {
            window.location.href = '/';
        }, 15);
    };

    render() {
        return (
            <Navbar
                collapseOnSelect
                expand="lg"
                bg="primary"
                variant="dark"
                className="mb-5"
            >
                <Container>
                    <Navbar.Brand href="#home">تی‌کارت</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Dropdown as={NavItem}>
                                <Dropdown.Toggle as={NavLink}>
                                    <div className="avatar-wrapper">
                                        <img
                                            src={avatar}
                                            alt="User Avatar"
                                        />
                                        {'نیما کاویانی'}
                                    </div>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Link
                                        className="dropdown-item"
                                        to="#"
                                        onClick={() => {
                                            this.handleSignOut();
                                        }}
                                    >خروج</Link>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    }
}

export default Header;
