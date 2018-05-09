import React, { Component } from 'react';
import classes from './Dashboard.css';
import Sidebar from '../Sidebar/Sidebar';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import { Dialog } from 'material-ui';
import { DialogContent } from 'material-ui';
import { DialogActions } from 'material-ui';
import { DialogContentText } from 'material-ui';
import { DialogTitle } from 'material-ui';
import { Button } from 'material-ui';
 
class Dashboard extends Component {
    render () {
        return (
            <div className={classes.Dashboard}>
                <Sidebar />
                <main className={classes.content}>
                    day la cai Dashboard
                </main>
                <Dialog 
                    open={this.props.isTokenExpired}
                    onClose={this.props.onTokenExpired} >
                    <DialogTitle>
                        Phiên làm việc hết hạn
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Mời bạn đăng nhập lại để tiếp tục sử dụng
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button color='primary' onClick={this.props.onTokenExpired}>
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isTokenExpired: state.signin.isTokenExpired
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTokenExpired: () => dispatch(actions.signout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);