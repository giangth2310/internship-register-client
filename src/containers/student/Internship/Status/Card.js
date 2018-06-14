import React, { Component } from 'react';
import classes from './Card.css';
import { Typography } from 'material-ui';

const mapStatus = {
    'waiting for interview': 'Chờ phỏng vấn',
    'accepted': 'Trúng tuyển',
    'rejected': 'Không trúng tuyển'
}

class Card extends Component {

    render () {
        return (
            <div className={classes.Card}>
                <img 
                    src={this.props.partnerAvatar} 
                    alt={this.props.partnerName}
                    className={classes.Logo} />
                <div className={classes.Content}>
                    <Typography variant="title" gutterBottom>
                        <a href={'/internship-post/' + this.props.employId} target='_blank' className={classes.Title}>
                            {this.props.title}
                        </a>
                        <span className={classes.ExpireTag}>
                            {mapStatus[this.props.status]}
                        </span>
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        {this.props.plaintext.slice(0,200) + '...'}
                    </Typography>
                </div>
            </div>
        );
    }
}

export default Card;