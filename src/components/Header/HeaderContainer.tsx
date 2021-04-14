import React from 'react';
import s from './Header.module.css';
import Header from './Header';
import { connect } from 'react-redux';
import { StateType } from '../../redux/redux-store';
import { setAuthUserData } from '../../redux/auth-reducer';
import axios, { AxiosResponse } from 'axios';

type PropsType = {
  isAuth: boolean,
  login: string | null,
  setAuthUserData: (id: number, email: string, login: string) => void
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
    axios.get('https://social-network.samuraijs.com/api/1.0/auth/me', { withCredentials: true })
      .then((response: AxiosResponse<ResponseType>) => {
        if (response.data.resultCode === 0) {
          const { id, email, login } = response.data.data;
          this.props.setAuthUserData(id, email, login);
        }
      })
  }

  render() {
    console.log(this.props);
    return <Header isAuth={this.props.isAuth} login={this.props.login} />
  }
}

function mapStateToProps(state: StateType) {
  return {
    isAuth: state.authPage.isAuth,
    login: state.authPage.login
  }
}

export default connect(mapStateToProps, { setAuthUserData })(HeaderContainer);