import axios from "axios";
import { Dispatch } from "redux";
import { usersAPI } from "../api/api";
import { ActionType } from "./redux-store";

const SET_USERS = 'SET_USERS';
const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';

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
  isFetching: boolean,
  followingInProgress: number[]
};

const initialState: UsersPageStateType = {
  users: [],
  pageSize: 5,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: []
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
    case TOGGLE_IS_FOLLOWING_PROGRESS:
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter(id => id !== action.userId)
      }
    default:
      return state;
  }
}

export type setUsersActionType = { type: typeof SET_USERS, users: UserType[] };
export type followActionType = ReturnType<typeof followSuccess>;
export type unfollowActionType = { type: typeof UNFOLLOW, userId: number };
export type setCurrentPageActionType = ReturnType<typeof setCurrentPage>;
export type setUsersTotalCountActionType = ReturnType<typeof setTotalUsersCount>;
export type toggleIsFetchingActionType = ReturnType<typeof toggleIsFetching>;
export type toggleFollowingProgressActionType = ReturnType<typeof toggleFollowingProgress>;

export const setUsers = (users: UserType[]) => ({ type: SET_USERS, users });
export const followSuccess = (userId: number) => ({ type: FOLLOW, userId }) as const;
export const unfollowSuccess = (userId: number) => ({ type: UNFOLLOW, userId })
export const setCurrentPage = (currentPage: number) => ({ type: SET_CURRENT_PAGE, currentPage }) as const;
export const setTotalUsersCount = (totalUsersCount: number) => ({ type: SET_TOTAL_USERS_COUNT, count: totalUsersCount }) as const;
export const toggleIsFetching = (isFetching: boolean) => ({ type: TOGGLE_IS_FETCHING, isFetching }) as const;
export const toggleFollowingProgress = (isFetching: boolean, userId: number) => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId }) as const;

export const getUsers = (currentPage: number, pageSize: number) => (dispatch: Dispatch) => {
  dispatch(toggleIsFetching(true));
  usersAPI.getUsers(currentPage, pageSize)
    .then(response => {
      dispatch(toggleIsFetching(false));
      dispatch(setUsers(response.items));
      dispatch(setCurrentPage(currentPage));
      dispatch(setTotalUsersCount(response.totalCount));
    });
}

export const unfollow = (userId: number) => (dispatch: Dispatch) => {
  dispatch(toggleFollowingProgress(true, userId));
  usersAPI.unfollow(userId)
    .then(data => {
      if (data.resultCode === 0) {
        dispatch(unfollowSuccess(userId));
        dispatch(toggleFollowingProgress(false, userId));
      }
    })
}

export const follow = (userId: number) => (dispatch: Dispatch) => {
  dispatch(toggleFollowingProgress(true, userId));
  usersAPI.follow(userId)
    .then(data => {
      if (data.resultCode === 0) {
        dispatch(followSuccess(userId));
        dispatch(toggleFollowingProgress(false, userId));
      }
    })
}