import { createStore, combineReducers } from 'redux';
import { addPostActionType, profileReducer, setUserProfileActionType, updateNewPostActionType } from "./profile-reducer";
import { dialogsReducer, sendMessageActionType, updateNewMessageBodyActionType } from "./dialogs-reducer";
import { followActionType, setCurrentPageActionType, setUsersActionType, setUsersTotalCountActionType, toggleFollowingProgressActionType, toggleIsFetchingActionType, unfollowActionType, usersReducer } from './users-reducer';
import { authReducer, setAuthUserDataActionType } from './auth-reducer';

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

let store = createStore(reducer);

export type StoreType = typeof store;
export type StateType = ReturnType<typeof store.getState>;

export default store;
