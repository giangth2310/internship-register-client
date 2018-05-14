import React, { Component } from 'react';
import { Dialog, TextField, MenuItem } from 'material-ui';
import { DialogTitle } from 'material-ui';
import { DialogContent } from 'material-ui';
import { DialogActions } from 'material-ui';
import { Button } from 'material-ui';
import classes from './CreateUser.css';

const userTypes = [
    {
        label: 'Sinh viên',
        value: 'student'
    },
    {
        label: 'Giảng viên',
        value: 'lecturer'
    },
    {
        label: 'Đối tác',
        value: 'partner'
    },
    {
        label: 'Admin',
        value: 'admin'
    }
]

class CreateUser extends Component {

    state = {
        type: 'student',
        username: '',
        password: ''
    }

    onInputChangeHandler = name => event => {
        this.setState({
            [name]: event.target.value
        });
    }

    onCreateUser = () => {
        this.props.onCreateUser(this.state);
    }

    render () {
        return (
            <Dialog
                open={this.props.open}
                onClose={this.props.onClose} >
                <DialogTitle>
                    Tạo tài khoản
                </DialogTitle>
                <DialogContent>
                    <TextField 
                        select
                        id='type'
                        label='Loại tài khoản'
                        value={this.state.type}
                        onChange={this.onInputChangeHandler('type')}
                        className={classes.Select} >
                        {userTypes.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField 
                        label='Tên tài khoản'
                        id='username'
                        fullWidth
                        value={this.state.username}
                        onChange={this.onInputChangeHandler('username')}
                        className={classes.marginTop} />
                    <TextField 
                        label='Mật khẩu'
                        id='password'
                        fullWidth
                        type='password'
                        value={this.state.password}
                        onChange={this.onInputChangeHandler('password')}
                        className={classes.marginTop} />
                </DialogContent>
                <DialogActions>
                    <Button color='primary' onClick={this.onCreateUser} >Tạo</Button>
                    <Button onClick={this.props.onClose} >Hủy</Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default CreateUser;