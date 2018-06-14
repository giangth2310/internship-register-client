import React, { Component } from 'react';
import DialogMessage from '../../../components/DialogMessage/DialogMessage';
import Axios from 'axios';

class Review extends Component {

    state = {}

    componentDidMount() {
        Axios.get('/internReview?studentId=' + localStorage.getItem('id'))
            .then(response => {
                console.log(response);
                this.setState(response.data.res);
            })
            .catch(error => {
                console.log(error);
            })
    }

    onClose = () => {
        this.props.history.push('/dashboard');
    }

    render () {
        return (
            <div>
                {this.state.partnerName ? <DialogMessage open onClose={this.onClose}
                    title={'Đánh giá của ' + this.state.partnerName}
                    content={this.state.partnerComment} /> : 
                    <DialogMessage open onClose={this.onClose}
                    title={'Chưa nhận được đánh giá nào'} />}
            </div>
        );
    }
}

export default Review;