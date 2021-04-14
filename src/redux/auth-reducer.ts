import { ActionType } from "./redux-store";

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
        ...action.data,
        isAuth: true
      }
    default:
      return {
        ...state
      }
  }
}

export type setAuthUserDataActionType = ReturnType<typeof setAuthUserData>;
export const setAuthUserData = (id: number, email: string, login: string) => ({ type: SET_AUTH_USER_DATA, data: { id, email, login } }) as const;