import React, { Component } from 'react';

import { create } from "jss";
import JssProvider from "react-jss/lib/JssProvider";
import { createGenerateClassName, jssPreset } from "material-ui/styles";
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';

import Signin from './containers/Signin/Signin';
import Dashboard from './containers/Dashboard/Dashboard';
import Signout from './containers/Signout/Signout';
import * as actions from './store/actions/index';

const generateClassName = createGenerateClassName();
const jss = create(jssPreset());
jss.options.insertionPoint = "insertion-point-jss";

class App extends Component {
  componentDidMount() {
    this.props.setRedirectpath(this.props.location.pathname);
    this.props.onAutoSignIn();
  }

  render() {
    let routes = (
      <Switch>
          <Route path='/signin' component={Signin} />
          <Redirect to='/signin' />
      </Switch>
    );

    if (this.props.isSignin) {
      routes = (
        <Switch>
            <Route path='/signin' component={Signin} />
            <Route path='/signout' component={Signout} />
            <Route path='/' component={Dashboard} />
        </Switch>
      );
    }

    return (
      <JssProvider jss={jss} generateClassName={generateClassName}>
        {routes}
      </JssProvider>
    );
  }
}

const mapStateToProps = state => {
  return {
    isSignin: state.signin.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAutoSignIn: () => dispatch(actions.tryAutoSignIn()),
    setRedirectpath: (path) => dispatch(actions.setRedirectPath(path))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
