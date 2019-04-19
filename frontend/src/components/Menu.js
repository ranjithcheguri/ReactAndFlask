import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import LandingPage from './LandingPage';
class Menu extends Component {
    render() {
        return (
            <div>
                <Route path="/" component={LandingPage}>
                    {/* <Route path="/:device_uuid/:end_time/:window_time/:num_windows" component={LandingPage} /> */}
                </Route>

            </div>
        );
    }
}

export default Menu;