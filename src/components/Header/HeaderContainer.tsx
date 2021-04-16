import React from 'react';
import s from './Header.module.css';
import Header from './Header';
import { connect } from 'react-redux';
import { StateType } from '../../redux/redux-store';
import { getAuthUserData } from '../../redux/auth-reducer';

type PropsType = {
  isAuth: boolean,
  login: string | null,
  getAuthUserData: () => void
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

class HeaderContainer extends React.Component<PropsType> {
  componentDidMount() {
    this.props.getAuthUserData();
  }

  render() {
    return <Header isAuth={this.props.isAuth} login={this.props.login} />
  }
}

function mapStateToProps(state: StateType) {
  return {
    isAuth: state.authPage.isAuth,
    login: state.authPage.login
  }
}

export default connect(mapStateToProps, { getAuthUserData })(HeaderContainer);