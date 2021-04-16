import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { StateType } from '../redux/redux-store';

export function withAuthRedirect(Component: any) {
  const container = (props: any) => {
    if (!props.isAuth) return <Redirect to='/login' />
    return <Component {...props} />
  }

  function mapStateToProps(state: StateType) {
    return {
      isAuth: state.authPage.isAuth
    }
  }
 
  return connect(mapStateToProps, {})(container);
}