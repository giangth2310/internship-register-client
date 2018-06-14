import React, { Component, Fragment } from 'react';
import Axios from 'axios';
import { Paper, Typography } from 'material-ui';
import classes from './PostEdit.css';
import { Button } from 'material-ui';
import ProfileDialog from './ProfileDialog/ProfileDialog';

class PostEdit extends Component {

    state = {
        students: [],
        profileDialog: null
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        Axios.get('/partner/following')
            .then(response => {
                console.log(response);
                const followingStudent = response.data.res.filter(el => el.employId === Number(this.props.match.params.employId));
                this.setState({
                    students: followingStudent
                })
            })
            .catch(error => {
                console.log(error);
            })
    }

    onAccept = (student) => {
        Axios.put('/partner/following/' + student.followingId, {
            judgement: 'accepted'
        })
            .then(response => {
                console.log(response);
                this.fetchData();
            })
            .catch(error => {
                console.log(error);
            })
    }

    onReject = (student) => {
        Axios.put('/partner/following/' + student.followingId, {
            judgement: 'rejected'
        })
            .then(response => {
                console.log(response);
                this.fetchData();
            })
            .catch(error => {
                console.log(error);
            })
    }

    closeProfileDialog = () => {
        this.setState({
            profileDialog: null
        })
    }

    render () {
        return (
            <Paper className={classes.container} >
                {this.state.students ? <Typography variant="display1" gutterBottom style={{margin: '30px'}} >
                    Chưa có ai follow tin này
                </Typography> : null}
                <ProfileDialog open={this.state.profileDialog ? true : false} 
                    onClose={this.closeProfileDialog} {...this.state.profileDialog} />
                {this.state.students.map(el => {
                    return (
                        <div key={el.followingId} className={classes.Card} >
                            <div className={classes.avatarContainer} >
                                <img src={el.avatarLink} className={classes.avatar} alt='avatar' />
                            </div>
                            <div style={{marginLeft: '10px'}}>
                                <Typography variant="display1" gutterBottom >
                                    {el.name}
                                </Typography>
                                <div>
                                    <Button onClick={() => this.setState({ profileDialog: el })} >Thông tin</Button>
                                {el.status === 'waiting for interview' ? 
                                    <Fragment>
                                        <Button color='primary' onClick={() => this.onAccept(el)} >Chấp nhận</Button>
                                        <Button color='secondary' onClick={() => this.onReject(el)} >Từ chối</Button>
                                    </Fragment>
                                : (el.status.toLowerCase() === 'rejected' ? 
                                    <Button variant='raised' disabled >Đã từ chối</Button>
                                    : <Button variant='raised' disabled >Đã chấp nhận</Button>)}
                                </div> 
                            </div>
                        </div>
                    )
                })}
            </Paper>
        );
    }
}

export default PostEdit;