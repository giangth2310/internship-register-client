import React, { Component, Fragment } from 'react';
import { Tabs, Paper, Tab } from 'material-ui';
import Register from './Register/Register';

class Internship extends Component {
    state = {
        selectedTab: 'register'
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
                        <Tab label='Trạng thái ứng tuyển' value='status' />
                        <Tab label='Đăng ký thực tập' value='register' />
                    </Tabs>
                </Paper>
                {this.state.selectedTab === 'register' && <Register /> }
            </Fragment>            
        );
    }
}

export default Internship;