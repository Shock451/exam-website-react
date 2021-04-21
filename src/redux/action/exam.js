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

const deleteExamStart = (payload) => {
    return {
        type: examActionTypes.DELETE_EXAM_START,
        payload,
    };
}

const deleteExamFailed = (payload) => {
    return {
        type: examActionTypes.DELETE_EXAM_FAILURE,
        payload,
    };
}

const deleteExamSuccess = (payload) => {
    return {
        type: examActionTypes.DELETE_EXAM_SUCCESS,
        payload,
    };
}


const fetchRecordsStart = (payload) => {
    return {
        type: examActionTypes.FETCH_RECORDS_START,
        payload,
    };
}

const fetchRecordsFailed = (payload) => {
    return {
        type: examActionTypes.FETCH_RECORDS_FAILURE,
        payload,
    };
}

const fetchRecordsSuccess = (payload) => {
    return {
        type: examActionTypes.FETCH_RECORDS_SUCCESS,
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


const submitAnswersStart = () => {
    return {
        type: examActionTypes.SUBMIT_ANSWERS_START,
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

const createExamStart = (payload) => {
    return {
        type: examActionTypes.CREATE_EXAM_START,
    };
}

const createExamFailed = (payload) => {
    return {
        type: examActionTypes.CREATE_EXAM_FAILURE,
        payload,
    };
}

const createExamSuccess = (payload) => {
    return {
        type: examActionTypes.CREATE_EXAM_SUCCESS,
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
                dispatch(submitAnswersSuccess());
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

export const fetchExams = (all = true) => async (dispatch) => {
    const token = localStorage.getItem('token');
    dispatch(fetchExamsStart());
    if (!token) {
        dispatch(fetchExamsFailed("Token not found"));
    } else {
        try {
            const endpoint = all ? 'exams' : 'exams/me';
            const res = await axios.get(`${API_URL}/${endpoint}`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });
            if (res.status === 200) {
                let exams = res.data.exams;
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

export const fetchRecords = () => async (dispatch) => {
    const token = localStorage.getItem('token');
    dispatch(fetchRecordsStart());
    if (!token) {
        dispatch(fetchRecordsFailed("Token not found"));
    } else {
        try {
            const res = await axios.get(`${API_URL}/exams/history`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });
            if (res.status === 200) {
                let records = res.data.history;
                dispatch(fetchRecordsSuccess(records));
            } else {
                let err = res.data.err;
                console.log(err);
                dispatch(fetchRecordsFailed(err));
            }
        } catch (err) {
            console.log(err);
            dispatch(fetchRecordsFailed(err.message));
        }
    }
}

export const deleteExam = (id) => async (dispatch) => {
    const token = localStorage.getItem('token');
    dispatch(deleteExamStart());
    if (!token) {
        dispatch(deleteExamFailed("Token not found"));
    } else {
        try {
            const res = await axios.delete(`${API_URL}/exams/${id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });
            if (res.status === 200) {
                dispatch(deleteExamSuccess(id));
                // dispatch(loadExam());
            } else {
                let err = res.data.err;
                console.log(err);
                dispatch(deleteExamFailed(err));
            }
        } catch (err) {
            console.log(err);
            dispatch(deleteExamFailed(err.message));
        }
    }
}


export const createExam = (data) => async (dispatch) => {
    const token = localStorage.getItem('token');
    dispatch(createExamStart());
    if (!token) {
        dispatch(createExamFailed("Token not found"));
    } else {
        try {
            const res = await axios.post(`${API_URL}/exams`, data, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });
            if (res.status === 200) {
                dispatch(createExamSuccess());
            } else {
                let err = res.data.err;
                console.log(err);
                dispatch(createExamFailed(err));
            }
        } catch (err) {
            console.log(err);
            dispatch(createExamFailed(err.message));
        }
    };
}