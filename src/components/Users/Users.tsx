import React from 'react';
import userPhoto from '../../assets/images/defaultLogo.jpg';
import css from './Users.module.css';
import axios from "axios";
import { followAC, setUsersAC, unfollowAC, UserType } from "../../redux/users-reducer";
import { connect } from 'react-redux';
import { StateType } from '../../redux/redux-store';
import { Dispatch } from 'redux';

type PropsType = {
  users: UserType[],
  follow: (id: number) => void,
  unfollow: (id: number) => void,
  setUsers: (users: UserType[]) => void
}

class Users extends React.Component<PropsType> {
  constructor(props: PropsType) {
    super(props);
    axios.get('https://social-network.samuraijs.com/api/1.0/users')
      .then(response => {
        this.props.setUsers(response.data.items);
      });
  }

  render() {
    return <div>
      {
        this.props.users.map(u => <div key={u.id}>
          <span>
            <div>
              {/*<img src={u.photos.small != null ? u.photos.small : userPhoto} className={css.userPhoto}/>*/}
              <img src={userPhoto} className={css.userPhoto} />
            </div>
            <div>
              {u.followed
                ? <button onClick={() => {
                  this.props.unfollow(u.id)
                }}>Unfollow</button>
                : <button onClick={() => {
                  this.props.follow(u.id)
                }}>Follow</button>
              }
            </div>
          </span>
          <span>
            <div>{u.name}</div>
            <div>{u.status}</div>
          </span>
          <span>
            <div>{"u.location.country"}</div>
            <div>{"u.location.city"}</div>
          </span>
        </div>)
      }
    </div>
  }
}

function mapStateToProps(state: StateType) {
  return {
    users: state.usersPage.users
  }
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    follow: function (userId: number) {
      dispatch(followAC(userId));
    },
    unfollow: function (userId: number) {
      dispatch(unfollowAC(userId));
    },
    setUsers: function (users: UserType[]) {
      dispatch(setUsersAC(users));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);