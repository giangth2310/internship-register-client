import React, { Component, Fragment } from 'react';
import { Paper, Tab, Tabs } from 'material-ui';
import CreateForm from './CreateForm/CreateForm';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import PostList from './PostList/PostList';

class ManageInternship extends Component {

    state = {
        selectedTab: 'Create'
    }

    onTabChangeHandler = (event, value) => {
        this.setState({
            selectedTab: value
        });
    }
    
    render () {
        return (
            <Fragment>
                <Paper>
                    <Tabs value={this.state.selectedTab} 
                        onChange={this.onTabChangeHandler}
                        indicatorColor='primary'>
                        <Tab value='Create' label='Tạo tin thực tập' />
                        <Tab value='internship' label='Các tin đã đăng' />
                    </Tabs>
                </Paper>
                {this.state.selectedTab === 'Create' ? 
                    <CreateForm 
                        onUpload={this.props.onCreateEmployInfo} 
                        success={this.props.createEmployInfoSuccess}
                        error={this.props.error}
                        onCloseDialog={this.props.onCloseDialog}
                        /> : null}
                {this.state.selectedTab === 'internship' ?
                    <PostList />
                    : null}
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        error: state.partner.error,
        createEmployInfoSuccess: state.partner.createEmployInfoSuccess
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onCreateEmployInfo: (post) => dispatch(actions.createEmployInfo(post)),
        onCloseDialog: () => dispatch(actions.partnerCloseDialog())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageInternship);