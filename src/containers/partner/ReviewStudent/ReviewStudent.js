import React, { Component } from 'react';
import { Paper, Input, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions } from 'material-ui';
import Axios from 'axios';
import classes from './ReviewStudent.css';

class ReviewStudent extends Component {

    state = {
        students: [],
        filter: '', 
        selected: null,
        review: ''
    }

    componentDidMount() {
        Axios.get("/partner/internship")
            .then(response => {
                console.log(response);
                this.setState({
                    students: response.data.res
                })
            })
            .catch(error => {
                console.log(error);
            })
    }

    onFilterChange = event => {
        this.setState({
            filter: event.target.value
        })
    }

    onInputChange = event => {
        this.setState({
            review: event.target.value
        })
    }

    onUploadReview = () => {
        Axios.put('/partner/internship/judge/' + this.state.selected.internId, {
            comment: this.state.review
        })
            .then(response => {
                console.log(response);
                this.onCloseDialog();
                this.componentDidMount();
            })
            .catch(error => {
                console.log(error);
            })
    }

    onCloseDialog = () => {
        this.setState({
            selected: null,
            review: ''
        })
    }

    render () {
        return (
            <Paper className={classes.Paper} >
                <Dialog open={this.state.selected ? true : false} fullWidth onClose={this.onCloseDialog} >
                    <DialogTitle>
                        Đánh giá
                    </DialogTitle>
                    <DialogContent>
                        <Input
                            multiline
                            disableUnderline
                            fullWidth
                            placeholder='Đánh giá'
                            rows={5}
                            rowsMax={5}
                            style={{marginBottom: '0px'}}
                            className={classes.Input}
                            value={this.state.review}
                            onChange={this.onInputChange} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.onUploadReview} >OK</Button>
                    </DialogActions>
                </Dialog>
                <Input
                    className={classes.Input}
                    disableUnderline
                    placeholder='Tìm sinh viên'
                    fullWidth
                    value={this.state.filter}
                    onChange={this.onFilterChange} />
                {this.state.students.length === 0 ? <Typography variant="body2" gutterBottom>
                    Chưa có sinh viên đăng ký
                </Typography> : null}
                {this.state.students.length !== 0 ? 
                    this.state.students.filter(el => el.studentName.toLowerCase().includes(this.state.filter.toLowerCase()))
                        .map(el => {
                            return (
                                <div key={el.internId} className={classes.Card} >
                                    <div className={classes.avatarContainer} >
                                        <img src={el.studentAvatar} className={classes.avatar} alt='avatar' />
                                    </div>
                                    <div style={{marginLeft: '10px'}} >
                                        <Typography variant="subheading" gutterBottom>
                                            {el.studentName}
                                        </Typography>
                                        <Typography variant="caption" gutterBottom>
                                            {`Mã số sinh viên: ${el.mssv}`}
                                        </Typography>
                                        <Typography variant="caption" gutterBottom>
                                            {`Email: ${el.email}`}
                                        </Typography>
                                        <Typography variant="caption" gutterBottom>
                                            {`SĐT: ${el.phone}`}
                                        </Typography>
                                        <Button onClick={() => this.setState({ selected: el, review: el.partnerComment })}
                                            >Đánh giá</Button>
                                    </div>
                                </div>
                            );
                        })
                    : null}
            </Paper>
        );
    }
}

export default ReviewStudent;