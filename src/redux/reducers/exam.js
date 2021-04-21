import examActionTypes from '../types/exam';

const initialState = {
    exams: [],
    questions: {},
    examInProgress: null,
    fetchingQuestions: false,

    records: [],
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

        case examActionTypes.CREATE_EXAM_START:
            return {
                ...state,
                creatingExam: true,
                createExamError: null,
            };
        case examActionTypes.CREATE_EXAM_FAILURE:
            return {
                ...state,
                createExamError: payload,
                creatingExam: false,
            };
        case examActionTypes.CREATE_EXAM_SUCCESS:
            return {
                ...state,
                createExamError: null,
                creatingExam: false,
            };

        case examActionTypes.DELETE_EXAM_START:
            return {
                ...state,
                deletingExam: true,
                deleteExamError: null,
            };
        case examActionTypes.DELETE_EXAM_FAILURE:
            return {
                ...state,
                deleteExamError: payload,
                deletingExam: false,
            };
        case examActionTypes.DELETE_EXAM_SUCCESS:
            let _exams = [...state.exams];
            _exams = _exams.filter(exam => exam.id !== payload);

            return {
                ...state,
                exams: _exams,
                deleteExamError: null,
                deletingExam: false,
            };

        case examActionTypes.FETCH_RECORDS_START:
            return {
                ...state,
                fetchingRecords: true,
                fetchRecordsError: null,
            };
        case examActionTypes.FETCH_RECORDS_FAILURE:
            return {
                ...state,
                fetchRecordsError: payload,
                fetchingRecords: false,
            };
        case examActionTypes.FETCH_RECORDS_SUCCESS:
            return {
                ...state,
                records: payload,
                fetchRecordsError: null,
                fetchingRecords: false,
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