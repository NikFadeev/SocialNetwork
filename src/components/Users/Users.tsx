import React from 'react';
import userPhoto from '../../assets/images/defaultLogo.jpg';
import css from './Users.module.css';
import { UserType } from "../../redux/users-reducer";
import { NavLink } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';

type PropsType = {
  users: UserType[],
  follow: (id: number) => void,
  unfollow: (id: number) => void,
  totalUsersCount: number,
  pageSize: number,
  currentPage: number,
  onPageChanged: (page: number) => void,
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
  let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
  let pages = [];

  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  return <div>
    <div>
      {pages.map(p => {
        return <span className={props.currentPage === p ? css.selectedPage : ''}
          onClick={() => {
            props.onPageChanged(p)
          }}>{p}</span>;
      })}
    </div>
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
              ? <button onClick={() => {
                axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {
                  withCredentials: true,
                  headers: { "API-KEY": "397aad83-4661-4e77-8514-df8ec891b853" }
                })
                  .then((response: AxiosResponse<ResponseType>) => {
                    if (response.data.resultCode === 0) {
                      props.unfollow(u.id);
                    }
                  })
              }}>Unfollow</button>
              : <button onClick={() => {
                axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {}, {
                  withCredentials: true,
                  headers: { "API-KEY": "397aad83-4661-4e77-8514-df8ec891b853" }
                })
                  .then((response: AxiosResponse<ResponseType>) => {
                    if (response.data.resultCode === 0) {
                      props.follow(u.id)
                    }
                  })
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