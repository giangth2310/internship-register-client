import React, { Component, Fragment } from 'react';
import { Paper, Tab, Tabs } from 'material-ui';
import CreateForm from './CreateForm/CreateForm';

class ManageInternship extends Component {

    state = {
        selectedTab: 'CreateForm'
    }
    
    render () {
        return (
            <Fragment>
                <Paper>
                    <Tabs value={this.state.selectedTab} >
                        <Tab value='CreateForm' label='Tạo tin thực tập' />
                    </Tabs>
                </Paper>
                {this.state.selectedTab === 'CreateForm' ? <CreateForm /> : null}
            </Fragment>
        );
    }
}

export default ManageInternship;