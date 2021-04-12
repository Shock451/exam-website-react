import { combineReducers } from 'redux';
import authActionTypes from '../types/auth';
import Auth from './auth';
import Alert from './alert';
import Admin from './admin';
import Exam from './exam';


const appReducer = combineReducers({
  Alert,
  Auth,
  Admin,
  Exam,
});

const rootReducer = (state, action) => {
  if (action.type === authActionTypes.LOGOUT) {
    state = undefined;
  }

  return appReducer(state, action);
}

export default rootReducer;
