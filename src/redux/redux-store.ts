import { createStore, combineReducers } from 'redux';
import { addPostActionType, profileReducer, updateNewPostActionType } from "./profile-reducer";
import { dialogsReducer, sendMessageActionType, updateNewMessageBodyActionType } from "./dialogs-reducer";
import { followActionType, setUsersActionType, unfollowActionType, usersReducer } from './users-reducer';

export type ActionType =
  updateNewPostActionType
  | addPostActionType
  | updateNewMessageBodyActionType
  | sendMessageActionType
  | setUsersActionType
  | followActionType
  | unfollowActionType;

const reducer = combineReducers({
  dialogsPage: dialogsReducer,
  profilePage: profileReducer,
  usersPage: usersReducer
})

let store = createStore(reducer);

export type StoreType = typeof store;
export type StateType = ReturnType<typeof store.getState>;

export default store;
