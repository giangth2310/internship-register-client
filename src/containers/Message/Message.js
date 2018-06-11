import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Paper } from 'material-ui';
import classes from './Message.css';
import { Editor } from 'react-draft-wysiwyg';

class Message extends Component {
    
    render () {
        return (
            <div className={classes.Message}>
                <Paper className={classes.Left}>
                    asdasdasdasdadadasdsadhadbjadbsadkaksjskajkjsadkajsdasdjsdakdbksadksjdakdksjadkdbksadj
                    
                </Paper>

                <Paper className={classes.Right}>
                    <div className={classes.EditorContainer}>
                        <Editor
                            toolbarClassName = "rdw-storybook-toolbar"
                            editorClassName = "rdw-storybook-editor"
                            wrapperClassName = "rdw-storybook-wrapper"
                            // editorState = {this.state.editorState}
                            // onEditorStateChange = {this.onEditorStateChange}
                        />
                    </div>
                    <p>hasagi</p>
                </Paper>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        inbox: state.signin.newMessage
    }
}

export default connect(mapStateToProps)(Message);