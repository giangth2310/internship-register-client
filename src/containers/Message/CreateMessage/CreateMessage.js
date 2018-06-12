import React, { Component } from 'react';
import { TextField } from 'material-ui';
import classes from './CreateMessage.css';
import { Editor } from 'react-draft-wysiwyg';
import {
    EditorState,
    convertToRaw
} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { Button } from 'material-ui';
import Axios from 'axios';
import DialogMessage from '../../../components/DialogMessage/DialogMessage';

class CreateMessage extends Component {

    state = {
        title: '',
        editorState: EditorState.createEmpty(),
        replyTo: null,
        receiverUsername: '',
        isReply: false,
        sendSuccess: false
    }

    onInputChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        });
    };

    componentDidMount() {
        if (this.props.location.state) {
            const { message } = this.props.location.state;
            const title = 'Re: ' + message.title;
            this.setState({
                title: title,
                replyTo: message.messageId,
                receiverUsername: message.senderUsername,
                isReply: true
            });
        }
    }

    onSend = () => {
        const content = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()));
        const message = {
            receiverUsername: this.state.receiverUsername,
            title: this.state.title,
            content: content,
            replyTo: this.state.replyTo
        }

        Axios.put('/message/send', message)
            .then(response => {
                console.log(response);
                this.setState({
                    sendSuccess: true
                });
            })
            .catch(error => {
                console.log(error);
            })
    }

    onCloseSuccessDialog = () => {
        this.props.history.push('/message');
    }
    
    render () {
        return (
            <div className={classes.container} >
                <TextField 
                    value={this.state.title}
                    id='title'
                    label='Tiêu đề'
                    disabled={this.state.isReply}
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
                />
                <TextField 
                    value={this.state.receiverUsername}
                    id='receiverUsername'
                    label='Người nhận'
                    disabled={this.state.isReply}
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
                />
                <div className={classes.Editor}>
                    <Editor
                        toolbarClassName = "rdw-storybook-toolbar"
                        editorClassName = "rdw-storybook-editor"
                        wrapperClassName = "rdw-storybook-wrapper"
                        editorState = {this.state.editorState}
                        onEditorStateChange = {this.onEditorStateChange}
                    />
                </div>
                <div>
                    <Button variant='raised' color='primary' onClick={this.onSend} >Gửi</Button>
                </div>
                <DialogMessage
                    open={this.state.sendSuccess}
                    title='Gửi thành công'
                    onClose={this.onCloseSuccessDialog} />
            </div>
        );
    }
}

export default CreateMessage;