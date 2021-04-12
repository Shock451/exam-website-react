import examActionTypes from '../types/exam';

const initialState = {
    exams: [],
    questions: {},
    examInProgress: null,
    fetchingQuestions: false,
};

const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case examActionTypes.FETCH_EXAMS_START:
            return {
                ...state,
                fetchingExams: true,
                fetchExamsError: null,
            };
        case examActionTypes.FETCH_EXAMS_FAILURE:
            return {
                ...state,
                fetchExamsError: payload,
                fetchingExams: false,
            };
        case examActionTypes.FETCH_EXAMS_SUCCESS:
            return {
                ...state,
                exams: payload,
                fetchExamsError: null,
                fetchingExams: false,
            };

        case examActionTypes.FETCH_QUESTIONS_START:
            return {
                ...state,
                fetchingQuestions: true,
                fetchQuestionsError: null,
            };
        case examActionTypes.FETCH_QUESTIONS_FAILURE:
            return {
                ...state,
                fetchQuestionsError: payload,
                fetchingQuestions: false,
            };
        case examActionTypes.FETCH_QUESTIONS_SUCCESS:
            return {
                ...state,
                questions: payload,
                fetchQuestionsError: null,
                fetchingQuestions: false,
            };


        case examActionTypes.SUBMIT_ANSWERS_START:
            return {
                ...state,
                submittingAnswers: true,
                submitAnswersError: null,
            };
        case examActionTypes.SUBMIT_ANSWERS_FAILURE:
            return {
                ...state,
                submitAnswersError: payload,
                submittingAnswers: false,
            };
        case examActionTypes.SUBMIT_ANSWERS_SUCCESS:
            return {
                ...state,
                questions: payload,
                submitAnswersError: null,
                submittingAnswers: false,
            };

        case examActionTypes.START_EXAM:
            return {
                ...state,
                examInProgress: payload,
            };
        case examActionTypes.END_EXAM:
            return {
                ...state,
                examInProgress: null,
            };

        default:
            return state;
    }
};

export default reducer;