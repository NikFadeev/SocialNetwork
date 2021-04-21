import { createStore, combineReducers, applyMiddleware } from 'redux';
import { addPostActionType, profileReducer, savePhotoSuccessActionType, setStatusActionType, setUserProfileActionType } from "./profile-reducer";
import { dialogsReducer, sendMessageActionType } from "./dialogs-reducer";
import { followActionType, setCurrentPageActionType, setUsersActionType, setUsersTotalCountActionType, toggleFollowingProgressActionType, toggleIsFetchingActionType, unfollowActionType, usersReducer } from './users-reducer';
import { authReducer, setAuthUserDataActionType } from './auth-reducer';
import thunkMiddleware from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
import { initializedSuccessActionType, appReducer } from './app-reducer';

export type ActionType =
  | addPostActionType
  | sendMessageActionType
  | setUsersActionType
  | followActionType
  | unfollowActionType
  | setCurrentPageActionType
  | setUsersTotalCountActionType
  | toggleIsFetchingActionType
  | setUserProfileActionType
  | setAuthUserDataActionType
  | toggleFollowingProgressActionType
  | setStatusActionType
  | initializedSuccessActionType
  | savePhotoSuccessActionType;


const reducer = combineReducers({
  dialogsPage: dialogsReducer,
  profilePage: profileReducer,
  usersPage: usersReducer,
  authPage: authReducer,
  form: formReducer,
  appPage: appReducer
})



let store = createStore(reducer, applyMiddleware(thunkMiddleware));

export type StoreType = typeof store;
export type StateType = ReturnType<typeof store.getState>;

export default store;

// @ts-ignore
window.st = store;
