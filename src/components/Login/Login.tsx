import React from 'react';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { StateType } from '../../redux/redux-store';
import { login } from '../../redux/auth-reducer';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

type LoginFormPropsType = InjectedFormProps;

function LoginForm(props: LoginFormPropsType) {
  return <form onSubmit={props.handleSubmit}>
    <div>
      <Field placeholder={'login'} name={'login'} component={'input'} />
    </div>
    <div>
      <Field placeholder={'password'} name={'password'} component={'input'} />
    </div>
    <div>
      <Field type={'checkbox'} name={'rememberMe'} component={'input'} />
    </div>
    <div>
      <button>Login</button>
    </div>
  </form>
}

const LoginReduxForm = reduxForm({
  form: 'login'
})(LoginForm);

type LoginPropsType = {
  isAuth: boolean,
  login: (email: string, password: string, rememberMe: boolean) => void
}

function Login(props: LoginPropsType) {
  const handleSubmit = (formData: { login?: string, password?: string, rememberMe?: boolean}) => {
    if (formData.login && formData.password) {
      props.login(formData.login, formData.password, formData.rememberMe ?? false);
    }
  }

  if (props.isAuth) return <Redirect to={'/profile'} />

  return <div>
    <h1>Login</h1>
    <LoginReduxForm onSubmit={handleSubmit} />
  </div>
}

function mapStateToProps(state: StateType) {
  return {
    isAuth: state.authPage.isAuth
  }
}

export default connect(mapStateToProps, { login })(Login);