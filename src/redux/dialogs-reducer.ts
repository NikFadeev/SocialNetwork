import {ActionType} from "./redux-store";

const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY';
const SEND_MESSAGE = 'SEND-MESSAGE';

export type DialogType = {
    id: number,
    name: string
}

export type MessageType = {
    id: number,
    message: string
}

export type DialogsPageStateType = {
    dialogs: DialogType[],
    messages: MessageType[],
    newMessageBody: string
};

const initialState: DialogsPageStateType = {
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

export const dialogsReducer = (state:DialogsPageStateType = initialState, action: ActionType) => {
    switch (action.type) {
        case UPDATE_NEW_MESSAGE_BODY:
            state.newMessageBody = action.body;
            return state;
        case SEND_MESSAGE:
            let body = state.newMessageBody;
            state.newMessageBody = '';
            state.messages.push({id: 4, message: body});
            return state;
        default:
            return state;
    }
}

export type updateNewMessageBodyActionType = { type: typeof UPDATE_NEW_MESSAGE_BODY, body: string };
export type sendMessageActionType = { type: typeof SEND_MESSAGE };

export const updateNewMessageBodyCreator = (body: string) => ({type: UPDATE_NEW_MESSAGE_BODY, body: body}) as const;
export const sendMessageCreator = () => ({type: SEND_MESSAGE}) as const;