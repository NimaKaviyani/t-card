/* Packages */
import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {CookiesProvider} from 'react-cookie';
import {ToastContainer} from 'react-toastify';
import Login from './containers/Login';
import Profile from './containers/Profile';
import NoMatch from './containers/NoMatch';
import Register from './containers/Register';

class App extends Component {
    render() {
        let loading = 'has-user';
        document.body.classList.add(loading);
        return (
            <CookiesProvider>
                <ToastContainer rtl={true} />
                <Router>
                    <Switch>
                        <Route
                            exact
                            path={'/'}
                            component={Login}
                            key={1}
                        />
                        <Route
                            path={'/register'}
                            component={Register}
                            key={2}
                        />
                        <Route
                            path={'/profile'}
                            component={Profile}
                            key={3}
                        />
                        <Route
                            component={NoMatch}
                            key={4}
                        />
                    </Switch>
                </Router>
            </CookiesProvider>
        );
    }
}

export default App;
