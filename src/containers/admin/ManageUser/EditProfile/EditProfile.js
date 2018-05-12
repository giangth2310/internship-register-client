import React, { Component } from 'react';
import { connect } from 'react-redux';
import StudentProfile from '../../../student/Profile/Profile';

class EditProfile extends Component {
    render () {
        const { userType } = this.props.match.params;
        let editProfileForm = null;
        switch (userType) {
            case 'student':
                editProfileForm = (<StudentProfile user={this.props.user} />);
                break;
        }
        return editProfileForm;
    }
}

const mapStateToProps = state => {
    return {
        user: state.admin.editingProfile
    }
}

export default connect(mapStateToProps)(EditProfile);