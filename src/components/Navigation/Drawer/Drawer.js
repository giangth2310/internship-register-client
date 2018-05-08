import React from 'react';
import classes from './Drawer.css';
import { List, Drawer, Avatar, Divider, Typography } from 'material-ui';
import { connect } from 'react-redux';
import NavigationItem from '../NavigationItem/NavigationItem';
import { withRouter } from 'react-router-dom';
import DefaultAvatar from '../../../assets/images/default-avatar.png';

const NavigationItems = {
    student: [
        {
            link: '/dashboard',
            text: 'Trang chủ',
            icon: 'dashboard'
        },
        {
            link: '/message',
            text: 'Tin nhắn',
            icon: 'question_answer'
        },
        {
            link: '/report',
            text: 'Báo cáo',
            icon: 'description'
        },
        {
            link: '/review',
            text: 'Đánh giá',
            icon: 'announcement'
        },
        {
            link: '/signout',
            text: 'Đăng xuất',
            icon: 'exit_to_app'
        }
    ]
};

const drawer = (props) => (
    <Drawer
        anchor='left'
        variant='permanent'
        className={classes.Drawer}
        PaperProps={{
            className: classes.Paper
        }}>
            <Avatar className={classes.Avatar} src={DefaultAvatar} />
            <Typography variant="headline" className={classes.Username}>
                Giang
            </Typography>
            <Divider />
            <List component='nav' >
                {NavigationItems[props.userType].map(el => (
                    <NavigationItem key={el.icon} link={el.link} text={el.text} icon={el.icon} />
                ))}
            </List>
    </Drawer>
);

const mapStateToProps = state => {
    return {
        userType: state.signin.userType
    }
}

export default withRouter(connect(mapStateToProps)(drawer));