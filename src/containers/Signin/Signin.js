import React, { Component } from 'react';

import Button from 'material-ui/Button';
import classes from './Signin.css';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Logo from '../../assets/images/logo.png';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';

class Signin extends Component {

    state = {
        username: '',
        password: ''
    }

    onInputChangeHandler = (event) => {
        this.setState({
            ...this.state,
            [event.target.id]: event.target.value
        });
    }

    render () {
        return (
            <Grid container className={classes.Signin} justify='center' alignItems='center' >
                <Grid item xs={12} sm={5} lg={4} >
                    <Paper className={classes.Paper}>
                        <Grid container className={classes.header}>
                            <Grid item xs={12} md={3}>
                                <Grid container justify='center' >
                                    <img src={Logo} alt='logo' className={classes.Logo} />
                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={9}>
                                <Typography variant = 'display1'
                                    gutterBottom
                                    align='center' >
                                    Hệ thống <br/> đăng ký thực tập
                                </Typography>
                            </Grid>
                        </Grid>
                        <TextField 
                            fullWidth 
                            id='username'
                            label='Tên đăng nhập'
                            margin='normal'
                            onChange={this.onInputChangeHandler} />
                        <TextField 
                            fullWidth 
                            id='password'
                            label='Mật khẩu' 
                            type='password'
                            margin='normal'
                            onChange={this.onInputChangeHandler} />
                        <Button variant="raised" color="primary" className={classes.Button}>Đăng nhập</Button>
                    </Paper>
                </Grid>
            </Grid>
        );
    }
}

export default Signin;