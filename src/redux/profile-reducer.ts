import {ActionType} from "./redux-store";

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';

export type PostType = {
    id: number,
    message: string,
    likesCount: number
}

export type ProfilePageStateType = {
    posts: Array<PostType>,
    newPostText: string
}

const initialState: ProfilePageStateType = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 12},
        {id: 2, message: 'It is my first post', likesCount: 11},
        {id: 3, message: 'Blala', likesCount: 11},
        {id: 4, message: 'Dada', likesCount: 11},
    ],
    newPostText: ''
}

export const profileReducer = (state: ProfilePageStateType = initialState, action: ActionType) => {
    switch (action.type) {
        case UPDATE_NEW_POST_TEXT:
            state.newPostText = action.newText;
            return state;
        case ADD_POST:
            let message = state.newPostText;
            let newPost = {id: 7, message: message, likesCount: 0};

            state.newPostText = '';
            state.posts.push(newPost);
            return state;
        default:
            return state;
    }
}

export type updateNewPostActionType = { type: typeof UPDATE_NEW_POST_TEXT, newText: string };
export type addPostActionType = { type: typeof ADD_POST };

export const updateNewPostTextActionCreator = (text: string) => ({type: UPDATE_NEW_POST_TEXT, newText: text}) as const;
export const addPostActionCreator = () => ({type: ADD_POST}) as const;
