import React, { Component } from 'react';
import { Dialog, DialogTitle, DialogContent, Input, Button } from 'material-ui';
import classes from './CreateDialog.css';
import { InputLabel } from 'material-ui';
import { DialogActions } from 'material-ui';
import { Select } from 'material-ui';

class CreateDialog extends Component {

    state = {
        content: '',
        document: null,
        type: 'weekly'
    }

    onContentChange = (event) => {
        this.setState({
            content: event.target.value
        })
    }

    onFileSelectedHandler = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile === undefined) return;
        this.setState({
            document: selectedFile
        })
    }

    onTypeChange = event => {
        this.setState({
            type: event.target.value
        })
    }

    onClose = () => {
        this.setState({
            content: '',
            document: null,
            type: 'weekly'
        });
        this.props.onClose();
    }

    onCreate = () => {
        this.setState({
            content: '',
            document: null,
            type: 'weekly'
        });
        this.props.onCreate(this.state);
    }

    render () {
        return (
            <Dialog open={this.props.open} onClose={this.onClose}
                fullWidth >
                <DialogTitle>
                    Tạo báo cáo
                </DialogTitle>
                <DialogContent>
                    <InputLabel htmlFor="typeReport" className={classes.label}>
                        Loại báo cáo:{' '}
                    </InputLabel>
                    <Select
                        id='typeReport'
                        value={this.state.type}
                        native
                        onChange={this.onTypeChange}>
                        <option value="weekly">Báo cáo định kỳ</option>
                        <option value="final">Báo cáo toàn văn</option>
                    </Select>
                    <br/>
                    <br/>
                    <Input
                        multiline
                        disableUnderline
                        fullWidth
                        placeholder='Nội dung'
                        rows={10}
                        rowsMax={10}
                        className={classes.content}
                        value={this.state.content}
                        onChange={this.onContentChange} />
                    <br />
                    <br />
                    <InputLabel htmlFor='file'>Tải lên báo cáo:</InputLabel>
                    <div style={{display: 'flex'}} >
                        <Input 
                            id='file'
                            type='file' 
                            disableUnderline
                            onChange={this.onFileSelectedHandler} />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button variant='raised' color='primary' onClick={this.onCreate} >Tạo</Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default CreateDialog;