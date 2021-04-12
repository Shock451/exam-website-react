import axios from 'axios';
// import jwt_decode from 'jwt-decode';
import authActionTypes from '../types/auth';
// import setAuthToken from '../../utils/setToken';
import { setAlert } from './alert';

import { API_URL } from '../../utils/constants';

const { REACT_APP_API_URL } = process.env;

const loadUserStart = (payload) => {
  return {
    type: authActionTypes.LOAD_USER_START,
    payload,
  };
}

const loadUserFailed = (payload) => {
  return {
    type: authActionTypes.LOAD_USER_FAILURE,
    payload,
  };
}

const loadUserSuccess = (payload) => {
  return {
    type: authActionTypes.LOAD_USER_SUCCESS,
    payload,
  };
}

const loginStart = () => {
  return {
    type: authActionTypes.LOGIN_START,
  };
}

const loginFailed = (payload) => {
  return {
    type: authActionTypes.LOGIN_FAILURE,
    payload,
  };
}

const loginSuccess = (payload) => {
  return {
    type: authActionTypes.LOGIN_SUCCESS,
    payload,
  };
}

const signupStart = () => {
  return {
    type: authActionTypes.SIGNUP_START,
  };
}

const signupFailed = (payload) => {
  return {
    type: authActionTypes.SIGNUP_FAILURE,
    payload,
  };
}

const signupSuccess = (payload) => {
  return {
    type: authActionTypes.SIGNUP_SUCCESS,
    payload,
  };
}

const getProfileStart = () => {
  return {
    type: authActionTypes.GET_PROFILE_START,
  };
}

const getProfileFailed = (payload) => {
  return {
    type: authActionTypes.GET_PROFILE_FAILURE,
    payload,
  };
}

const getProfileSuccess = (payload) => {
  return {
    type: authActionTypes.GET_PROFILE_SUCCESS,
    payload,
  };
}

export const clearError = () => {
  return {
    type: authActionTypes.CLEAR_ERROR
  };
}

export const logout = () => {
  return {
    type: authActionTypes.LOGOUT
  };
}

// const check = () => {
//   const token = localStorage.getItem('token');
//   const decoded = jwt_decode(token);

//   var d = new Date();
//   if (d.setDate(d.getDate() - 2) >= decoded.exp * 1000) {
//     localStorage.clear('token');
//   }
// };

export const loadUser = () => async (dispatch) => {
  const token = localStorage.getItem('token');
  dispatch(loadUserStart());
  if (!token) {
    dispatch(loadUserFailed("Token not found"));
  } else {
    try {
      const res = await axios.get(`${API_URL}/users/me`, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        let user = res.data;
        console.log(user);
        dispatch(loadUserSuccess(user));
      } else {
        let err = res.data.err;
        console.log(err);
        dispatch(loadUserFailed(err));
      }
    } catch (err) {
      console.log(err);
      dispatch(loadUserFailed(err.message));
    }
  }
};

export const login = (data) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(`${API_URL}/users/login`, {
      ...data
    });
    if (res.status === 200) {
      let user = res.data;
      console.log(user);
      dispatch(loginSuccess(user));
      // dispatch(loadUser());
    } else {
      let err = res.data.err;
      console.log(err);
      dispatch(loginFailed(err));
    }
  } catch (err) {
    console.log(err);
    dispatch(loginFailed(err.message));
  }
};

export const signup = (data) => async (dispatch) => {
  dispatch(signupStart());
  try {
    const res = await axios.post(`${API_URL}/users/register`, {
      ...data,
      role: "student",
    });

    if (res.status === 200) {
      let user = res.data;
      console.log(user);
      dispatch(signupSuccess(user));
      // dispatch(loadUser());
    } else {
      let err = res.data.err;
      console.log(err);
      dispatch(signupFailed(err));
    }
  } catch (err) {
    console.log(err);
    // dispatch(setAlert("Signup Failed", err.message, 'error'))
    dispatch(signupFailed(err.message));
  }
};

export const getProfile = () => async dispatch => {
  dispatch(getProfileStart());
  try {
    // setAuthToken();
    const res = await axios
      .get(`${REACT_APP_API_URL}/auth/profile`);

    const profile = res.data.data.profile;

    dispatch(getProfileSuccess(profile));
    // dispatch(setAlert(res.data.data.message, 'success'));
  } catch (err) {
    console.log(err);
    const errorMessage = err.response.data.error.message;
    dispatch(setAlert("Unauthorized", errorMessage, 'error'));

    // if (err.message.startsWith('Network')) {
    // dispatch(setAlert(errorMessage, 'danger'))
    // } else {
    // dispatch(setAlert('Your email/vendor ID or password is incorrect. Try again.', 'danger'));
    // }
    dispatch(getProfileFailed("An error occured"));
  }
};


