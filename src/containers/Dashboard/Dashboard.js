import React, { Component } from 'react';
import classes from './Dashboard.css';
import Sidebar from '../Sidebar/Sidebar';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import { Route, Switch } from 'react-router-dom';
import ManageUser from '../admin/ManageUser/ManageUser';
import PageNotFound from '../../components/PageNotFound/PageNotFound'; 
import DialogMessage from '../../components/DialogMessage/DialogMessage';
import EditProfile from '../admin/ManageUser/EditProfile/EditProfile';
import UpdateProfile from '../UpdateProfile/UpdateProfile';

class Dashboard extends Component {
    render () {

        let routes = null;

        switch (localStorage.getItem('userType')) {
            case 'admin':
                routes = (
                    <Switch>
                        <Route path='/profile' component={UpdateProfile} />
                        <Route path='/dashboard/edit/:userType/:id' component={EditProfile} />
                        <Route path='/dashboard' component={ManageUser} />
                        <Route component={PageNotFound} />
                    </Switch>
                );
                break;
            case 'student':
                routes = (
                    <Switch>
                        <Route path='/profile' component={UpdateProfile} />
                        <Route component={PageNotFound} />
                    </Switch>
                );
                break;
            case 'lecturer':
                routes = (
                    <Switch>
                        <Route path='/profile' component={UpdateProfile} />
                        <Route component={PageNotFound} />
                    </Switch>
                );
                break;
            case 'partner':
                routes = (
                    <Switch>
                        <Route path='/profile' component={UpdateProfile} />
                        <Route component={PageNotFound} />
                    </Switch>
                );
                break;
            default:
                routes = null;
        }

        return (
            <div className={classes.Dashboard}>
                <Sidebar />
                <main className={classes.content}>
                    {routes}
                </main>
                <DialogMessage 
                    open={this.props.isTokenExpired}
                    onClose={this.props.onTokenExpired}
                    title='Phiên làm việc hết hạn'
                    content='Mời bạn đăng nhập lại để tiếp tục sử dụng' />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isTokenExpired: state.signin.isTokenExpired,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTokenExpired: () => dispatch(actions.signout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);