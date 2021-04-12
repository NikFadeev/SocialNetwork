import React, {ChangeEvent, useRef} from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import {addPostActionCreator, PostType, updateNewPostTextActionCreator} from "../../../redux/profile-reducer";
import {StateType} from "../../../redux/redux-store";
import MyPosts from "./MyPosts";

function mapStateToProps(state: StateType) {
  return {
    posts: state.profilePage.posts,
    newPostText: state.profilePage.newPostText
  }
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    addPost: () => {
      dispatch(addPostActionCreator());
    },
    updateNewPostText: function (text: string) {
      dispatch(updateNewPostTextActionCreator(text));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyPosts);