import React, { Component } from 'react';
import { Dialog, DialogTitle, DialogContent, Input, Button } from 'material-ui';
import classes from './EditDialog.css';
import { InputLabel } from 'material-ui';
import { DialogActions } from 'material-ui';

class EditDialog extends Component {

    render () {
        return (
            <Dialog open={this.props.open} onClose={this.props.onClose}
                fullWidth >
                <DialogTitle>
                    {this.props.name || 'Tiêu đề'}
                </DialogTitle>
                <DialogContent>
                    <Input
                        multiline
                        disableUnderline
                        fullWidth
                        placeholder='Nội dung'
                        rows={10}
                        rowsMax={10}
                        className={classes.content}
                        value={this.props.content}
                        onChange={this.props.onContentChange} />
                    <br />
                    <br />
                    <InputLabel htmlFor='file'>Sửa báo cáo:</InputLabel>
                    <div style={{display: 'flex'}} >
                        <Input 
                            id='file'
                            type='file' 
                            disableUnderline
                            onChange={this.props.onFileSelectedHandler} />
                        <Button color='primary' onClick={() => window.open(this.props.file, '_blank')} >Tải báo cáo</Button>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button variant='raised' color='primary' onClick={this.props.onUpload} >Sửa</Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default EditDialog;