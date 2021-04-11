import React, {ChangeEvent, useRef} from 'react';
import s from './MyPosts.module.css';
import Post from "./Post/Post";
import {PostType} from "../../../redux/profile-reducer";

type MyPostsPropsType = {
    posts: PostType[],
    updateNewPostText: (text: string) => void,
    addPost: () => void,
    newPostText: string
}

const MyPosts = (props: MyPostsPropsType) => {
    let postsElements = props.posts.map(p => <Post message={p.message} likesCount={p.likesCount}/>);

    let ref = useRef<HTMLTextAreaElement>(null);

    let onPostChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        if (ref.current) {
            let newPostText = ref.current.value;
            props.updateNewPostText(newPostText);
        }
    }

    let addPost = () => {
        props.addPost();
    }

    return (
    <div className={s.postsBlock}>
        <h3>My posts</h3>
        <div>
            <div>
                <textarea value={props.newPostText} onChange={onPostChange} ref={ref}/>
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

export default MyPosts;;