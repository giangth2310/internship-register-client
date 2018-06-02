// Trang update profile của riêng từng tài khoản
import React, { Component } from 'react';
import Axios from 'axios';
import { CircularProgress } from 'material-ui';
import classes from '../../shared/Profile.css';
import AdminProfile from '../admin/Profile/Profile';
import StudentProfile from '../student/Profile/Profile';
import LecturerProfile from '../lecturer/Profile/Profile';
import PartnerProfile from '../partner/Profile/Profile';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class UpdateProfile extends Component {

    state = {
        error: null,
        user: null,
        updateSuccess: false
    }

    componentDidMount() {
        Axios.get('/user/profile/' + localStorage.getItem('id'))
            .then(response => {
                if (response.data.success) {
                    setTimeout(this.setState({
                        user: response.data.data
                    }), 5000)
                } else {
                    this.setState({
                        error: response.data.error
                    })
                }
            })
            .catch(error => {
                this.setState({
                    error: error
                })
            })
    }

    onUpdate = (profile) => {
        Axios.put('/user/profile/update/' + localStorage.getItem('id'), profile)
            .then(response => {
                console.log(response);
                if (response.data.success) {
                    this.setState({
                        user: profile,
                        updateSuccess: true,
                        error: null
                    })
                } else {
                    this.setState({
                        error: response.data.error,
                        updateSuccess: false
                    })
                }
            })
            .catch(error => {
                this.setState({
                    error: error,
                    updateSuccess: false
                })
            })
    }

    onCancel = () => {
        this.props.history.goBack();
    }

    onCloseErrorDialog = () => {
        this.setState({
            error: null
        })
    }

    onCloseSuccessDialog = () => {
        this.setState({
            updateSuccess: false
        })
    }

    render () {
        let updateProfile = <CircularProgress size={100} className={classes.centerScreen} />;
        if (this.state.user) {
            switch (localStorage.getItem('userType')) {
                case 'student': 
                    updateProfile = <StudentProfile 
                                user={this.state.user} 
                                onUpdate={this.onUpdate}
                                onCancel={this.onCancel}
                                error={this.state.error}
                                onCloseErrorDialog={this.onCloseErrorDialog}
                                success={this.state.updateSuccess}
                                onCloseSuccessDialog={this.onCloseSuccessDialog}
                                updateAvatar={this.props.onUpdateAvatar}  />; 
                    break;
                case 'lecturer': 
                    updateProfile = <LecturerProfile 
                                user={this.state.user} 
                                onUpdate={this.onUpdate}
                                onCancel={this.onCancel}
                                error={this.state.error}
                                onCloseErrorDialog={this.onCloseErrorDialog}
                                success={this.state.updateSuccess}
                                onCloseSuccessDialog={this.onCloseSuccessDialog}
                                updateAvatar={this.props.onUpdateAvatar}  />; 
                    break;
                case 'partner': 
                    updateProfile = <PartnerProfile 
                                user={this.state.user} 
                                onUpdate={this.onUpdate}
                                onCancel={this.onCancel}
                                error={this.state.error}
                                onCloseErrorDialog={this.onCloseErrorDialog}
                                success={this.state.updateSuccess}
                                onCloseSuccessDialog={this.onCloseSuccessDialog}
                                updateAvatar={this.props.onUpdateAvatar}  />; 
                    break;
                case 'admin': 
                    updateProfile = <AdminProfile 
                                user={this.state.user} 
                                onUpdate={this.onUpdate}
                                onCancel={this.onCancel}
                                error={this.state.error}
                                onCloseErrorDialog={this.onCloseErrorDialog}
                                success={this.state.updateSuccess}
                                onCloseSuccessDialog={this.onCloseSuccessDialog}
                                updateAvatar={this.props.onUpdateAvatar} />; 
                    break;
            }
        }
        return updateProfile;
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onUpdateAvatar: () => dispatch(actions.loadAvatar())
    }
}

export default connect(null, mapDispatchToProps)(UpdateProfile);