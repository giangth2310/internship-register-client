import React, { Component } from 'react';
import classes from './Dashboard.css';
import Drawer from '../../components/Navigation/Drawer/Drawer';

class Dashboard extends Component {
    render () {
        return (
            <div className={classes.Dashboard}>
                <Drawer />
                <main className={classes.content}>
                    day la cai Dashboard
                </main>
            </div>
        );
    }
}

export default Dashboard;