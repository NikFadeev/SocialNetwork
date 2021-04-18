import { ActionType } from "./redux-store";

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
};

const initialState: DialogsPageStateType = {
  dialogs: [
    { id: 1, name: 'Dimych' },
    { id: 2, name: 'Andrei' },
    { id: 3, name: 'Sveta' },
    { id: 4, name: 'Viktor' },
    { id: 5, name: 'Valera' },
  ],
  messages: [
    { id: 1, message: 'Hi' },
    { id: 2, message: 'How is your it?' },
    { id: 3, message: 'yo' },
  ]
}

export const dialogsReducer = (state: DialogsPageStateType = initialState, action: ActionType) => {
  switch (action.type) {
    case SEND_MESSAGE:
      return {
        ...state,
        newMessageBody: '',
        messages: [...state.messages, { id: 4, message: action.message }]
      }
    default:
      return state;
  }
}

export type sendMessageActionType = { type: typeof SEND_MESSAGE, message: string };
export const sendMessageCreator = (message: string) => ({ type: SEND_MESSAGE, message }) as const;