import {ActionType} from "./redux-store";

const SET_USERS = 'SET_USERS';
const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';

export type UserType = {
    name: string | null,
    id: number,
    uniqueUrlName: string | null,
    photos: {
        small: string | null,
        large: string | null,
    },
    status: string | null,
    followed: boolean
}

export type UsersPageStateType = {
    users: UserType[]
};

const initialState: UsersPageStateType = {
    users: [],
}

export const usersReducer = (state:UsersPageStateType = initialState, action: ActionType) => {
    switch (action.type) {
        case SET_USERS:
            return {
                ...state,
                users: action.users
            }
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => u.id === action.userId ? {...u, followed: true } : u)
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => u.id === action.userId ? {...u, followed: false } : u)
            }
        default:
            return state;
    }
}

export type setUsersActionType = { type: typeof SET_USERS, users: UserType[] };
export type followActionType = ReturnType<typeof followAC>;
export type unfollowActionType = { type: typeof UNFOLLOW, userId: number };

export const setUsersAC = (users: UserType[]) => ({ type: SET_USERS, users });
export const followAC = (userId: number) => ({ type: FOLLOW, userId }) as const;
export const unfollowAC = (userId: number) => ({ type: UNFOLLOW, userId });