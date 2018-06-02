import React, { Component } from 'react';
import { Paper, TextField, Button } from 'material-ui';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';

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
                <Button variant='raised' color='primary' >Đăng</Button>
                </div>
            </div>
        );
    }
}

export default CreateForm;