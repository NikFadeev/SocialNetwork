const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY';
const SEND_MESSAGE = 'SEND-MESSAGE';

export type PostType = {
    id: number,
    message: string,
    likesCount: number
}

export type ProfilePageType = {
    posts: Array<PostType>,
    newPostText: string
}

export type DialogType = {
    id: number,
    name: string
}

export type MessageType = {
    id: number,
    message: string
}

export type DialogsPageType = {
    dialogs: DialogType[],
    messages: MessageType[],
    newMessageBody: string
};

export type _StateType = {
    profilePage: ProfilePageType,
    dialogsPage: DialogsPageType
}

export type StoreType = {
    _state: _StateType,
    _callSubscriber: (state: _StateType) => void,
    subscribe: (observer: any) => void,
    getState: () => _StateType,
    dispatch: (action: ActionType) => void
}

export type DispatchFunctionType = (action: ActionType) => void;

let store: StoreType = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, message: 'Hi, how are you?', likesCount: 12},
                {id: 2, message: 'It is my first post', likesCount: 11},
                {id: 3, message: 'Blala', likesCount: 11},
                {id: 4, message: 'Dada', likesCount: 11},
            ],
            newPostText: ''
        },
        dialogsPage: {
            dialogs: [
                {id: 1, name: 'Dimych'},
                {id: 2, name: 'Andrei'},
                {id: 3, name: 'Sveta'},
                {id: 4, name: 'Viktor'},
                {id: 5, name: 'Valera'},
            ],
            messages: [
                {id: 1, message: 'Hi'},
                {id: 2, message: 'How is your it?'},
                {id: 3, message: 'yo'},
            ],
            newMessageBody: ''
        }
    },
    _callSubscriber() {

    },
    subscribe(observer: any) {
        this._callSubscriber = observer;
    },
    getState() {
        return this._state;
    },
    dispatch(action: ActionType) {
        if (action.type === UPDATE_NEW_POST_TEXT) {
            this._state.profilePage.newPostText = action.newText;
            this._callSubscriber(this._state);
        } else if (action.type === ADD_POST) {
            let message = this._state.profilePage.newPostText;
            let newPost = {id: 7, message: message, likesCount: 0};

            this._state.profilePage.newPostText = '';
            this._state.profilePage.posts.push(newPost);
            this._callSubscriber(this._state);
        } else if (action.type === UPDATE_NEW_MESSAGE_BODY) {
            this._state.dialogsPage.newMessageBody = action.body;
            this._callSubscriber(this._state);
        } else if (action.type === SEND_MESSAGE) {
            let body = this._state.dialogsPage.newMessageBody;
            this._state.dialogsPage.newMessageBody = '';

            this._state.dialogsPage.messages.push({id: 4, message: body});
            this._callSubscriber(this._state);
        }
    }
}

export type ActionType =
    updateNewPostActionType
    | addPostActionType
    | updateNewMessageBodyActionType
    | sendMessageActionType;

type updateNewPostActionType = { type: typeof UPDATE_NEW_POST_TEXT, newText: string };
type addPostActionType = { type: typeof ADD_POST };
type updateNewMessageBodyActionType = { type: typeof UPDATE_NEW_MESSAGE_BODY, body: string };
type sendMessageActionType = { type: typeof SEND_MESSAGE };

export const updateNewPostTextActionCreator = (text: string) => ({type: UPDATE_NEW_POST_TEXT, newText: text}) as const;
export const addPostActionCreator = () => ({type: ADD_POST}) as const;

export const updateNewMessageBodyCreator = (body: string) => ({type: UPDATE_NEW_MESSAGE_BODY, body: body}) as const;
export const sendMessageCreator = () => ({type: SEND_MESSAGE}) as const;

// @ts-ignore
window.store = store;

export default store;