import React, {ChangeEvent} from 'react';
import s from './MyPosts.module.css';
import Post from "./Post/Post";
import {
    addPostActionCreator,
    DispatchFunctionType,
    PostType,
    updateNewPostTextActionCreator,
} from "../../../redux/state";

type MyPostsPropsType = {
    posts: PostType[],
    newPostText: string
    dispatch: DispatchFunctionType
}

const MyPosts = (props: MyPostsPropsType) => {
    let postsElements = props.posts.map(p => <Post message={p.message} likesCount={p.likesCount}/>);

    let onPostChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let newPostText = e.currentTarget.value;
        let action = updateNewPostTextActionCreator(newPostText);
        props.dispatch(action);
    }

    let addPost = () => {
        props.dispatch(addPostActionCreator());
    }

    return (
    <div className={s.postsBlock}>
        <h3>My posts</h3>
        <div>
            <div>
                <textarea value={props.newPostText} onChange={onPostChange} />
            </div>
            <div>
                <button onClick={addPost}>add post</button>
            </div>
        </div>
        <div className={s.posts}>
            {postsElements}
        </div>
    </div>
    )
}

export default MyPosts;