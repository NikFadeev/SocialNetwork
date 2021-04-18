import React, {ChangeEvent, useRef} from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import {addPostActionCreator, PostType } from "../../../redux/profile-reducer";
import {StateType} from "../../../redux/redux-store";
import MyPosts from "./MyPosts";

function mapStateToProps(state: StateType) {
  return {
    posts: state.profilePage.posts,
  }
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    addPost: (postMessage: string) => {
      dispatch(addPostActionCreator(postMessage));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyPosts);