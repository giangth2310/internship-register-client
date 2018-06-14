import React, { Component, Fragment } from 'react';
import { Dialog, DialogTitle, DialogContent, Input, Button } from 'material-ui';
import classes from './JudgeDialog.css';
import Axios from 'axios';
import { DialogActions } from 'material-ui';

class CreateDialog extends Component {

    state = {
        comment: '',
        score: ''
    }

    onInputChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    onUpload = () => {
        Axios.put('/lecturer/assignment/judge/' + this.props.assignmentId, {
            score: Number(this.state.score),
            comment: this.state.comment
        })
            .then(response => {
                console.log(response);
                this.onClose();
            })
            .catch(error => {
                console.log(error);
            })
    }

    onClose = () => {
        this.setState({
            comment: '',
            score: ''
        })
        this.props.onClose();
    }

    render () {
        return (
            <Dialog open={this.props.open} onClose={this.onClose}
                fullWidth >
                <DialogTitle>
                    {this.props.name || 'Tiêu đề'}
                </DialogTitle>
                <DialogContent>
                    <div className={classes.content} > 
                        {this.props.content}
                        <br />
                        <br />
                        {this.props.comment ? 
                            <Fragment>
                                {`Nhận xét đã cho: ${this.props.comment}`}
                                <br />
                                <br />
                            </Fragment> : null }
                        {this.props.comment ? 
                            <Fragment>
                                {`Điểm đã cho: ${this.props.score}`}
                                <br />
                                <br />
                            </Fragment> : null }
                        <Button color='primary' onClick={() => window.open(this.props.file, '_blank')} >Tải báo cáo</Button>
                        <br />
                        <br />
                        <Input
                            multiline
                            id='comment'
                            disableUnderline
                            fullWidth
                            placeholder='Nhận xét'
                            rows={5}
                            rowsMax={5}
                            className={classes.Input}
                            value={this.state.comment}
                            onChange={this.onInputChange} />
                        <br />
                        <Input
                            id='score'
                            disableUnderline
                            fullWidth
                            placeholder='Điểm'
                            className={classes.Input}
                            value={this.state.score}
                            onChange={this.onInputChange} />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button variant='raised' color='primary' onClick={this.onUpload} >Tải lên</Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default CreateDialog;