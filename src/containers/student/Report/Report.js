import React, { Component } from 'react';
import { Paper } from 'material-ui';
import classes from './Report.css';
import { Typography, Button } from 'material-ui';
import Axios from 'axios';
import EditDialog from './EditDialog/EditDialog';
import CreateDialog from './CreateDialog/CreateDialog';

class Report extends Component {

    state = {
        reports: [],
        editReport: null,
        openCreate: false
    }

    componentDidMount() {
        Axios.get('/student/assignment')
            .then(response => {
                console.log(response);
                this.setState({
                    reports: response.data.res,
                    editReport: null,
                    openCreate: false
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
        Axios.delete('/student/assignment/' + report.assignmentId)
            .then(response => {
                console.log(response);
                this.componentDidMount();
            })
            .catch(error => {
                console.log(error);
            })
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
        const newReport = {
            ...this.state.editReport,
            file: selectedFile
        }
        this.setState({
            editReport: newReport
        })
    }

    onUpload = () => {
        let selectedFile = this.state.editReport.file;
        if (!selectedFile) selectedFile = null;
        const formData = new FormData();
        formData.append('document', selectedFile, selectedFile.name);
        formData.append('content', this.state.editReport.content);
        Axios.put('/student/assignment/' + this.state.editReport.assignmentId, formData)
            .then(response => {
                console.log(response);
                this.componentDidMount();
            })
            .catch(error => {
                console.log(error);
            })
    }

    onCreate = report => {
        let selectedFile = report.document;
        const formData = new FormData();
        if (selectedFile) {
            formData.append('document', selectedFile, selectedFile.name);
        } else {
            formData.append('document', null);
        }
        formData.append('content', report.content);
        formData.append('type', report.type);
        Axios.post('/student/assignment/', formData)
            .then(response => {
                console.log(response);
                this.componentDidMount();
            })
            .catch(error => {
                console.log(error);
            })
    }

    render () {
        return (
            <Paper className={classes.Paper} >
                <div>
                    <Button color='primary' variant='raised' onClick={() => this.setState({openCreate: true})} >Tạo báo cáo</Button>
                </div>
                <CreateDialog onCreate={this.onCreate} onClose={() => this.setState({openCreate: false})}
                    open={this.state.openCreate} />
                <br/>
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