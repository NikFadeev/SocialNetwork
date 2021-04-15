import { connect } from 'react-redux';
import { getUsers, follow, unfollow, UserType } from "../../redux/users-reducer";
import { StateType } from "../../redux/redux-store";
import React from "react";
import Users from "./Users";
import Preloader from '../common/Preloader/Preloader';

type PropsType = {
  users: UserType[],
  follow: (id: number) => void,
  unfollow: (id: number) => void,
  getUsers: (currentPage: number, pageSize: number) => void,
  totalUsersCount: number,
  pageSize: number,
  currentPage: number,
  isFetching: boolean,
  followingInProgress: number[]
}

class UsersContainer extends React.Component<PropsType> {
  componentDidMount() {
    this.props.getUsers(this.props.currentPage, this.props.pageSize);
  }

  onPageChanged = (pageNumber: number) => {
    this.props.getUsers(pageNumber, this.props.pageSize);
  }

  render() {
    return <>
      {this.props.isFetching ? <Preloader /> : null}
      <Users totalUsersCount={this.props.totalUsersCount}
        pageSize={this.props.pageSize}
        currentPage={this.props.currentPage}
        onPageChanged={this.onPageChanged}
        users={this.props.users}
        follow={this.props.follow}
        unfollow={this.props.unfollow}
        followingInProgress={this.props.followingInProgress} />
    </>
  }
}
function mapStateToProps(state: StateType) {
  return {
    users: state.usersPage.users,
    totalUsersCount: state.usersPage.totalUsersCount,
    pageSize: state.usersPage.pageSize,
    currentPage: state.usersPage.currentPage,
    isFetching: state.usersPage.isFetching,
    followingInProgress: state.usersPage.followingInProgress
  }
}

export default connect(mapStateToProps, {
  follow,
  unfollow,
  getUsers
})(UsersContainer);