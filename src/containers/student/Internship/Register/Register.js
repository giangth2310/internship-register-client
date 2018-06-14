import React, { Component, Fragment } from 'react';
import { Paper, InputLabel, Input, Avatar, Chip } from 'material-ui';
import Axios from 'axios';
import classes from './Register.css';
import { Select } from 'material-ui';
import { Button } from 'material-ui';
import DialogMessage from '../../../../components/DialogMessage/DialogMessage';

class Register extends Component {
    state = {
        lecturer: [],
        partner: [],
        term: [],
        internAt: "lecturer",
        selectedLecturer: null,
        selectedPartner: null,
        selectedTerm: null,
        lecturerFilter: "",
        partnerFilter: "",
        error: null,
        success: false
    };

    onCloseErrorDialog = () => {
        this.setState({
            error: null
        })
    }

    componentDidMount() {
        Axios.get("/profile/lecturer")
            .then(response => {
                console.log(response);
                this.setState({
                lecturer: response.data.res
                });
            })
            .catch(error => {
                console.log(error);
            });
        Axios.get("/profile/partner")
            .then(response => {
                console.log(response);
                this.setState({
                partner: response.data.res
                });
            })
            .catch(error => {
                console.log(error);
            });
        Axios.get("/admin/internshipTerm")
            .then(response => {
                console.log(response);
                this.setState({
                    term: response.data.res,
                });
                this.setState({
                    selectedTerm: this.state.term[0].internshipTermId
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    onInternAtChange = event => {
        this.setState({
            internAt: event.target.value
        });
    };

    onInputChange = event => {
        this.setState({
        [event.target.id]: event.target.value
        });
    };

    onSelectLecturer = lecturer => {
        this.setState({
        selectedLecturer: lecturer
        });
    };

    onSelectPartner = partner => {
        this.setState({
            selectedPartner: partner
        });
    };

    onDeleteSelectedLecturer = () => {
        this.setState({
            selectedLecturer: null
        });
    };

    onDeleteSelectedPartner = () => {
        this.setState({
        selectedPartner: null
        });
    };

    onRegisterHandler = () => {
        const partnerId = this.state.selectedPartner ? this.state.selectedPartner.id : 0;
        const postBody = {
            lecturerId: this.state.selectedLecturer.id,
            partnerId: partnerId,
            internshipTermId: this.state.selectedTerm
        }
        Axios.post('/student/internship/register', postBody)
            .then(response => {
                console.log(response);
                if (response.data.success) {
                    this.setState({
                        success: true,
                        error: null
                    })
                } else {
                    this.setState({
                        success: false,
                        error: response.data.error
                    })
                }
            })
            .catch(error => {
                this.setState({
                    success: false,
                    error: error
                })
            });
    }

    onCloseSuccessDialog = () => {
        this.setState({
            success: false
        })
    }

    onSelectTerm = event => {
        this.setState({
            selectedTerm: event.target.value
        });
    };

    render() {
        const selectLecturer = (
            <div style={{ display: "flex" }}>
                <div>
                <InputLabel htmlFor="lecturerFilter" className={classes.label}>
                    Chọn giảng viên:{' '}
                </InputLabel>
                {this.state.selectedLecturer ? (
                    <Chip
                    avatar={<Avatar src={this.state.selectedLecturer.avatarLink} />}
                    label={this.state.selectedLecturer.name}
                    onDelete={this.onDeleteSelectedLecturer} />
                ) : (
                    <Input
                    id="lecturerFilter"
                    value={this.state.lecturerFilter}
                    disableUnderline
                    className={classes.input}
                    onChange={this.onInputChange}
                    />
                )}
                </div>
                {this.state.selectedLecturer ? null : (
                <div className={classes.FilterResult}>
                    {this.state.lecturer
                    .filter(el =>
                        el.name
                        .toLowerCase()
                        .includes(this.state.lecturerFilter.toLowerCase())
                    )
                    .map(el => {
                        return (
                        <Paper
                            className={classes.FilterCard}
                            key={el.id}
                            onClick={() => this.onSelectLecturer(el)}
                        >
                            <Avatar
                            src={el.avatarLink}
                            alt="avatar"
                            className={classes.Avatar}
                            />
                            {el.name}
                        </Paper>
                        );
                    })}
                </div>
                )}
            </div>
        );

        const selectPartner = (
            <Fragment>
                <br/>
                <div style={{ display: "flex" }}>
                    <div>
                    <InputLabel htmlFor="partnerFilter" className={classes.label}>
                        Chọn đối tác:{' '}
                    </InputLabel>
                    {this.state.selectedPartner ? (
                        <Chip
                        avatar={<Avatar src={this.state.selectedPartner.avatarLink} />}
                        label={this.state.selectedPartner.name}
                        onDelete={this.onDeleteSelectedPartner} />
                    ) : (
                        <Input
                        id="partnerFilter"
                        value={this.state.partnerFilter}
                        disableUnderline
                        className={classes.input}
                        onChange={this.onInputChange}
                        />
                    )}
                    </div>
                    {this.state.selectedPartner ? null : (
                    <div className={classes.FilterResult}>
                        {this.state.partner
                        .filter(el =>
                            el.name
                            .toLowerCase()
                            .includes(this.state.partnerFilter.toLowerCase())
                        )
                        .map(el => {
                            return (
                            <Paper
                                className={classes.FilterCard}
                                key={el.id}
                                onClick={() => this.onSelectPartner(el)}
                            >
                                <Avatar
                                src={el.avatarLink}
                                alt="avatar"
                                className={classes.Avatar}
                                />
                                {el.name}
                            </Paper>
                            );
                        })}
                    </div>
                    )}
                </div>
            </Fragment>
        );

        const internAt = (
            <Fragment>
                <div>
                    <InputLabel htmlFor="internAt" className={classes.label}>
                        Thực tập:{' '}
                    </InputLabel>
                    <Select
                        id="internAt"
                        value={this.state.internAt}
                        native
                        onChange={this.onInternAtChange}>
                        <option value="lecturer">tại trường</option>
                        <option value="partner">với doanh nghiệp</option>
                    </Select>
                </div>
                {this.state.internAt === 'partner' && selectPartner}
                <br />
                <div>
                    <Button variant='raised' color='primary' onClick={this.onRegisterHandler} >Đăng ký</Button>
                </div>
            </Fragment>
        );
        
        const selectTerm = (
            <div>
                <InputLabel htmlFor="term" className={classes.label}>
                    Chọn kì thực tập:{' '}
                </InputLabel>
                <Select
                    id="term"
                    value={this.state.internAt}
                    native
                    onChange={this.onSelectTerm}>
                    {this.state.term.map(el => {
                        return <option value={el.displayEmpty} key={el.internshipTermId} >{el.name}</option>
                    })}
                </Select>
            </div>
        );

        return (
        <Paper className={classes.Paper}>
            {selectTerm}
            <br/>
            {selectLecturer}
            <br />
            {this.state.selectedLecturer !== null && internAt}
            <DialogMessage
                open={this.state.error ? true : false}
                title='Có lỗi xảy ra :('
                content={this.state.error}
                onClose={this.onCloseErrorDialog}
                /> 
            <DialogMessage
                open={this.state.success}
                title='Đăng ký thành công'
                onClose={this.onCloseSuccessDialog}
                /> 
        </Paper>
        );
    }
}

export default Register;