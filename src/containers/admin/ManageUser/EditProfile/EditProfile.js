import React, { Component } from 'react';
import { connect } from 'react-redux';
import StudentProfile from '../../../student/Profile/Profile';
import * as actions from '../../../../store/actions/index';

class EditProfile extends Component {

    onCancel = () => {
        this.props.history.goBack();
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
        onCloseSuccessDialog: () => dispatch(actions.adminKnowSuccess())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);