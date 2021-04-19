import { Route } from 'react-router-dom';
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import Dialogs from "./components/Dialogs/Dialogs";
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import { StateType } from './redux/redux-store';
import { initializeApp } from './redux/app-reducer';
import { connect } from 'react-redux';
import Preloader from './components/common/Preloader/Preloader';
import { useEffect } from 'react';

type PropsType = {
  initialized: boolean,
  initializeApp: () => void
}

function App(props: PropsType) {
  useEffect(() => {
    props.initializeApp();
  }, []);

  if (!props.initialized) return <Preloader />

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

function mapStateToProps(state: StateType) {
  return {
    initialized: state.appPage.initialized
  }
}

export default connect(mapStateToProps, { initializeApp })(App);
