import React, { Component } from 'react';
import { Paper, TextField, Button, Input, InputLabel } from 'material-ui';
import { Editor } from 'react-draft-wysiwyg';
import {
    EditorState,
    convertToRaw
} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import DialogMessage from '../../../../components/DialogMessage/DialogMessage';
import classes from './CreateForm.css';

class CreateForm extends Component {

    state = {
        title: null,
        editorState: EditorState.createEmpty(),
        expireDate: '2018-01-01'
    }

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        });
    };

    onUploadHandler = () => {
        const { title, editorState, expireDate } = this.state;
        const content = draftToHtml(convertToRaw(editorState.getCurrentContent()));
        this.props.onUpload({
            title: title,
            content: content,
            expireDate: expireDate
        });
    }

    onInputChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    render () {
        return (
            <div className={classes.CreateForm}>
                <TextField 
                    required
                    id='title'
                    label='Tiêu đề'
                    margin='normal'
                    InputProps={{
                        disableUnderline: true,
                        classes: {
                            input: classes.input
                        }
                    }}
                    InputLabelProps={{
                        className: classes.label
                    }}
                    onChange={this.onInputChange}
                    className={classes.Title}
                />
                <InputLabel htmlFor='expireDate' className={classes.label}>Ngày hết hạn: </InputLabel>
                <Input 
                    id='expireDate'
                    value={this.state.expireDate}
                    disableUnderline
                    className={classes.input}
                    type='date' 
                    onChange={this.onInputChange} />
                <Paper>
                    <div className={classes.Editor}>
                        <Editor
                            toolbarClassName = "rdw-storybook-toolbar"
                            editorClassName = "rdw-storybook-editor"
                            wrapperClassName = "rdw-storybook-wrapper"
                            editorState = {this.state.editorState}
                            onEditorStateChange = {this.onEditorStateChange}
                        />
                    </div>
                </Paper>
                <div className={classes.FormFooter}>
                    <Button variant='raised' color='primary' onClick={this.onUploadHandler} >Đăng</Button>
                </div>
                <DialogMessage 
                    open={this.props.error ? true : false} 
                    onClose={this.props.onCloseDialog}
                    title='Có lỗi xảy ra :('
                    content={this.props.error} />
                <DialogMessage 
                    open={this.props.success ? true : false} 
                    onClose={this.props.onCloseDialog}
                    title='Đăng thành công' />
            </div>
        );
    }
}

export default CreateForm;