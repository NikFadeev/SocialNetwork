import React from 'react';
import userPhoto from '../../assets/images/defaultLogo.jpg';
import css from './Users.module.css';
import { UserType } from "../../redux/users-reducer";
import { NavLink } from 'react-router-dom';

type PropsType = {
  users: UserType[],
  follow: (id: number) => void,
  unfollow: (id: number) => void,
  totalUsersCount: number,
  pageSize: number,
  currentPage: number,
  onPageChanged: (page: number) => void,
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
                props.unfollow(u.id)
              }}>Unfollow</button>
              : <button onClick={() => {
                props.follow(u.id)
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