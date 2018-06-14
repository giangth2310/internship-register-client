import React, { Component } from 'react';
import { Dialog, DialogActions, DialogContent, Button, Typography } from 'material-ui';
import { DialogTitle } from 'material-ui';

class ProfileDiaglog extends Component {
    render () {
        return (
            <Dialog 
                open={this.props.open}
                onClose={this.props.onClose} >
                <DialogTitle>
                    Thông tin
                </DialogTitle>
                <DialogContent style={{display: 'flex'}} >
                    <Typography variant="body2">
                        <div>Họ và tên:</div>
                        <div>Mã sinh viên:</div>
                        <div>Lớp:</div>
                        <div>GPA:</div>
                        <div>Địa chỉ:</div>
                        <div>Email:</div>
                        <div>Số điện thoại:</div>
                        <div>Facebook:</div>
                        <div>Skype ID:</div>
                    </Typography>
                    <Typography variant="body2" style={{marginLeft: '10px'}} >
                        <div>{this.props.name}</div>
                        <div>{this.props.mssv}</div>
                        <div>{this.props.class}</div>
                        <div>{this.props.GPA}</div>
                        <div>{this.props.diachi}</div>
                        <div>{this.props.email}</div>
                        <div>{this.props.phone}</div>
                        <div>{this.props.facebook}</div>
                        <div>{this.props.skypeID}</div>
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.onClose}>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default ProfileDiaglog;