import { connect } from 'react-redux';
import {
  followAC,
  setCurrentPageAC,
  setUsersAC,
  setUsersTotalCountAC,
  unfollowAC,
  UserType
} from "../../redux/users-reducer";
import { StateType } from "../../redux/redux-store";
import { Dispatch } from "redux";
import React from "react";
import axios from "axios";
import Users from "./Users";

type PropsType = {
  users: UserType[],
  follow: (id: number) => void,
  unfollow: (id: number) => void,
  setUsers: (users: UserType[]) => void,
  totalUsersCount: number,
  pageSize: number,
  currentPage: number,
  setCurrentPage: (page: number) => void,
  setTotalUsersCount: (totalCount: number) => void
}

class UsersContainer extends React.Component<PropsType> {
  componentDidMount() {
    axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
      .then(response => {
        this.props.setUsers(response.data.items);
        this.props.setTotalUsersCount(response.data.totalCount);
      });
  }

  onPageChanged = (pageNumber: number) => {
    this.props.setCurrentPage(pageNumber);
    axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
      .then(response => {
        this.props.setUsers(response.data.items);
      });
  }

  render() {
    return <Users totalUsersCount={this.props.totalUsersCount}
      pageSize={this.props.pageSize}
      currentPage={this.props.currentPage}
      onPageChanged={this.onPageChanged}
      users={this.props.users}
      follow={this.props.follow}
      unfollow={this.props.unfollow} />
  }
}
function mapStateToProps(state: StateType) {
  return {
    users: state.usersPage.users,
    totalUsersCount: state.usersPage.totalUsersCount,
    pageSize: state.usersPage.pageSize,
    currentPage: state.usersPage.currentPage
  }
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    follow: (userId: number) => {
      dispatch(followAC(userId));
    },
    unfollow: (userId: number) => {
      dispatch(unfollowAC(userId));
    },
    setUsers: (users: UserType[]) => {
      dispatch(setUsersAC(users));
    },
    setCurrentPage: (page: number) => {
      dispatch(setCurrentPageAC(page));
    },
    setTotalUsersCount: (totalCount: number) => {
      dispatch(setUsersTotalCountAC(totalCount));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);
