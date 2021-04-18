import React from 'react';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';

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

}

function Login(props: LoginPropsType) {
  const handleSubmit = (formData: { login?: string, password?: string, rememberMe?: boolean}) => {
    console.log(formData);
  }

  return <div>
    <h1>Login</h1>
    <LoginReduxForm onSubmit={handleSubmit} />
  </div>
}

export default Login;