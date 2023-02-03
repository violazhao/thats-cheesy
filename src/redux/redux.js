import { configureStore } from '@reduxjs/toolkit';

// reducer
const initialState = {
    user_id: "no user"
};

const login = function (state = initialState, action) {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                user_id: action.newUserId
            };
        case "LOGOUT":
            return {
                ...state,
                user_id: "no user"
            };
        default: 
            return state;
    }
}

// actions
export const loginAction = (user_id) => {
    return {
        type: "LOGIN",
        newUserId: user_id
    };
};

export const logoutAction = () => {
    return {
        type: "LOGOUT",
        newUserId: "no user"
    };
};

// store
export const store = configureStore({reducer: login});
