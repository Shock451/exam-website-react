import { fabClasses } from '@material-ui/core';
import authActionTypes from '../types/auth';

const initialState = {
  token: null,
  role: null,
  email: null,
  mobile: "",
  name: "",


  loggingIn: false,
  loginError: false,

  signingUp: false,
  signupError: false,

  loadingUser: false,
  loadError: null,

  profile: null,
  fetchingProfile: false,
  fetchProfileError: null,

};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {

    // Loading the user
    case authActionTypes.LOAD_USER_START:
      return {
        ...state,
        loadingUser: true,
        loadUserError: null,
      };
    case authActionTypes.LOAD_USER_FAILURE:
      return {
        ...state,
        loadUserError: payload,
        loadingUser: false,
      };
    case authActionTypes.LOAD_USER_SUCCESS:
      return {
        ...state,
        user: payload,
        loadUserError: null,
        loadingUser: false,
      };

    // Log user in 
    case authActionTypes.LOGIN_START:
      return {
        ...state,
        loggingIn: true,
        isAuthenticated: false,
      };
    case authActionTypes.LOGIN_FAILURE:
      return {
        ...state,
        loginError: payload,
        loggingIn: false,
        isAuthenticated: false,
      };
    case authActionTypes.LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loggingIn: false,
        loginError: null,
      };

    // Sign user up
    case authActionTypes.SIGNUP_START:
      return {
        ...state,
        signingUp: true,
      };
    case authActionTypes.SIGNUP_FAILURE:
      return {
        ...state,
        signupError: payload,
        signingUp: false,
      };
    case authActionTypes.SIGNUP_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        signingUp: false,
        signupError: null,
      };

    // Get profile 
    case authActionTypes.GET_PROFILE_START:
      return {
        ...state,
        fetchingProfile: true,
      };
    case authActionTypes.GET_PROFILE_FAILURE:
      return {
        ...state,
        fetchingProfile: false,
        fetchProfileError: payload,
      };
    case authActionTypes.GET_PROFILE_SUCCESS:
      return {
        ...state,
        fetchingProfile: false,
        fetchProfileError: null,
        profile: payload,
      };

    // Log user out
    case authActionTypes.LOGOUT:
      localStorage.removeItem('token');
      return initialState;


    // clear auth errors
    case authActionTypes.CLEAR_ERROR:
      return {
        ...state,
        loginError: null,
        sessionError: null,
        loadError: null,
      };

    case authActionTypes.POST_SIGN_UP_FAILURE:
      localStorage.removeItem('token');
      return {
        ...state,
        error: payload,
        token: null,
        isAuthenticated: false,
        loader: false,
        user: null,
        loginError: true,
        userProfile: null,
        sessionUser: null,
        vendorProfile: null,
      };

    default:
      return state;
  }
};

export default reducer;