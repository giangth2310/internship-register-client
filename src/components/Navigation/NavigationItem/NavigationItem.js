import React from 'react';
import { Icon, ListItem, ListItemIcon, ListItemText } from 'material-ui';
import { NavLink } from 'react-router-dom';
import classes from './NavigationItem.css';

const navigationItem = (props) => (
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

export default navigationItem;