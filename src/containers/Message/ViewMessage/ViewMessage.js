import React, { Component } from 'react';
import Axios from 'axios';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import classes from './ViewMessage.css';
import { Typography, CircularProgress, Divider } from 'material-ui';
import { Button } from 'material-ui';

class ViewMessage extends Component {

    componentDidUpdate() {
        Axios.get('/message/view/' + this.props.match.params.messageId)
            .then(response => {
                console.log(response);
                const message = {
                    ...response.data.result,
                    seen: 1
                };
                this.props.onViewMessage(message);
            })
            .catch(error => {
                console.log(error);
            })
    }

    componentDidMount() {
        this.componentDidUpdate();
    }

    onReply = (message) => {
        this.props.history.push({
            pathname: '/message/create/reply',
            state: { message: message }
        })
    }

    render () {
        const { inbox } = this.props;
        const message = inbox[inbox.findIndex(el => el.messageId === Number(this.props.match.params.messageId))];
        console.log(message);

        const mainContent = (
            <div className={classes.container} >
                <Typography variant="headline" gutterBottom>
                    {message.title}
                </Typography>
                <Divider />
                <br />
                <Typography variant="caption" gutterBottom>
                    {`Người gửi: ${message.senderUsername}`}
                </Typography>
                <Typography variant="caption" gutterBottom>
                    {`Người nhận: ${message.receiverUsername}`}
                </Typography>
                <br />
                <Divider />
                <br />
                <div dangerouslySetInnerHTML={{ __html: message.content }} />
                <br />
                <Button variant='raised' onClick={() => this.onReply(message)} >Reply</Button>
            </div>
        );

        return (
            <div className={classes.ViewMessage} >
                {message ? mainContent : <CircularProgress /> }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        inbox: state.signin.newMessage
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onViewMessage: (message) => dispatch(actions.viewMessage(message))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewMessage);