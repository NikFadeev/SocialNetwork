import c from './Navbar.module.css';
import {NavLink} from 'react-router-dom';

const Navbar = () => {
    return <nav className={c.nav}>
        <div className={c.item}><NavLink activeClassName={c.active} to={'/profile'}>Profile</NavLink></div>
        <div className={c.item}><NavLink activeClassName={c.active} to={'/dialogs'}>Messages</NavLink></div>
        <div className={c.item}><NavLink activeClassName={c.active} to={'/news'}>News</NavLink></div>
    </nav>
};

export default Navbar;