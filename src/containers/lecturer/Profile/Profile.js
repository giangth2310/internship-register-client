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
        avatar: DefaultAvatar
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
        this.props.onUpdate(profile);
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
                                    onChange={this.onInputChangeHandler} />
                                <TextField
                                    id='newPassword'
                                    label='Mật khẩu mới'
                                    value={this.state.password}
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
                                    className={classes.marginTop} >Thay đổi</Button>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs>
                        <div className={classes.avatarForm}>
                            <img src={this.state.avatar} className={classes.avatar} alt='avatar' />
                            <Button color='primary' >Thay đổi ảnh đại diện</Button>
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
            </div>
        );
    }
}

export default Profile;