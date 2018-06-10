import React, { Component } from 'react';
import classes from './SearchPage.css';
import { Button, CircularProgress } from 'material-ui';
import Axios from 'axios';
import Card from '../../../components/Card/Card';
import { Typography } from 'material-ui';
import { suggestions } from './suggestions';
import Autosuggest from 'react-autosuggest';

const renderSuggestion = suggestion => (
    <div>
        {suggestion.value}
    </div>
);

const getSuggestionValue = suggestion => suggestion.value;

const getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    
    return inputLength === 0 ? [] : suggestions.filter(el =>
        el.value.toLowerCase().includes(inputValue)
    );
};


class SearchPage extends Component {

    state = {
        keyword: '',
        filterBy: 'title',
        posts: null,
        suggestions: []
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

    onInputChange = (event, { newValue }) => {
        this.setState({
            keyword: newValue
        })
    }

    onFilterByChange = (event) => {
        this.setState({
            filterBy: event.target.value
        })
    }

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: getSuggestions(value)
        });
    };

    render () {
        const inputProps = {
            className: classes.Input,
            placeholder: 'Từ khóa',
            onChange: this.onInputChange,
            value: this.state.keyword,
            type: 'search',
        };
        return (
            <div>
                <div className={classes.SearchBar} >
                    <div className={classes.InputField}>
                        <Autosuggest
                            suggestions={this.state.suggestions}
                            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                            getSuggestionValue={getSuggestionValue}
                            renderSuggestion={renderSuggestion}
                            inputProps={inputProps}
                        />
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