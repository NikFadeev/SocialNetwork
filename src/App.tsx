import {Route} from 'react-router-dom';
import './App.css';
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import Dialogs from "./components/Dialogs/Dialogs";
import UsersContainer from './components/Users/UsersContainer';

function App(props: {}) {
    return (
      <div className="app-wrapper">
        <Header />
        <Navbar />
        <div className={'app-wrapper-content'}>
          <Route path={'/dialogs'}
            render={() => <Dialogs />} />
          <Route path={'/profile'}
            render={() => <Profile />} />
          <Route path={'/users'}
            render={() => <UsersContainer />} />
        </div>
      </div>
    );
}

export default App;
