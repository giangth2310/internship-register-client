import React, { Component } from 'react';
import classes from './SearchPage.css';
import { Button, IconButton, Grid } from 'material-ui';
import Axios from 'axios';
import SearchIcon from '@material-ui/icons/Search';

class SearchPage extends Component {

    state = {
        keyword: '',
        filterBy: 'title'
    }

    onSearchHandler = () => {
        Axios.get('/search', {
            params: this.state
        })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            })
    }

    onInputChange = (event) => {
        this.setState({
            keyword: event.target.value
        })
    }

    onFilterByChange = (event) => {
        this.setState({
            filterBy: event.target.value
        })
    }

    render () {
        return (
            <div className={classes.SearchPage}>
                <div className={classes.SearchBar} >
                    <div className={classes.InputField}>
                        <input
                            className={classes.Input}
                            placeholder='Từ khóa'
                            onChange={this.onInputChange} />
                        <IconButton className={classes.SearchIcon} onClick={this.onSearchHandler} > 
                            <SearchIcon />
                        </IconButton>
                    </div>
                    <select value={this.state.filterBy} className={classes.SelectBox} onChange={this.onFilterByChange}>
                        <option value='title'>Tên bài đăng</option>
                        <option value='partner'>Tên Đối tác</option>
                        <option value='content'>Nội dung bài đăng</option>
                    </select>
                    <Button 
                        onClick={this.onSearchHandler} 
                        color='primary'
                        variant='raised' >Tìm kiếm</Button>
                </div>
                <Grid container>
                    <Grid item xs={6}>
                    </Grid>
                    <Grid item xs={6}>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default SearchPage;