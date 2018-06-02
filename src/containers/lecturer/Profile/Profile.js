import React, { Component } from 'react';

import { TextField, Card, CardContent, Button, Grid } from 'material-ui';
import DefaultAvatar from '../../../assets/images/default-avatar.png';
import Axios from 'axios';
import classes from '../../../shared/Profile.css';
import DialogMessage from '../../../components/DialogMessage/DialogMessage';

class Profile extends Component {

    state = {
        password: '',
        newPassword: '',
        validateNewPassword: '',
        avatar: DefaultAvatar,
        error: null,
        changePasswordSuccess: false
    }
    
    componentWillMount() {
        this.setState({
            ...this.props.user
        });
    }

    componentDidMount() {
        Axios.get('/user/profile/avatar?id=' + this.state.id)
            .then(response => {
                this.setState({
                    avatar: response.data.avatar || DefaultAvatar
                })
            })
            .catch(error => {
                console.log(error);
            })
    }

    onInputChangeHandler = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    onUpdateProfileHandler = () => {
        const profile = {
            ...this.state
        }
        delete profile.avatar;
        delete profile.password;
        delete profile.newPassword;
        delete profile.validateNewPassword;
        delete profile.changePasswordSuccess;
        delete profile.error;
        this.props.onUpdate(profile);
    }

    onChangePasswordHandler = () => {
        const passwordFormData = {
            password: this.state.password,
            newPassword: this.state.newPassword,
            validateNewPassword: this.state.validateNewPassword
        }
        Axios.put('/user/changePassword/' + this.state.id, passwordFormData)
            .then(response => {
                if (response.data.success) {
                    this.setState({
                        changePasswordSuccess: true,
                        error: null
                    })
                } else {
                    this.setState({
                        changePasswordSuccess: false,
                        error: response.data.error
                    })
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    onClosePasswordDialog = () => {
        this.setState({
            changePasswordSuccess: false,
            error: null
        })
    }

    onFileSelectedHandler = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile === undefined) return;        
        const formData = new FormData();
        formData.append('avatarImg', selectedFile, selectedFile.name);
        Axios.put('/user/profile/' + this.state.id + '/avatar', formData)
            .then(response => {
                if (response.data.success) {
                    this.setState({
                        avatar: response.data.avatar
                    });
                    if (!this.props.admin) {
                        this.props.updateAvatar();
                    }
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    render () {
        return (
            <div className={classes.Profile}>
                <Grid container spacing={40}>
                    <Grid item xs>
                        <Card>
                            <CardContent>
                                <TextField
                                    id='password'
                                    label='Mật khẩu'
                                    value={this.state.password}
                                    fullWidth
                                    className={classes.marginTop}
                                    onChange={this.onInputChangeHandler}
                                    disabled={this.props.admin} />
                                <TextField
                                    id='newPassword'
                                    label='Mật khẩu mới'
                                    value={this.state.newPassword}
                                    fullWidth
                                    className={classes.marginTop}
                                    onChange={this.onInputChangeHandler} />
                                <TextField
                                    id='validateNewPassword'
                                    label='Nhập lại mật khẩu mới'
                                    fullWidth
                                    className={classes.marginTop}                                    
                                    value={this.state.validateNewPassword}
                                    onChange={this.onInputChangeHandler} />
                                <Button 
                                    variant='raised' 
                                    color='primary'
                                    className={classes.marginTop}
                                    onClick={this.onChangePasswordHandler} >Thay đổi</Button>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs>
                        <div className={classes.avatarForm}>
                            <div className={classes.avatarContainer}>
                                <img src={this.state.avatar} className={classes.avatar} alt='avatar' />
                            </div>
                            <input 
                                style={{display: 'none'}} 
                                type='file' 
                                onChange={this.onFileSelectedHandler}
                                ref={fileInput => this.fileInput = fileInput} />
                            <Button color='primary' onClick={() => this.fileInput.click()} >Thay đổi ảnh đại diện</Button>
                        </div>
                    </Grid>
                </Grid>
                <Grid container spacing={40}>
                    <Grid item xs>
                        <Card>
                            <CardContent>
                                <TextField
                                    id='name'
                                    label='Họ và tên'
                                    value={this.state.name || ''}
                                    fullWidth
                                    className={classes.marginTop}
                                    onChange={this.onInputChangeHandler} />
                                <TextField
                                    id='vnumail'
                                    label='VNU Mail'
                                    value={this.state.vnumail || ''}
                                    fullWidth
                                    className={classes.marginTop}
                                    onChange={this.onInputChangeHandler} />
                                <TextField
                                    id='mail'
                                    label='Email'
                                    value={this.state.mail || ''}
                                    fullWidth
                                    className={classes.marginTop}
                                    onChange={this.onInputChangeHandler} />
                                 <TextField
                                    id='phone'
                                    label='Số điện thoại'
                                    value={this.state.phone || ''}
                                    fullWidth
                                    className={classes.marginTop}
                                    onChange={this.onInputChangeHandler} />
                                <TextField
                                    id='ghichu'
                                    label='Ghi chú'
                                    value={this.state.ghichu || ''}
                                    fullWidth
                                    multiline
                                    className={classes.marginTop}
                                    onChange={this.onInputChangeHandler} />
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
                <Grid container spacing={40} >
                    <Grid item xs={9}>
                    </Grid>
                    <Grid item xs>
                        <Button variant='raised' onClick={this.props.onCancel} >Quay lại</Button>
                    </Grid>
                    <Grid item xs>
                        <Button color='primary' variant='raised' onClick={this.onUpdateProfileHandler} >Cập nhật</Button>
                    </Grid>
                </Grid>
                <DialogMessage 
                    open={this.props.error ? true : false} 
                    onClose={this.props.onCloseErrorDialog}
                    title='Có lỗi xảy ra :('
                    content={this.props.error} />
                <DialogMessage 
                    open={this.props.success} 
                    onClose={this.props.onCloseSuccessDialog}
                    title='Cập nhật thành công' />
                 <DialogMessage 
                    open={this.state.error ? true : false} 
                    onClose={this.onClosePasswordDialog}
                    title='Có lỗi xảy ra :('
                    content={this.state.error} />
                <DialogMessage 
                    open={this.state.changePasswordSuccess} 
                    onClose={this.onClosePasswordDialog}
                    title='Cập nhật mật khẩu thành công' />
            </div>
        );
    }
}

export default Profile;