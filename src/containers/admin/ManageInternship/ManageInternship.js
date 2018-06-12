import React, { Component } from 'react';
import { Paper, Tab, Tabs } from 'material-ui';

class ManageInternship extends Component {
    render () {
        return (
            <Paper>
                <Tabs 
                    value={'internshipTerm'} 
                    indicatorColor='primary' >
                    <Tab value='internshipTerm' label='Kì thực tập' />
                </Tabs>
            </Paper>
        );
    }
}

export default ManageInternship;