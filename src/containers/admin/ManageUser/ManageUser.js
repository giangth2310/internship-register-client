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

class ManageUser extends Component {

    state = {
        selectedTab: 'student', 
    }

    componentWillMount() {
        console.log(this.props);
        if (this.props.match.path === '/dashboard') {
            this.props.history.push('/dashboard/student');
        }
    }

    componentDidMount() {
        this.props.onLoadTabInfo(this.state.selectedTab); 
        const userType = this.props.match.params.userType;
        console.log(userType);
        this.setState({selectedTab: userType});  
    }

    onTabChangeHandler = (event, value) => {
        this.props.onLoadTabInfo(value);
        this.setState({
            selectedTab: value
        });
    }

    render () {
        return (
            <Fragment>
                <Paper className={classes.Tabbar}>
                    <Tabs 
                        value={this.state.selectedTab} 
                        onChange={this.onTabChangeHandler} >
                        <Tab value='student' label='Sinh viên' />
                        <Tab value='lecturer' label='Giảng viên' />
                        <Tab value='partner' label='Đối tác' />
                        <Tab value='admin' label='Quản trị viên' />
                    </Tabs>
                    <Button color='primary' variant='raised' >
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
        error: state.admin.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLoadTabInfo: (userType) => dispatch(actions.loadAllInfo(userType)),
        onCloseErrorDialog: () => dispatch(actions.adminKnowError())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageUser);