import {Route} from 'react-router-dom';
import './App.css';
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import Dialogs from "./components/Dialogs/Dialogs";
import {StateType, StoreType} from "./redux/redux-store";
import {Dispatch} from "redux";

type appPropsType = {
    store: StoreType,
    dispatch: Dispatch
    state: StateType,
}

function App(props: appPropsType) {
    return (
        <div className="app-wrapper">
            <Header/>
            <Navbar/>
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
