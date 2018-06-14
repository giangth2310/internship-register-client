import React, { Component, Fragment } from 'react';
import { Paper, Tab, Tabs } from 'material-ui';
import InternShipTerm from './InternshipTerm/InternshipTerm';

class ManageInternship extends Component {

    state = {
        selectedTab: 'student'
    }

    onTabChangeHandler = (event, value) => {
        this.setState({
            selectedTab: value
        });
    }

    onCloseInternshipTerm = () => {
        this.setState({
            selectedTab: 'student'
        })
    }

    render () {
        return (
            <Fragment>
                <Paper>
                    <Tabs 
                        value={this.state.selectedTab} 
                        onChange={this.onTabChangeHandler}
                        indicatorColor='primary' >
                        <Tab value='student' label='Sinh viên' />
                        <Tab value='internshipTerm' label='Kì thực tập' />
                    </Tabs>
                </Paper>
                {this.state.selectedTab === 'internshipTerm' && <InternShipTerm onClose={this.onCloseInternshipTerm} />}
            </Fragment>
        );
    }
}

export default ManageInternship;