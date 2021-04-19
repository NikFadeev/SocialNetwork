import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { authAPI } from "../api/api";
import { ActionType, StateType } from "./redux-store";

const SET_AUTH_USER_DATA = 'SET_AUTH_USER_DATA';

type AuthStateType = {
  id: number | null,
  email: string | null,
  login: string | null,
  isAuth: boolean
}

const initialState: AuthStateType = {
  id: null,
  email: null,
  login: null,
  isAuth: false
}

export function authReducer(state: AuthStateType = initialState, action: ActionType) {
  switch (action.type) {
    case SET_AUTH_USER_DATA:
      return {
        ...state,
        ...action.payload,
      }
    default:
      return {
        ...state
      }
  }
}

export type setAuthUserDataActionType = ReturnType<typeof setAuthUserData>;
export const setAuthUserData = (id: number | null, email: string | null, login: string | null, isAuth: boolean) => ({ type: SET_AUTH_USER_DATA, payload: { id, email, login, isAuth } }) as const;

type ThunkType = ThunkAction<void, StateType, unknown, ActionType>;

export const getAuthUserData = (): ThunkType => (dispatch) => {
  authAPI.me()
    .then((response) => {
      if (response.data.resultCode === 0) {
        const { id, email, login } = response.data.data;
        dispatch(setAuthUserData(id, email, login, true));
      }
    })
}

export const login = (email: string, password: string, rememberMe: boolean): ThunkType => (dispatch) => {
  authAPI.login(email, password, rememberMe)
    .then(response => {
      if (response.data.resultCode === 0) {
        dispatch(getAuthUserData());
      }
    })
}

export const logout = (): ThunkType => (dispatch) => {
  authAPI.logout()
    .then(response => {
      if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
      }
    })
}