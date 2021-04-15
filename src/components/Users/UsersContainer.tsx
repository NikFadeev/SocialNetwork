import { connect } from 'react-redux';
import {
  follow,
  setCurrentPage,
  setUsers,
  setTotalUsersCount,
  toggleIsFetching,
  unfollow,
  UserType
} from "../../redux/users-reducer";
import { StateType } from "../../redux/redux-store";
import React from "react";
import Users from "./Users";
import Preloader from '../common/Preloader/Preloader';
import { usersAPI } from '../../api/api';

type PropsType = {
  users: UserType[],
  follow: (id: number) => void,
  unfollow: (id: number) => void,
  setUsers: (users: UserType[]) => void,
  totalUsersCount: number,
  pageSize: number,
  currentPage: number,
  setCurrentPage: (page: number) => void,
  setTotalUsersCount: (totalCount: number) => void,
  isFetching: boolean,
  toggleIsFetching: (isFetching: boolean) => void
}

class UsersContainer extends React.Component<PropsType> {
  componentDidMount() {
    this.props.toggleIsFetching(true);
    usersAPI.getUsers(this.props.currentPage, this.props.pageSize)
      .then(response => {
        this.props.toggleIsFetching(false);
        this.props.setUsers(response.items);
        this.props.setTotalUsersCount(response.totalCount);
      });
  }

  onPageChanged = (pageNumber: number) => {
    this.props.setCurrentPage(pageNumber);
    usersAPI.getUsers(pageNumber, this.props.pageSize)
      .then(response => {
        this.props.setUsers(response.items);
      });
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
        unfollow={this.props.unfollow} />
    </>
  }
}
function mapStateToProps(state: StateType) {
  return {
    users: state.usersPage.users,
    totalUsersCount: state.usersPage.totalUsersCount,
    pageSize: state.usersPage.pageSize,
    currentPage: state.usersPage.currentPage,
    isFetching: state.usersPage.isFetching
  }
}

export default connect(mapStateToProps, {
  follow,
  unfollow,
  setUsers,
  setCurrentPage,
  setTotalUsersCount,
  toggleIsFetching
})(UsersContainer);

