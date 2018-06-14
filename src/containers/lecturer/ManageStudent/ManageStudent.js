import React, { Component } from 'react';
import { Paper, Typography, Input } from 'material-ui';
import classes from './ManageStudent.css';
import Axios from 'axios';

class ManageStudent extends Component {

    state = {
        students: [],
        filter: ''
    }

    componentDidMount() {
        Axios.get('/lecturer/student')
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

    render () {
        return (
            <Paper className={classes.Paper} >
                <Input
                    className={classes.Input}
                    disableUnderline
                    placeholder='Lọc sinh viên'
                    fullWidth
                    value={this.state.filter}
                    onChange={this.onFilterChange} />
                {this.state.students.length === 0 ? <Typography variant="body2" gutterBottom>
                    Chưa có sinh viên đăng ký
                </Typography> : null}
                <div className={classes.Result}>
                    {this.state.students.filter(el => el.studentName.toLowerCase().includes(this.state.filter.toLowerCase()))
                        .map(el => {
                            return (
                                <div key={el.internId} className={classes.Card} 
                                    onClick={() => window.open('/student/' + el.studentId, '_blank')} >
                                    <div className={classes.avatarContainer} >
                                        <img src={el.studentAvatar} className={classes.avatar} alt='avatar' />
                                    </div>
                                    <div style={{marginLeft: '10px'}}>
                                        <Typography variant="headline" gutterBottom >
                                            {el.studentName}
                                        </Typography>
                                        <Typography variant="body2" gutterBottom>
                                            Kì thực tập: {el.internshipTermName}
                                        </Typography> 
                                        <Typography variant="body2" gutterBottom>
                                            Thực tập tại: {el.partnerName}
                                        </Typography> 
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </Paper>
        );
    }
}

export default ManageStudent;