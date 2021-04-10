import { Route } from 'react-router-dom';
import './App.css';
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import Dialogs from "./components/Dialogs/Dialogs";
import { _StateType, DispatchFunctionType, StoreType } from "./redux/state";

type appPropsType = {
  store: StoreType,
  dispatch: DispatchFunctionType
  state: _StateType,
}

function App(props: appPropsType) {
  return (
    <div className="app-wrapper">
      <Header />
      <Navbar />
      <div className={'app-wrapper-content'}>
        <Route path={'/dialogs'}
          render={() => <Dialogs store={props.store} />} />
        <Route path={'/profile'}
          render={() => <Profile
            profilePage={props.state.profilePage}
            dispatch={props.dispatch} />} />
      </div>
    </div>
  );
}

export default App;
