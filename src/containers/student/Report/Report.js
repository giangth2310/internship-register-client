import React, { Component } from 'react';
import { Paper } from 'material-ui';
import classes from './Report.css';
import { Typography, Button } from 'material-ui';
import Axios from 'axios';
import EditDialog from './EditDialog/EditDialog';

class Report extends Component {

    state = {
        reports: [],
        editReport: null,
    }

    componentDidMount() {
        Axios.get('/student/assignment')
            .then(response => {
                console.log(response);
                this.setState({
                    reports: response.data.res
                })
            })
            .catch(error => {
                console.log(error);
            })
    }   

    onEdit = (report) => {
        this.setState({
            editReport: report
        })
    }

    onDelete = (report) => {
        console.log(report);
    }
    
    closeEditDialog = () => {
        this.setState({
            editReport: null
        })
    }

    onContentChange = (event) => {
        const newReport = {
            ...this.state.editReport,
            content: event.target.value
        }
        this.setState({
            editReport: newReport
        })
    }

    onFileSelectedHandler = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile === undefined) return;
        const formData = new FormData();
        formData.append('file', selectedFile, selectedFile.name);
        const newReport = {
            ...this.state.editReport,
            file: formData
        }
        this.setState({
            editReport: newReport
        })
    }

    onUpload = () => {
        const putBody = {
            content: this.state.editReport.content,
            document: this.state.editReport.file
        }
        Axios.put('/student/assignment/' + this.state.editReport.assignmentId, putBody)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            })
    }

    render () {
        return (
            <Paper className={classes.Paper} >
                <Typography variant="title" gutterBottom>
                    Báo cáo toàn văn:
                </Typography>
                <Typography variant="title" gutterBottom>
                    Báo cáo định kỳ:
                </Typography>
                <div className={classes.container}>
                    {this.state.reports.length !== 0 ? this.state.reports.map(el => {
                        return (
                            <div key={el.assignmentId} className={classes.Card} >
                                <Typography variant="subheading" gutterBottom>
                                    {el.name}
                                </Typography>
                                <div>
                                    <Button color='primary' onClick={() => this.onEdit(el)} >Sửa</Button>
                                    <Button color='secondary' onClick={() => this.onDelete(el)} >Xóa</Button>
                                </div>
                            </div>
                        );
                    })
                    : <Typography variant="body1" gutterBottom align='center'>
                        Chưa có báo cáo
                    </Typography>}
                </div>
                <EditDialog open={this.state.editReport ? true : false}
                    onClose={this.closeEditDialog}
                    onContentChange={this.onContentChange}
                    onFileSelectedHandler={this.onFileSelectedHandler}
                    onUpload={this.onUpload}
                    {...this.state.editReport} />
            </Paper>
        );
    }
}

export default Report;