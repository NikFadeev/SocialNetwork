import React from 'react';
import userPhoto from '../../assets/images/defaultLogo.jpg';
import css from './Users.module.css';
import { UserType } from "../../redux/users-reducer";
import { NavLink } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';
import Paginator from '../common/Paginator/Paginator';

type PropsType = {
  users: UserType[],
  follow: (id: number) => void,
  unfollow: (id: number) => void,
  totalUsersCount: number,
  pageSize: number,
  currentPage: number,
  onPageChanged: (page: number) => void,
  followingInProgress: number[]
}

type ResponseType = {
  resultCode: number,
  data: {
    id: number,
    email: string,
    login: string
  },
  messages: string[]
}

function Users(props: PropsType) {
  return <div>
    <Paginator totalItemsCount={props.totalUsersCount}
      pageSize={props.pageSize}
      currentPage={props.currentPage}
      onPageChanged={props.onPageChanged}
      paginatorSize={10} />
    {
      props.users.map(u => <div key={u.id}>
        <span>
          <div>
            <NavLink to={`/profile/${u.id}`}>
              <img src={u.photos.small != null ? u.photos.small : userPhoto} className={css.userPhoto} />
            </NavLink>
          </div>
          <div>
            {u.followed
              ? <button disabled={props.followingInProgress.includes(u.id)} onClick={() => {
                props.unfollow(u.id);
              }}>Unfollow</button>
              : <button disabled={props.followingInProgress.includes(u.id)} onClick={() => {
                props.follow(u.id);
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

export default Users;