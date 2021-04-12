import axios from 'axios';
import examActionTypes from '../types/exam';
// import setAuthToken from '../../utils/setToken';
// import { setAlert } from './alert';

import { API_URL } from '../../utils/constants';

const fetchExamsStart = (payload) => {
    return {
        type: examActionTypes.FETCH_EXAMS_START,
        payload,
    };
}

const fetchExamsFailed = (payload) => {
    return {
        type: examActionTypes.FETCH_EXAMS_FAILURE,
        payload,
    };
}

const fetchExamsSuccess = (payload) => {
    return {
        type: examActionTypes.FETCH_EXAMS_SUCCESS,
        payload,
    };
}


const startExam = (payload) => {
    return {
        type: examActionTypes.START_EXAM,
        payload,
    };
}

const endExam = () => {
    return {
        type: examActionTypes.END_EXAM,
    };
}

const fetchQuestionsStart = (payload) => {
    return {
        type: examActionTypes.FETCH_QUESTIONS_START,
        payload,
    };
}

const fetchQuestionsFailed = (payload) => {
    return {
        type: examActionTypes.FETCH_QUESTIONS_FAILURE,
        payload,
    };
}

const fetchQuestionsSuccess = (payload) => {
    return {
        type: examActionTypes.FETCH_QUESTIONS_SUCCESS,
        payload,
    };
}


const submitAnswersStart = (payload) => {
    return {
        type: examActionTypes.SUBMIT_ANSWERS_START,
        payload,
    };
}

const submitAnswersFailed = (payload) => {
    return {
        type: examActionTypes.SUBMIT_ANSWERS_FAILURE,
        payload,
    };
}

const submitAnswersSuccess = (payload) => {
    return {
        type: examActionTypes.SUBMIT_ANSWERS_SUCCESS,
        payload,
    };
}


export const submitAnswers = (exam_id, data) => async (dispatch) => {
    const token = localStorage.getItem('token');
    dispatch(submitAnswersStart());
    if (!token) {
        dispatch(submitAnswersFailed("Token not found"));
    } else {
        try {
            const res = await axios.post(`${API_URL}/exams/submit`, {
                exam_id, data
            }, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });
            if (res.status === 200) {
                let questions = res.data.questions;
                console.log(questions);
                dispatch(submitAnswersSuccess(questions));
                dispatch(endExam());
            } else {
                let err = res.data.err;
                console.log(err);
                dispatch(submitAnswersFailed(err));
            }
        } catch (err) {
            console.log(err);
            dispatch(submitAnswersFailed(err.message));
        }
    }
}

export const fetchQuestions = (id) => async (dispatch) => {
    const token = localStorage.getItem('token');
    dispatch(fetchQuestionsStart());
    if (!token) {
        dispatch(fetchQuestionsFailed("Token not found"));
    } else {
        try {
            const res = await axios.get(`${API_URL}/exams/questions?exam_id=${id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });
            if (res.status === 200) {
                let questions = res.data.questions;
                console.log(questions);
                dispatch(fetchQuestionsSuccess(questions));
                dispatch(startExam(id));
            } else {
                let err = res.data.err;
                console.log(err);
                dispatch(fetchQuestionsFailed(err));
            }
        } catch (err) {
            console.log(err);
            dispatch(fetchQuestionsFailed(err.message));
        }
    }
}

export const fetchExams = () => async (dispatch) => {
    const token = localStorage.getItem('token');
    dispatch(fetchExamsStart());
    if (!token) {
        dispatch(fetchExamsFailed("Token not found"));
    } else {
        try {
            const res = await axios.get(`${API_URL}/exams/`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });
            if (res.status === 200) {
                let exams = res.data.exams;
                console.log(exams);
                dispatch(fetchExamsSuccess(exams));
            } else {
                let err = res.data.err;
                console.log(err);
                dispatch(fetchExamsFailed(err));
            }
        } catch (err) {
            console.log(err);
            dispatch(fetchExamsFailed(err.message));
        }
    }
}