import React, { Component } from 'react';
import { Paper, Typography, Button } from 'material-ui';
import classes from './ViewStudent.css';
import Axios from 'axios';
import JudgeDialog from './JudgeDialog/JudgeDialog';

class ViewStudent extends Component {

    state = {
        weekly: [],
        final: [],
        selectedReport: null,
    }

    componentDidMount() {
        Axios.get(`/lecturer/assignment?studentId=${this.props.match.params.studentId}&type=weekly`)
            .then(response => {
                console.log(response);
                this.setState({
                    weekly: response.data.res
                })
            })
            .catch(error => {
                console.log(error);
            })
        Axios.get(`/lecturer/assignment?studentId=${this.props.match.params.studentId}&type=final`)
            .then(response => {
                console.log(response);
                this.setState({
                    final: response.data.res
                })
            })
            .catch(error => {
                console.log(error);
            })
    }

    onCloseJudgeDialog = () => {
        this.setState({
            selectedReport: null,
        });
        this.componentDidMount();
    }

    onSelectReport = report => {
        this.setState({
            selectedReport: report,
        })
    }

    render () {
        return (
            <Paper className={classes.container} >
                <JudgeDialog open={this.state.selectedReport ? true : false}
                    onClose={this.onCloseJudgeDialog}
                    {...this.state.selectedReport} />
                <Typography variant="title" gutterBottom>
                    Báo cáo toàn văn:
                </Typography>
                {this.state.final.length !== 0 ? this.state.final.map(el => {
                    return (
                        <div key={el.assignmentId} className={classes.Card} >
                            <Typography variant="subheading" gutterBottom>
                                {el.name}
                            </Typography>
                            <div>
                                <Button color='primary' onClick={() => this.onSelectReport(el)} >Xem</Button>
                            </div>
                        </div>
                    );
                })
                : <Typography variant="body1" gutterBottom align='center'>
                    Chưa có báo cáo
                </Typography>}
                <Typography variant="title" gutterBottom>
                    Báo cáo định kỳ:
                </Typography>
                <div style={{ display: 'flex', flexFlow: 'column'}} >
                    {this.state.weekly.length !== 0 ? this.state.weekly.map(el => {
                        return (
                            <div key={el.assignmentId} className={classes.Card} >
                                <Typography variant="subheading" gutterBottom>
                                    {el.name}
                                </Typography>
                                <div>
                                    <Button color='primary' onClick={() => this.onSelectReport(el)} >Xem</Button>
                                </div>
                            </div>
                        );
                    })
                    : <Typography variant="body1" gutterBottom align='center'>
                        Chưa có báo cáo
                    </Typography>}
                </div>
            </Paper>
        );
    }
}

export default ViewStudent;