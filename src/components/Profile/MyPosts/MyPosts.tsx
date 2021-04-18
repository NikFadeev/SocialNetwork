import React, { ChangeEvent, useRef } from 'react';
import s from './MyPosts.module.css';
import Post from "./Post/Post";
import { PostType } from "../../../redux/profile-reducer";
import { Field, InjectedFormProps, reduxForm } from 'redux-form';

type MyPostsPropsType = {
  posts: PostType[],
  addPost: (postMessage: string) => void,
}

const MyPosts = (props: MyPostsPropsType) => {
  let postsElements = props.posts.map(p => <Post message={p.message} likesCount={p.likesCount} />);

  let handleSubmit = (formData: { postMessage?: string}) => {
    if (formData.postMessage) {
      props.addPost(formData.postMessage);
    }
  }

  return (
    <div className={s.postsBlock}>
      <h3>My posts</h3>
      <div className={s.posts}>
        <MyPostsFormRedux onSubmit={handleSubmit}/>
        {postsElements}
      </div>
    </div>
  )
}

function MyPostsForm(props: InjectedFormProps) {
  return <form onSubmit={props.handleSubmit}>
    <div>
      <Field component={"textarea"} name="postMessage" />
    </div>
    <div>
      <button>add post</button>
    </div>
  </form>
}

const MyPostsFormRedux = reduxForm({ form: "MyPosts" })(MyPostsForm);

export default MyPosts;;