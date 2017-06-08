import axios from 'axios';
import {ROOT_URL} from './index';

export const REGISTER_USER = 'REGISTER_USER';
export const FETCHING_USER = 'FETCHING_USER';
export const REGISTER_USER_ERROR = 'REGISTER_USER_ERROR';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';

export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';

export function registerUserSuccess(user) {
    console.log('inside the registeredUserSuccess with the following user:');
    console.log(user);
    return {
        type: REGISTER_USER_SUCCESS,
        payload: user
    }
}

export function registerUserError() {
    console.log("there was an error and we're inside the register user error function");
    return {
        type: REGISTER_USER_ERROR,
        payload: {isFetching: false}
    }
}

export function fetchingUser() {
    return {
        type: FETCHING_USER,
        payload: {isFetching: true}
    }
}

export function registerUser(userData) {
    console.log("Registering a new user with the following data:");
    console.log(userData);

    // const request = axios.post(`${ROOT_URL}register`, userData);

    return dispatch => {
        dispatch(fetchingUser());
        axios.post(`${ROOT_URL}register`, userData)
            .then((response) => {
                console.log('inside the register user dispatch with response:', response);
                dispatch(registerUserSuccess(response.data.user));
            })
            .catch((error)=>{
                dispatch(registerUserError(error));
            });
    }

};

export function logInUserSuccess(data) {
    console.log("inside loginUserSucces with:", data);

    return{
        type: LOGIN_USER_SUCCESS,
        payload: data,
        // token: us,
    }

}

export function logInUserError(error){
    console.log("inside the loginUser error page with:", error);
}

export function logInUser(user) {

    return dispatch => {
        dispatch(fetchingUser());
        axios.post(`${ROOT_URL}login`, user)
            .then((response) => {
                console.log("inside the register post");
                console.log(response);
                dispatch(logInUserSuccess(response))
            })
            .catch((error) => {
                console.log("there was an error login in!");
                console.log(error);
            })
    }

}
