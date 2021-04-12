import axios from 'axios';
import adminActionTypes from '../types/admin';
// import setAuthToken from '../../utils/setToken';
// import { setAlert } from './alert';

import { API_URL } from '../../utils/constants';

const fetchUsersStart = (payload) => {
    return {
        type: adminActionTypes.FETCH_USERS_START,
        payload,
    };
}

const fetchUsersFailed = (payload) => {
    return {
        type: adminActionTypes.FETCH_USERS_FAILURE,
        payload,
    };
}

const fetchUsersSuccess = (payload) => {
    return {
        type: adminActionTypes.FETCH_USERS_SUCCESS,
        payload,
    };
}


const deleteUserStart = (payload) => {
    return {
        type: adminActionTypes.DELETE_USER_START,
        payload,
    };
}

const deleteUserFailed = (payload) => {
    return {
        type: adminActionTypes.DELETE_USER_FAILURE,
        payload,
    };
}

const deleteUserSuccess = (payload) => {
    return {
        type: adminActionTypes.DELETE_USER_SUCCESS,
        payload,
    };
}

const addTeacherStart = (payload) => {
    return {
        type: adminActionTypes.ADD_TEACHER_START,
        payload,
    };
}

const addTeacherFailed = (payload) => {
    return {
        type: adminActionTypes.ADD_TEACHER_FAILURE,
        payload,
    };
}

const addTeacherSuccess = (payload) => {
    return {
        type: adminActionTypes.ADD_TEACHER_SUCCESS,
        payload,
    };
}

export const addTeacher = (data) => async (dispatch) => {
    dispatch(addTeacherStart());
    try {
        const res = await axios.post(`${API_URL}/users/register`, {
            ...data,
            role: "teacher",
        });
        if (res.status === 200) {
            let user = res.data;
            console.log(user);
            dispatch(addTeacherSuccess(user));
            // dispatch(loadUser());
        } else {
            let err = res.data.err;
            console.log(err);
            dispatch(addTeacherFailed(err));
        }
    } catch (err) {
        console.log(err);
        dispatch(addTeacherFailed(err.message));
    }
};

export const deleteUser = (id) => async (dispatch) => {
    const token = localStorage.getItem('token');
    dispatch(deleteUserStart());
    if (!token) {
        dispatch(deleteUserFailed("Token not found"));
    } else {
        try {
            const res = await axios.delete(`${API_URL}/users/${id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });
            if (res.status === 200) {
                dispatch(deleteUserSuccess(id));
                // dispatch(loadUser());
            } else {
                let err = res.data.err;
                console.log(err);
                dispatch(deleteUserFailed(err));
            }
        } catch (err) {
            console.log(err);
            dispatch(deleteUserFailed(err.message));
        }
    }
}

export const fetchUsers = (data) => async (dispatch) => {
    const token = localStorage.getItem('token');
    dispatch(fetchUsersStart());
    if (!token) {
        dispatch(fetchUsersFailed("Token not found"));
    } else {
        try {
            const res = await axios.get(`${API_URL}/users/list`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });
            if (res.status === 200) {
                let users = res.data.userList;
                console.log(users);
                dispatch(fetchUsersSuccess(users));
                // dispatch(loadUser());
            } else {
                let err = res.data.err;
                console.log(err);
                dispatch(fetchUsersFailed(err));
            }
        } catch (err) {
            console.log(err);
            dispatch(fetchUsersFailed(err.message));
        }
    }
}