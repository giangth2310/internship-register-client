import React, { Component, Fragment } from 'react';
import { Paper, Tab, Tabs } from 'material-ui';
import CreateForm from './CreateForm/CreateForm';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';

class ManageInternship extends Component {

    state = {
        selectedTab: 'Create'
    }
    
    render () {
        return (
            <Fragment>
                <Paper>
                    <Tabs value={this.state.selectedTab} >
                        <Tab value='Create' label='Tạo tin thực tập' />
                    </Tabs>
                </Paper>
                {this.state.selectedTab === 'Create' ? 
                    <CreateForm 
                        onUpload={this.props.onCreateEmployInfo} 
                        success={this.props.createEmployInfoSuccess}
                        error={this.props.error}
                        onCloseDialog={this.props.onCloseDialog}
                        /> : null}
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
        onCreateEmployInfo: (title, content) => dispatch(actions.createEmployInfo(title, content)),
        onCloseDialog: () => dispatch(actions.partnerCloseDialog())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageInternship);