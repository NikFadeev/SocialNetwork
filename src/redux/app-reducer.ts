import { ThunkAction } from "redux-thunk";
import { getAuthUserData } from "./auth-reducer";
import { ActionType, StateType } from "./redux-store";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

type AppStateType = {
  initialized: boolean
}

const initialState: AppStateType = {
  initialized: false
}

export function appReducer(state: AppStateType = initialState, action: ActionType) {
  switch (action.type) {
    case INITIALIZED_SUCCESS:
      return {
        ...state,
        initialized: true
      }
    default:
      return state;
  }
}

export type initializedSuccessActionType = ReturnType<typeof initializedSuccess>;
export const initializedSuccess = () => ({ type: INITIALIZED_SUCCESS }) as const;

type ThunkType = ThunkAction<void, StateType, unknown, ActionType>;

export const initializeApp = (): ThunkType => (dispatch) => {
  dispatch(getAuthUserData())
    .then(() => {
      dispatch(initializedSuccess());
    })
}