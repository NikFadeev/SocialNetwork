import {createStore, combineReducers} from 'redux';
import {addPostActionType, profileReducer, updateNewPostActionType} from "./profile-reducer";
import {dialogsReducer, sendMessageActionType, updateNewMessageBodyActionType} from "./dialogs-reducer";

export type ActionType =
    updateNewPostActionType
    | addPostActionType
    | updateNewMessageBodyActionType
    | sendMessageActionType;

const reducer = combineReducers({
    dialogsPage: dialogsReducer,
    profilePage: profileReducer
})

let store = createStore(reducer);

export type StoreType = typeof store;
export type StateType = ReturnType<typeof store.getState>;

export default store;
