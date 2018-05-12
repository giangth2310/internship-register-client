import React, { Component } from 'react';
import classes from './Sidebar.css';
import { 
    List, 
    Drawer, 
    Avatar, 
    Divider, 
    Typography 
} from 'material-ui';
import { connect } from 'react-redux';
import NavigationItem from '../../components/Navigation/NavigationItem/NavigationItem';
import { withRouter } from 'react-router-dom';
import DefaultAvatar from '../../assets/images/default-avatar.png';
import SidebarSpecification from './SidebarSpecification'; // Object chứa config sidebar cho từng actor

class Sidebar extends Component {

    render () {

        const sidebarItems = [
            {
                link: '/dashboard',
                text: 'Trang chủ',
                icon: 'dashboard'
            }, {
                link: '/profile',
                text: 'Hồ sơ',
                icon: 'person'
            }, {
                link: '/message',
                text: 'Tin nhắn',
                icon: 'question_answer'
            },
            ...SidebarSpecification[this.props.userType],
            {
                link: '/signout',
                text: 'Đăng xuất',
                icon: 'exit_to_app'
            }
        ];

        return (
            <Drawer
                anchor='left'
                variant='permanent'
                className={classes.Drawer}
                PaperProps={{
                    className: classes.Paper
                }}>
                    <Avatar className={classes.Avatar} src={DefaultAvatar} />
                    <Typography variant='headline' className={classes.Username}>
                        Giang
                    </Typography>
                    <Divider />
                    <List component='nav' >
                        {sidebarItems.map(el => (
                            <NavigationItem key={el.icon} link={el.link} text={el.text} icon={el.icon} />
                        ))}
                    </List>
            </Drawer>
        );
    }
}

const mapStateToProps = state => {
    return {
        userType: state.signin.userType
    }
}

export default withRouter(connect(mapStateToProps)(Sidebar));