import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Paper, Grid, Divider, Tabs, Tab, Button } from 'material-ui';
import classes from './Message.css';
import { Link, Switch, Route } from 'react-router-dom';
import CreateMessage from './CreateMessage/CreateMessage';
import ViewMessage from './ViewMessage/ViewMessage';

class Message extends Component {

    componentDidMount() {
        if (this.props.location.pathname === '/message') {
            this.onCreateMessage();
        }
    }

    onCreateMessage = () => {
        this.props.history.push('/message/create/new');
    }
    
    render () {
        const listMessage = (
            this.props.inbox.map(el => {
                return (
                    <Link to={'/message/view/' + el.messageId} className={classes.Link} key={el.messageId}  >
                        <div 
                            className={el.seen === 0 ? classes.MessageCard + ' ' + classes.Unseen 
                                        : classes.MessageCard} >
                            <div className={classes.Username} >
                                {el.senderUsername}
                            </div>
                            <div className={classes.Title} >
                                {el.title}
                            </div>
                        </div>
                        <Divider />
                    </Link>
                );
            })
        );

        return (
            <Grid container >
                <Grid item xs={6}>
                    <div className={classes.Left} >
                        <Paper className={classes.Paper} >
                            <div className={classes.Tabs}>
                                <Tabs value='inbox' indicatorColor='primary' >
                                    <Tab label='INBOX' value='inbox' />
                                </Tabs>
                                <Button color='primary' variant='raised' onClick={this.onCreateMessage} >
                                    Soạn tin
                                </Button>
                            </div>
                            {listMessage}
                        </Paper>
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <div className={classes.Right} >
                        <Paper>
                            <Switch>
                                <Route path='/message/view/:messageId' component={ViewMessage} />
                                <Route path='/message/create/new' component={CreateMessage} />
                                <Route path='/message/create/reply' component={CreateMessage} />
                            </Switch>
                        </Paper>
                    </div>
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = state => {
    return {
        inbox: state.signin.newMessage
    }
}

export default connect(mapStateToProps)(Message);