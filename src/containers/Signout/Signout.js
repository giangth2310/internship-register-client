import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';

class Signout extends Component {

    componentDidMount() {
        this.props.onSignout();
    }

    render () {
        return <Redirect to='/signin' />;
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSignout: () => dispatch(actions.signout())
    }
}

export default connect(null, mapDispatchToProps)(Signout);