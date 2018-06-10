import React, { Component } from 'react';
import Axios from 'axios';
import { Paper, Grid, Divider } from 'material-ui';
import classes from './PostDetail.css';
import { Typography, Button } from 'material-ui';
import { formatDate } from '../../../shared/utility';

class PostDetail extends Component {

    state = {}

    componentDidMount() {
        Axios.get('/employInfo/' + this.props.match.params.employId)
            .then(response => {
                console.log(response);
                this.setState(response.data.res);
            })
            .catch(error => {
                console.log(error);
            })
    }

    onFollow = () => {
        Axios.put('/employInfo/' + this.props.match.params.employId)
            .then(response => {
                console.log(response);
                this.setState(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }

    render () {
        let fullPost = (
            <Grid container spacing={40}>
                <Grid item xs={3}>
                    <img src={this.state.partnerAvatar} alt={this.state.partnerName} className={classes.Logo} />
                    <div className={classes.Partner}>
                        <Typography variant="title" gutterBottom align='center'>
                            {this.state.partnerName}
                        </Typography>
                        <Typography gutterBottom noWrap>
                            Thông tin:<br />
                            {this.state.partnerThongtin} <br />
                            Liên hệ: <br />
                            {this.state.partnerContact}
                        </Typography>
                    </div>
                </Grid>
                <Grid item xs={9}>
                    <Typography variant="headline" gutterBottom>
                        {this.state.title}
                    </Typography>
                    <br />
                    <Typography  gutterBottom>
                        Ngày đăng: {formatDate(new Date(this.state.postedDate))}
                    </Typography>
                    <Typography gutterBottom>
                        Ngày hết hạn: {formatDate(new Date(this.state.expireDate))}
                    </Typography>
                    {new Date() > new Date(this.state.expireDate) ?
                        <Button variant='raised' disabled >Hết hạn đăng ký</Button> : 
                        <Button 
                            variant='raised' 
                            color='primary' 
                            onClick={this.onFollow}
                            className={classes.FollowButton}>{this.state.following ? 'FOLLOWING' : 'FOLLOW'}</Button>}
                    <br />
                    <br />
                    <Divider />
                    <div dangerouslySetInnerHTML={{ __html: this.state.content }} />
                </Grid>
            </Grid>
        );

        return (
            <Paper className={classes.Paper}>
                {this.state.content ? fullPost : null}
            </Paper>
        );
    }
}

export default PostDetail;