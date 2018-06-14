import React, { Component } from 'react';
import classes from './Dashboard.css';
import Sidebar from '../Sidebar/Sidebar';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import { Route, Switch, Redirect } from 'react-router-dom';
import ManageUser from '../admin/ManageUser/ManageUser';
import DialogMessage from '../../components/DialogMessage/DialogMessage';
import EditProfile from '../admin/ManageUser/EditProfile/EditProfile';
import UpdateProfile from '../UpdateProfile/UpdateProfile';
import ManageInternship from '../partner/ManageInternship/ManageInternship';
import SearchPage from '../student/SearchPage/SearchPage';
import PostDetail from '../student/PostDetail/PostDetail';
import Message from '../Message/Message';
import ManageInternshipTerm from '../admin/ManageInternship/ManageInternship';
import StudentInternship from '../student/Internship/Internship';
import PostEdit from '../partner/ManageInternship/PostEdit/PostEdit';
import Report from '../student/Report/Report';

let checkNewMessage;

class Dashboard extends Component {
    componentDidMount() {
        this.props.fetchNewMessage();
        checkNewMessage = setInterval(this.props.fetchNewMessage, 60000);
    }

    componentWillUnmount() {
        clearInterval(checkNewMessage);
    }

    render () {
        let routes = null;

        switch (localStorage.getItem('userType')) {
            case 'admin':
                routes = (
                    <Switch>
                        <Route path='/profile' component={UpdateProfile} />
                        <Route path='/internship' component={ManageInternshipTerm} />
                        <Route path='/message' component={Message} />
                        <Route path='/dashboard/edit/:userType/:id' component={EditProfile} />
                        <Route path='/dashboard' component={ManageUser} />
                        <Redirect to='/dashboard' />
                    </Switch>
                );
                break;
            case 'student':
                routes = (
                    <Switch>
                        <Route path='/internship-post/:employId' component={PostDetail} />
                        <Route path='/message' component={Message} />
                        <Route path='/report' component={Report} />
                        <Route path='/internship' component={StudentInternship} />
                        <Route path='/dashboard' component={SearchPage} />
                        <Route path='/profile' component={UpdateProfile} />
                        <Redirect to='/dashboard' />
                    </Switch>
                );
                break;
            case 'lecturer':
                routes = (
                    <Switch>
                        <Route path='/message' component={Message} />
                        <Route path='/profile' component={UpdateProfile} />
                        <Redirect to='/dashboard' />
                    </Switch>
                );
                break;
            case 'partner':
                routes = (
                    <Switch>
                        <Route path='/internship-post/:employId' component={PostEdit} />
                        <Route path='/dashboard' component={ManageInternship} />
                        <Route path='/message' component={Message} />
                        <Route path='/profile' component={UpdateProfile} />
                        <Redirect to='/dashboard' />
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
        onTokenExpired: () => dispatch(actions.signout()),
        fetchNewMessage: () => dispatch(actions.fetchNewMessage())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);