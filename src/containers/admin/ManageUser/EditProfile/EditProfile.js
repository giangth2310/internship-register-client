import React, { Component } from 'react';
import { connect } from 'react-redux';
import StudentProfile from '../../../student/Profile/Profile';
import LecturerProfile from '../../../lecturer/Profile/Profile';
import PartnerProfile from '../../../partner/Profile/Profile';
import AdminProfile from '../../Profile/Profile';
import * as actions from '../../../../store/actions/index';

class EditProfile extends Component {

    componentDidMount() {
        this.props.onResetRedirectPath();
    }

    onCancel = () => {
        this.props.history.push('/dashboard');
    }

    render () {
        const { userType } = this.props.match.params;
        let editProfileForm = null;
        switch (userType) {
            case 'student':
                editProfileForm = (
                    <StudentProfile 
                        user={this.props.user} 
                        onUpdate={this.props.onUpdate}
                        onCancel={this.onCancel}
                        error={this.props.error}
                        onCloseErrorDialog={this.props.onCloseErrorDialog}
                        success={this.props.updateSuccess}
                        onCloseSuccessDialog={this.props.onCloseSuccessDialog}
                         />
                );
                break;
            case 'lecturer':
                editProfileForm = (
                    <LecturerProfile 
                        user={this.props.user} 
                        onUpdate={this.props.onUpdate}
                        onCancel={this.onCancel}
                        error={this.props.error}
                        onCloseErrorDialog={this.props.onCloseErrorDialog}
                        success={this.props.updateSuccess}
                        onCloseSuccessDialog={this.props.onCloseSuccessDialog}
                         />
                );
                break;
            case 'partner':
                editProfileForm = (
                    <PartnerProfile 
                        user={this.props.user} 
                        onUpdate={this.props.onUpdate}
                        onCancel={this.onCancel}
                        error={this.props.error}
                        onCloseErrorDialog={this.props.onCloseErrorDialog}
                        success={this.props.updateSuccess}
                        onCloseSuccessDialog={this.props.onCloseSuccessDialog}
                         />
                );
                break;
            case 'admin':
                editProfileForm = (
                    <AdminProfile 
                        user={this.props.user} 
                        onUpdate={this.props.onUpdate}
                        onCancel={this.onCancel}
                        error={this.props.error}
                        onCloseErrorDialog={this.props.onCloseErrorDialog}
                        success={this.props.updateSuccess}
                        onCloseSuccessDialog={this.props.onCloseSuccessDialog}
                         />
                );
                break;
            default:
                editProfileForm = null;
        }
        return editProfileForm;
    }
}

const mapStateToProps = state => {
    return {
        user: state.admin.editingProfile,
        error: state.admin.updateProfileError,
        updateSuccess: state.admin.updateProfileSuccess
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onUpdate: (profile) => dispatch(actions.adminUpdateProfile(profile)),
        onCloseErrorDialog: () => dispatch(actions.adminKnowError()),
        onCloseSuccessDialog: () => dispatch(actions.adminKnowSuccess()),
        onResetRedirectPath: () => dispatch(actions.changeRedirectPath(''))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);