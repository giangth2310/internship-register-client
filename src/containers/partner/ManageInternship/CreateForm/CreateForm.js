import React, { Component } from 'react';
import { Paper, TextField, Button } from 'material-ui';
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
    }

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        });
    };

    onUploadHandler = () => {
        const { title, editorState } = this.state;
        const content = draftToHtml(convertToRaw(editorState.getCurrentContent()));
        this.props.onUpload(title, content);
    }

    onTitleChange = (event) => {
        this.setState({
            title: event.target.value
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
                    fullWidth
                    onChange={this.onTitleChange}
                />
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