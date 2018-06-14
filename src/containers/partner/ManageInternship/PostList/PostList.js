import React, { Component } from 'react';
import Axios from 'axios';
import { connect } from 'react-redux';
import Card from '../../../../components/Card/Card';
import classes from './PostList.css';
import { Paper } from 'material-ui';

class PostList extends Component {

    state = {
        posts: []
    }

    componentDidMount() {
        Axios.get(`/search?keyword=${this.props.name}&filterBy=partner`)
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
            <Paper className={classes.container} >
                {this.state.posts ? this.state.posts.map(el => {
                    return (
                        <Card key={el.employId} {...el} />
                    );
                }) : null}
            </Paper>
        );
    }
}

const mapStateToProps = state => {
    return {
        name: state.signin.displayName
    }
}

export default connect(mapStateToProps)(PostList);