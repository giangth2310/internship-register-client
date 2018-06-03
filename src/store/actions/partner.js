import * as actionTypes from './actionTypes';
import Axios from 'axios';

export const createEmployInfo = (title, content) => {
    return dispatch => {
        const employInfo = {
            title: title,
            content: content
        }
        console.log(employInfo);
        Axios.post('/employInfo/create', employInfo)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            })
    }
}