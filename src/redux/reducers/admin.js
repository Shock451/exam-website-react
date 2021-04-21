import adminActionTypes from '../types/admin';

const initialState = {
    users: [],
};

const reducer = (state = initialState, { type, payload }) => {
    switch (type) {

        // Loading the user
        case adminActionTypes.FETCH_USERS_START:
            return {
                ...state,
                fetchingUsers: true,
                fetchUsersError: null,
            };
        case adminActionTypes.FETCH_USERS_FAILURE:
            return {
                ...state,
                fetchUsersError: payload,
                fetchingUsers: false,
            };
        case adminActionTypes.FETCH_USERS_SUCCESS:
            return {
                ...state,
                users: payload,
                fetchUsersError: null,
                fetchingUsers: false,
            };

        case adminActionTypes.DELETE_USER_START:
            return {
                ...state,
                deletingUser: true,
                deleteUserError: null,
            };
        case adminActionTypes.DELETE_USER_FAILURE:
            return {
                ...state,
                deleteUserError: payload,
                deletingUser: false,
            };
        case adminActionTypes.DELETE_USER_SUCCESS:
            let _users = [...state.users];
            _users = _users.filter(user => user.id !== payload);

            return {
                ...state,
                users: _users,
                deleteUserError: null,
                deletingUser: false,
            };

        case adminActionTypes.ADD_TEACHER_START:
            return {
                ...state,
                addingTeacher: true,
                addTeacherError: null,
            };
        case adminActionTypes.ADD_TEACHER_FAILURE:
            return {
                ...state,
                addTeacherError: payload,
                addingTeacher: false,
            };
        case adminActionTypes.ADD_TEACHER_SUCCESS:
            return {
                ...state,
                users: [...state.users, payload],
                addTeacherError: null,
                addingTeacher: false,
            };

        default:
            return state;
    }
};

export default reducer;