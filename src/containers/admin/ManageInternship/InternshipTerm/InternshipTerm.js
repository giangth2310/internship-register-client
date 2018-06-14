import React, { Component } from 'react';
import { Dialog, Table, TableRow, TextField } from 'material-ui';
import Axios from 'axios';
import { DialogTitle } from 'material-ui';
import { DialogContent } from 'material-ui';
import { TableBody } from 'material-ui';
import { TableCell } from 'material-ui';
import { Button } from 'material-ui';
import { TableHead } from 'material-ui';

class InternshipTerm extends Component {

    state = {
        terms: [],
        name: '',
        startTime: '',
        endTime: ''
    }

    fetchInternshipTerm = () => {
        Axios.get('/admin/internshipTerm')
            .then(response => {
                console.log(response);
                this.setState({
                    terms: response.data.res
                });
            })
            .catch(error => {
                console.log(error);
            })
    }

    componentDidMount() {
        this.fetchInternshipTerm();
    }

    onInputChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    onCreateTerm = () => {
        const term = {
            name: this.state.name,
            startTime: this.state.startTime,
            endTime: this.state.endTime
        };
        Axios.post('/admin/internshipTerm/create', term)
            .then(response => {
                this.fetchInternshipTerm();
            })
            .catch(error => {
                console.log(error);
            })
    }

    render () {
        const mainContent = (
            <DialogContent>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                STT
                            </TableCell>
                            <TableCell>
                                Tên kì thực tập
                            </TableCell>
                            <TableCell>
                                Ngày bắt đầu
                            </TableCell>
                            <TableCell>
                                Ngày kết thúc
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell padding='none'>
                                <Button onClick={this.onCreateTerm} >Tạo</Button>
                            </TableCell>
                            <TableCell padding='dense'>
                                <TextField placeholder='Tên kì thực tập' id='name' onChange={this.onInputChange} />
                            </TableCell>
                            <TableCell padding='dense'>
                                <TextField type='date' id='startTime' onChange={this.onInputChange} />
                            </TableCell>
                            <TableCell padding='dense'>
                                <TextField type='date' id='endTime' onChange={this.onInputChange} />
                            </TableCell>
                        </TableRow>
                        {this.state.terms.map(el => {
                            return (
                                <TableRow key={el.internshipTermId} >
                                    <TableCell>
                                        {el.internshipTermId}
                                    </TableCell>
                                    <TableCell>
                                        {el.name}
                                    </TableCell>
                                    <TableCell>
                                        {el.startTime}
                                    </TableCell>
                                    <TableCell>
                                        {el.endTime}
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </DialogContent>
        );
        return (
            <Dialog open maxWidth={false} onClose={this.props.onClose} >
                <DialogTitle>
                    Kì thực tập
                </DialogTitle>
                {this.state.terms && mainContent}
            </Dialog>
        );
    }
}

export default InternshipTerm;