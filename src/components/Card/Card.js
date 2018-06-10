import React, { Component } from 'react';
import classes from './Card.css';
import { Typography } from 'material-ui';
import { formatDate } from '../../shared/utility';

class Card extends Component {

    render () {
        const expireDate = new Date(this.props.expireDate);

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
                        {expireDate < new Date() ?
                            <span className={classes.ExpireTag}>
                                Hết hạn đăng ký
                            </span> : null}
                    </Typography>
                    <Typography variant="caption" gutterBottom>
                        Ngày hết hạn: {formatDate(expireDate)}
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