import React from 'react';
import { Icon, ListItem, ListItemIcon, ListItemText } from 'material-ui';
import { NavLink } from 'react-router-dom';
import classes from './NavigationItem.css';
import { Badge } from 'material-ui';

const navigationItem = (props) => {

    if (props.badge) {
        return (
            <NavLink to={props.link} className={classes.NavigationItem} activeClassName={classes.active}>
                    <ListItem button className={classes.Item} >
                        <ListItemIcon className={classes.Text}>
                            <Icon>{props.icon}</Icon> 
                        </ListItemIcon>
                        <ListItemText className={classes.Text}>
                            <Badge color='secondary' badgeContent={props.badge} className={classes.Badge}>
                                {props.text}
                            </Badge>
                        </ListItemText>
                    </ListItem>
            </NavLink>
        );
    }

    return (
        <NavLink to={props.link} className={classes.NavigationItem} activeClassName={classes.active}>
            <ListItem button className={classes.Item} >
                <ListItemIcon className={classes.Text}>
                    <Icon>{props.icon}</Icon> 
                </ListItemIcon>
                <ListItemText className={classes.Text}>
                    {props.text}
                </ListItemText>
            </ListItem>
        </NavLink>
    );
};

export default navigationItem;