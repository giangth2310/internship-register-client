import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import Button from 'material-ui/Button';
import classes from './Signin.css';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Logo from '../../assets/images/logo.png';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import { CircularProgress } from 'material-ui/Progress';

import * as actions from '../../store/actions/index';

class Signin extends Component {

    state = {
        username: '',
        password: '',
        usernameTouched: false,
        passwordTouched: false,
        usernameError: false,
        passwordError: false
    }

    onInputChangeHandler = (event) => {
        this.setState({
            [event.target.id]: event.target.value,
            [event.target.id + 'Touched']: true
        });
    }

    onSigninHandler = (event) => {
        event.preventDefault();
        if (this.validateUsername() && this.validatePassword()) {
            this.props.onSignin(this.state.username, this.state.password);
        }
    }

    validateUsername = () => {
        let isValid = false;
        if (this.state.username.trim() !== '') {
            isValid = true;
        }
        this.setState({
            usernameError: !isValid
        });
        return isValid;
    }

    validatePassword = () => {
        let isValid = false;
        if (this.state.password !== '') {
            isValid = true;
        }
        this.setState({
            passwordError: !isValid
        });
        return isValid;
    }

    componentDidUpdate() {
        this.componentDidMount();
    }

    componentDidMount() {
        if (this.props.isSignin) {
            this.props.history.push(this.props.redirectPath);
        }
    }

    render () {
        const form = (
            <form onSubmit={this.onSigninHandler}>
                <TextField 
                    fullWidth 
                    id='username'
                    label='Tên đăng nhập'
                    margin='normal'
                    error={this.state.usernameError}
                    helperText={this.state.usernameError ? 'Bạn chưa nhập Tên đăng nhập' : null}
                    onChange={this.onInputChangeHandler}
                    onBlur={this.validateUsername} />
                <TextField 
                    fullWidth 
                    id='password'
                    label='Mật khẩu' 
                    type='password'
                    margin='normal'
                    error={this.state.passwordError}
                    helperText={this.state.passwordError ? 'Bạn chưa nhập mật khẩu' : null}
                    onBlur={this.validatePassword}
                    onChange={this.onInputChangeHandler} />
                <Button 
                    type='submit'
                    variant='raised'
                    color='primary' 
                    disabled={this.props.loading}
                    className={classes.Button}
                    >{this.props.loading ? <CircularProgress size={20} thickness={7} /> : 'Đăng nhập'}</Button>
            </form>
        );

        const header = (
            <Grid container>
                <Grid item xs={12}>
                    <Grid container justify='center' >
                        <img src={Logo} alt='logo' className={classes.Logo} />
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant = 'display1'
                        gutterBottom
                        align='center' >
                        Hệ thống <br/> đăng ký thực tập
                    </Typography>
                </Grid>
            </Grid>
        );

        let errorMessage = null;

        if (this.props.error) {
            errorMessage = <Typography className={classes.ErrorMessage}>{this.props.error.message}</Typography>
        }

        return (
            <Fragment>
                <div className={classes.Signin}>
                    <Paper className={classes.Paper}>
                        {header}
                        {errorMessage}
                        {form}
                    </Paper>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.signin.loading,
        isSignin: state.signin.token !== null,
        error: state.signin.error,
        redirectPath: state.signin.redirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSignin: (username, password) => dispatch(actions.signin(username, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signin);