import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {
    Tab,
    Tabs,
    Paper
} from 'material-ui';
import * as actions from '../../../store/actions/index';
import DialogMessage from '../../../components/DialogMessage/DialogMessage';
import SearchTable from './SearchTable/SearchTable';
import { Button } from 'material-ui';
import classes from './ManageUser.css';
import CreateUser from './CreateUser/CreateUser';
import { Redirect } from 'react-router-dom';

class ManageUser extends Component {

    state = {
        selectedTab: 'student', 
        showCreateUserForm: false        
    }

    componentDidMount() {
        this.props.onLoadTabInfo(this.state.selectedTab); 
    }

    onTabChangeHandler = (event, value) => {
        this.props.onLoadTabInfo(value);
        this.setState({
            selectedTab: value
        });
    }

    openCreateUserForm = () => {
        this.setState({
            showCreateUserForm: true
        });
    }

    closeCreateUserForm = () => {
        this.setState({
            showCreateUserForm: false
        });
    }

    onCreateUser = (user) => {
        this.props.onCreateUser(user);
    }

    render () {
        return (
            <Fragment>
                {this.props.redirectPath ? <Redirect to={this.props.redirectPath} /> : null}
                <Paper className={classes.Tabbar}>
                    <Tabs 
                        value={this.state.selectedTab} 
                        onChange={this.onTabChangeHandler} >
                        <Tab value='student' label='Sinh viên' />
                        <Tab value='lecturer' label='Giảng viên' />
                        <Tab value='partner' label='Đối tác' />
                        <Tab value='admin' label='Quản trị viên' />
                    </Tabs>
                    <Button color='primary' variant='raised' onClick={this.openCreateUserForm} >
                        Thêm tài khoản
                    </Button>
                </Paper>
                {this.state.selectedTab === 'student' && this.props.student ? 
                    <SearchTable data={this.props.student} userType='student' /> : null}
                {this.state.selectedTab === 'lecturer' && this.props.lecturer ?
                    <SearchTable data={this.props.lecturer} userType='lecturer' /> : null}
                {this.state.selectedTab === 'partner' && this.props.partner ? 
                    <SearchTable data={this.props.partner} userType='partner' /> : null}
                {this.state.selectedTab === 'admin' && this.props.admin ? 
                    <SearchTable data={this.props.admin} userType='admin' /> : null}
                <DialogMessage 
                    open={this.props.error ? true : false} 
                    onClose={this.props.onCloseErrorDialog}
                    title='Có lỗi xảy ra :('
                    content='Không tải được dữ liệu' />
                <CreateUser 
                    open={this.state.showCreateUserForm}
                    onClose={this.closeCreateUserForm}
                    onCreateUser={this.onCreateUser} />
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        student: state.admin.student,
        lecturer: state.admin.lecturer,
        partner: state.admin.partner,
        admin: state.admin.admin,
        error: state.admin.error,
        redirectPath: state.admin.redirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLoadTabInfo: (userType) => dispatch(actions.loadAllInfo(userType)),
        onCloseErrorDialog: () => dispatch(actions.adminKnowError()),
        onCreateUser: (user) => dispatch(actions.createUser(user)),
        onChangeRedirectPath: (path) => dispatch(actions.changeRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageUser);