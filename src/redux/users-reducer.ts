import { ActionType } from "./redux-store";

const SET_USERS = 'SET_USERS';
const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';

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
  users: UserType[],
  pageSize: number,
  totalUsersCount: number,
  currentPage: number,
  isFetching: boolean
};

const initialState: UsersPageStateType = {
  users: [],
  pageSize: 5,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false
}

export const usersReducer = (state: UsersPageStateType = initialState, action: ActionType) => {
  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        users: action.users
      }
    case FOLLOW:
      return {
        ...state,
        users: state.users.map(u => u.id === action.userId ? { ...u, followed: true } : u)
      }
    case UNFOLLOW:
      return {
        ...state,
        users: state.users.map(u => u.id === action.userId ? { ...u, followed: false } : u)
      }
    case SET_CURRENT_PAGE: {
      return {
        ...state,
        currentPage: action.currentPage
      }
    }
    case SET_TOTAL_USERS_COUNT: {
      return {
        ...state,
        totalUsersCount: action.count
      };
    }
    case TOGGLE_IS_FETCHING: {
      return { ...state, isFetching: action.isFetching };
    }
    default:
      return state;
  }
}

export type setUsersActionType = { type: typeof SET_USERS, users: UserType[] };
export type followActionType = ReturnType<typeof follow>;
export type unfollowActionType = { type: typeof UNFOLLOW, userId: number };
export type setCurrentPageActionType = ReturnType<typeof setCurrentPage>;
export type setUsersTotalCountActionType = ReturnType<typeof setTotalUsersCount>;
export type toggleIsFetchingActionType = ReturnType<typeof toggleIsFetching>;

export const setUsers = (users: UserType[]) => ({ type: SET_USERS, users });
export const follow = (userId: number) => ({ type: FOLLOW, userId }) as const;
export const unfollow = (userId: number) => ({ type: UNFOLLOW, userId })
export const setCurrentPage = (currentPage: number) => ({ type: SET_CURRENT_PAGE, currentPage }) as const;
export const setTotalUsersCount = (totalUsersCount: number) => ({ type: SET_TOTAL_USERS_COUNT, count: totalUsersCount }) as const;
export const toggleIsFetching = (isFetching: boolean) => ({ type: TOGGLE_IS_FETCHING, isFetching }) as const;

