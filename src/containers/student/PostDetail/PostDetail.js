import React, { Component } from 'react';
import Axios from 'axios';
import { Paper } from 'material-ui';
import classes from './PostDetail.css';
import { Typography } from 'material-ui';

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

    render () {
        let fullPost = (
            <div className={classes.container}>
                <Typography variant="headline" gutterBottom>
                    {this.state.title}
                </Typography>
                <div dangerouslySetInnerHTML={{ __html: this.state.content }} />
            </div>
        );

        return (
            <Paper className={classes.Paper}>
                {this.state.content ? fullPost : null}
            </Paper>
        );
    }
}

export default PostDetail;