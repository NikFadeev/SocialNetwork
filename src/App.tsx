import {Route} from 'react-router-dom';
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import Dialogs from "./components/Dialogs/Dialogs";
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';

function App(props: {}) {
    return (
      <div className="app-wrapper">
        <HeaderContainer />
        <Navbar />
        <div className={'app-wrapper-content'}>
          <Route path={'/dialogs'}
            render={() => <Dialogs />} />
          <Route path={'/profile/:userId?'}
            render={() => <ProfileContainer />} />
          <Route path={'/users'}
            render={() => <UsersContainer />} />
          <Route path={'/login'}
            render={() => <Login />} />
        </div>
      </div>
    );
}

export default App;
