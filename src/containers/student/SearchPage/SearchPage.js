import React, { Component } from 'react';
import classes from './SearchPage.css';
import { Button, IconButton, CircularProgress } from 'material-ui';
import Axios from 'axios';
import SearchIcon from '@material-ui/icons/Search';
import Card from '../../../components/Card/Card';
import { Typography } from 'material-ui';

class SearchPage extends Component {

    state = {
        keyword: '',
        filterBy: 'title',
        posts: null
    }

    componentDidMount() {
        this.onSearchHandler();
    }

    onSearchHandler = () => {
        Axios.get(`/search?keyword=${this.state.keyword}&filterBy=${this.state.filterBy}`)
            .then(response => {
                console.log(response);
                this.setState({
                    posts: response.data.res
                })
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
                <div className={classes.SearchResult}>
                    <Typography variant="headline" gutterBottom>
                        {this.state.posts ? `Có ${this.state.posts.length} tin thực tập` : 'Kết quả tìm kiếm:'}
                    </Typography>
                    {this.state.posts ? this.state.posts.map(el => {
                        return (
                            <Card key={el.employId} {...el} />
                        );
                    }) : <CircularProgress className={classes.Loading} />}
                </div>
            </div>
        );
    }
}

export default SearchPage;