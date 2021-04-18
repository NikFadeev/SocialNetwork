import { Dispatch } from "redux";
import { profileAPI, usersAPI } from "../api/api";
import { ActionType } from "./redux-store";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';

export type PostType = {
  id: number,
  message: string,
  likesCount: number
}

export type ProfileType = {
  userId: number,
  lookingForAJob: boolean,
  fullName: string,
  contacts: {
    github: string,
    vk: string,
  },
  photos: {
    small: string,
    large: string
  }
}

export type ProfilePageStateType = {
  posts: Array<PostType>,
  profile: ProfileType | null,
  status: string
}

const initialState: ProfilePageStateType = {
  posts: [
    { id: 1, message: 'Hi, how are you?', likesCount: 12 },
    { id: 2, message: 'It is my first post', likesCount: 11 },
    { id: 3, message: 'Blala', likesCount: 11 },
    { id: 4, message: 'Dada', likesCount: 11 },
  ],
  profile: null,
  status: ''
}

export const profileReducer = (state: ProfilePageStateType = initialState, action: ActionType) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        posts: [...state.posts, { id: 7, message: action.postMessage, likesCount: 0 }]
      }
    case SET_USER_PROFILE:
      return {
        ...state,
        profile: action.profile
      }
    case SET_STATUS:
      return {
        ...state,
        status: action.status
      }
    default:
      return state;
  }
}

export type addPostActionType = { type: typeof ADD_POST, postMessage: string};
export type setUserProfileActionType = ReturnType<typeof setUserProfile>;
export type setStatusActionType = ReturnType<typeof setStatus>;

export const addPostActionCreator = (postMessage: string) => ({ type: ADD_POST , postMessage }) as const;

export const setUserProfile = (profile: ProfileType) => ({ type: SET_USER_PROFILE, profile }) as const;
export const getUserProfile = (userId: number) => (dispatch: Dispatch) => {
  profileAPI.getProfile(userId)
    .then(data => dispatch(setUserProfile(data)));
}

export const setStatus = (status: string) => ({ type: SET_STATUS, status }) as const;

export const getStatus = (userId: number) => (dispatch: Dispatch) => {
  profileAPI.getStatus(userId)
    .then(data => {
      dispatch(setStatus(data));
    })
}

export const updateStatus = (status: string) => (dispatch: Dispatch) => {
  profileAPI.updateStatus(status)
    .then(response => {
      if (response.data.resultCode === 0) {
        dispatch(setStatus(status));
      }
    })
}