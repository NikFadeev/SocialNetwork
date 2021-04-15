import { createStore, combineReducers, applyMiddleware } from 'redux';
import { addPostActionType, profileReducer, setUserProfileActionType, updateNewPostActionType } from "./profile-reducer";
import { dialogsReducer, sendMessageActionType, updateNewMessageBodyActionType } from "./dialogs-reducer";
import { followActionType, setCurrentPageActionType, setUsersActionType, setUsersTotalCountActionType, toggleFollowingProgressActionType, toggleIsFetchingActionType, unfollowActionType, usersReducer } from './users-reducer';
import { authReducer, setAuthUserDataActionType } from './auth-reducer';
import thunkMiddleware from 'redux-thunk';

export type ActionType =
  updateNewPostActionType
  | addPostActionType
  | updateNewMessageBodyActionType
  | sendMessageActionType
  | setUsersActionType
  | followActionType
  | unfollowActionType
  | setCurrentPageActionType
  | setUsersTotalCountActionType
  | toggleIsFetchingActionType
  | setUserProfileActionType
  | setAuthUserDataActionType
  | toggleFollowingProgressActionType;


const reducer = combineReducers({
  dialogsPage: dialogsReducer,
  profilePage: profileReducer,
  usersPage: usersReducer,
  authPage: authReducer
})

let store = createStore(reducer, applyMiddleware(thunkMiddleware));

export type StoreType = typeof store;
export type StateType = ReturnType<typeof store.getState>;

export default store;
