import React, {ChangeEvent, useRef} from 'react';
import {addPostActionCreator, PostType, updateNewPostTextActionCreator} from "../../../redux/profile-reducer";
import {StoreType} from "../../../redux/redux-store";
import MyPosts from "./MyPosts";

type MyPostsPropsType = {
    store: StoreType
}

const MyPostsContainer = (props: MyPostsPropsType) => {
    let state = props.store.getState();

    let addPost = () => {
        props.store.dispatch(addPostActionCreator());
    }

    let onPostChange = (text: string) => {
        props.store.dispatch(updateNewPostTextActionCreator(text));
    }

    return (
        <MyPosts posts={state.profilePage.posts}
                 updateNewPostText={onPostChange}
                 addPost={addPost}
                 newPostText={state.profilePage.newPostText}/>
    )
}

export default MyPostsContainer;