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
                {this.state.selectedTab === 'Create' ? <CreateForm onUpload={this.props.onCreateEmployInfo} /> : null}
            </Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onCreateEmployInfo: (title, content) => dispatch(actions.createEmployInfo(title, content))
    }
}

export default connect(null, mapDispatchToProps)(ManageInternship);