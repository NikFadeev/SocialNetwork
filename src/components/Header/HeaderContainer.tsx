import React from 'react';
import s from './Header.module.css';
import Header from './Header';
import { connect } from 'react-redux';
import { StateType } from '../../redux/redux-store';
import { logout } from '../../redux/auth-reducer';

type PropsType = {
  isAuth: boolean,
  login: string | null,
  logout: () => void
}

class HeaderContainer extends React.Component<PropsType> {
  render() {
    return <Header isAuth={this.props.isAuth} login={this.props.login} logout={this.props.logout} />
  }
}

function mapStateToProps(state: StateType) {
  return {
    isAuth: state.authPage.isAuth,
    login: state.authPage.login
  }
}

export default connect(mapStateToProps, { logout })(HeaderContainer);