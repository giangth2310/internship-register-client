import React, { Component } from 'react';

import { Paper, TextField } from 'material-ui';
import classes from './Profile.css';

class Profile extends Component {

    state = {}
    
    componentWillMount() {
        this.setState({
            ...this.props.user
        })
    }

    render () {
        const { user } = this.props
        return (
            <Paper className={classes.Profile} >
                <form>
                    <TextField
                        id='name'
                        label='Họ và tên'
                        value={this.state.name || ''} />
                    <TextField
                        id='mssv'
                        label='Mã sinh viên'
                        value={this.state.mssv || ''} />
                    <TextField
                        id='class'
                        label='Lớp'
                        value={this.state.class || ''} />
                    <TextField
                        id='khoa'
                        label='Khóa'
                        value={this.state.khoa || ''} />
                    <TextField
                        id='nganh'
                        label='Ngành'
                        value={this.state.nganh || ''} />
                    <TextField
                        id='diachi'
                        label='Địa chỉ'
                        value={this.state.diachi || ''} />
                    <TextField
                        id='ngaysinh'
                        label='Ngày sinh'
                        value={this.state.ngaysinh || ''} />
                    <TextField
                        id='vnumail'
                        label='VNU Mail'
                        value={this.state.vnumail || ''} />
                    <TextField
                        id='GPA'
                        label='GPA'
                        value={this.state.GPA || ''} />
                    <TextField
                        id='namtotnghiep'
                        label='Năm tốt nghiệp'
                        value={this.state.namtotnghiep || ''} />
                    <TextField
                        id='email'
                        label='Email'
                        value={this.state.email || ''} />
                    <TextField
                        id='skypeID'
                        label='Skype ID'
                        value={this.state.skypeID || ''} />
                    <TextField
                        id='facebook'
                        label='Facebook'
                        value={this.state.facebook || ''} />
                    <TextField
                        id='phone'
                        label='Số điện thoại'
                        value={this.state.phone || ''} />
                    <TextField
                        id='vitri'
                        label='Vị trí cán bộ'
                        value={this.state.vitri || ''} />
                    <TextField
                        id='kynang'
                        label='Kỹ năng'
                        value={this.state.kynang || ''} />
                    <TextField
                        id='chungchi'
                        label='Chứng chỉ'
                        value={this.state.chungchi || ''} />
                    <TextField
                        id='kinhnghiem'
                        label='Kinh nghiệm'
                        value={this.state.kinhnghiem || ''} />
                    <TextField
                        id='sothich'
                        label='Sở thích'
                        value={this.state.sothich || ''} />
                    <TextField
                        id='dinhhuong'
                        label='Định hướng'
                        value={this.state.dinhhuong || ''} />
                    <TextField
                        id='ghichu'
                        label='Ghi chú'
                        value={this.state.ghichu || ''} />
                </form>
            </Paper>
        );
    }
}

export default Profile;