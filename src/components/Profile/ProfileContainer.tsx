import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import { ProfileType, getUserProfile } from '../../redux/profile-reducer';
import { StateType } from '../../redux/redux-store';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { compose } from 'redux';

// в RouteComponentProps прописывается тип пропсов которые должны прийти из withRouter
// а после & указывается тип оставшихся пропсов
type PropsType = RouteComponentProps<{ userId: string }> & {
  profile: ProfileType | null,
  getUserProfile: (userId: number) => void
}

class ProfileContainer extends React.Component<PropsType> {
  componentDidMount() {
    let userId = this.props.match.params.userId;
    if (!userId) {
      userId = "2";
    }

    this.props.getUserProfile(Number(userId));
  }

  render() {
    return <Profile {...this.props} />
  }
}

function mapStateToProps(state: StateType) {
  return {
    profile: state.profilePage.profile
  }
}

export default compose<React.ComponentType>(
  connect(mapStateToProps, { getUserProfile }),
  withRouter
)(ProfileContainer);