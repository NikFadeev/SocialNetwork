import s from './Header.module.css';
import { NavLink } from 'react-router-dom'

type PropsType = {
  isAuth: boolean,
  login: string | null,
  logout: () => void
}

const Header = (props: PropsType) => {
  return <header className={s.header}>
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDdJpvpgr0ex8D_llrc9QSKmyUR5q8Zpd5EQ&usqp=CAU" alt="" />
    <div>
      {props.isAuth
        ? <div>
          {props.login + " - "} <button onClick={props.logout}>Logout</button>
        </div>
        : <NavLink to='/login'>Login</NavLink>}
    </div>
  </header>
}

export default Header;