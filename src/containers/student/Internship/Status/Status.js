import React, { Component } from 'react';
import Axios from 'axios';
import Card from './Card';
import { Paper } from 'material-ui';

class Status extends Component {

    state = {
        posts: []
    }

    componentDidMount() {
        Axios.get('/student/following')
            .then(response => {
                console.log(response);
                this.setState({
                    posts: response.data.res
                })
            })
            .catch(error => {
                console.log(error);
            })
    }

    render () {
        return (
            <Paper style={{margin: '50px'}} >
                {this.state.posts.map(el => {
                    return <Card {...el} key={el.followingId} />
                })}
            </Paper>
        );
    }
}

export default Status;