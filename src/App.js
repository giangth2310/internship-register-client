import React, { Component } from 'react';

import { create } from "jss";
import JssProvider from "react-jss/lib/JssProvider";
import { createGenerateClassName, jssPreset } from "material-ui/styles";

import Signin from './containers/Signin/Signin';

const generateClassName = createGenerateClassName();
const jss = create(jssPreset());
jss.options.insertionPoint = "insertion-point-jss";

class App extends Component {
  render() {
    return (
      <JssProvider jss={jss} generateClassName={generateClassName}>
        <Signin />
      </JssProvider>
    );
  }
}

export default App;
