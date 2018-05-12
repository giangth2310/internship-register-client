import React, { Component } from 'react';
import {
    Table,
    TableRow,
    TableHead,
    TableCell,
    TableBody
} from 'material-ui';
import { Paper } from 'material-ui';
import classes from './SearchTable.css';
import { columnData } from './columnData';
import { Tooltip } from 'material-ui';
import IconButton from 'material-ui/IconButton';
import { Icon } from 'material-ui';
import { connect } from 'react-redux';
import { formatDate } from '../../../../shared/utility';
import * as actions from '../../../../store/actions/index';
import { withRouter } from 'react-router-dom';

class SearchTable extends Component {
    state = {
        data: null
    }

    componentDidMount() {
        this.setState({
            data: this.props.data
        })
    }

    onEditProfileHandler = (user) => {
        this.props.onEditProfile(user);
        this.props.history.push('/dashboard/edit/' + this.props.userType + '/' + user.id);
    }

    render () {
        const headerCells = columnData[this.props.userType];
        let { data } = this.props;

        return (
            <Paper className={classes.SearchTable}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                            </TableCell>
                            {headerCells.map(el => {
                                return (
                                    <TableCell key={el.id} className={el.numberic ? classes.dense : null} >
                                        {el.label}
                                    </TableCell>
                                );
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map(user => {
                            return (
                                <TableRow key={user.id}>
                                    <TableCell className={classes.dense}>
                                        <Tooltip title='Edit'>
                                            <IconButton onClick={() => this.onEditProfileHandler(user)} >
                                                <Icon>edit</Icon>
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title='Delete'>
                                            <IconButton>
                                                <Icon>delete</Icon>
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                    {headerCells.map(field => {
                                        if (field.id === 'ngaysinh') {
                                            let ngaysinh = new Date(user.ngaysinh);
                                            return (
                                                <TableCell key={field.id}>
                                                    {formatDate(ngaysinh)}
                                                </TableCell>
                                            );
                                        }
                                        return (
                                            <TableCell 
                                                key={field.id} 
                                                className={field.numberic ? classes.dense : null} >
                                                {user[field.id]}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onEditProfile: (user) => dispatch(actions.adminOpenEditProfile(user)) 
    }
}

export default withRouter(connect(null, mapDispatchToProps)(SearchTable));