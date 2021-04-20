import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import { ProfileType, getUserProfile, getStatus, updateStatus, savePhoto } from '../../redux/profile-reducer';
import { StateType } from '../../redux/redux-store';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { compose } from 'redux';

// в RouteComponentProps прописывается тип пропсов которые должны прийти из withRouter
// а после & указывается тип оставшихся пропсов
type PropsType = RouteComponentProps<{ userId: string }> & {
  profile: ProfileType | null,
  getUserProfile: (userId: number) => void,
  getStatus: (userId: number) => void,
  updateStatus: (status: string) => void,
  authorizedUserId: string,
  savePhoto: (file: any) => void
}

class ProfileContainer extends React.Component<PropsType> {
  refreshProfile() {
    let userId = this.props.match.params.userId;
    if (!userId) {
      userId = this.props.authorizedUserId;
      if (!userId) {
        this.props.history.push('/login');
      }
    }

    this.props.getUserProfile(Number(userId));
    this.props.getStatus(Number(userId));
  }

  componentDidMount() {
    this.refreshProfile();
  }

  componentDidUpdate(prevProps: PropsType) {
    if (this.props.match.params.userId != prevProps.match.params.userId) {
      this.refreshProfile();
    }
  }

  render() {
    console.log('profile rendering');
    return <Profile {...this.props} isOwner={!this.props.match.params.userId} />
  }
}

function mapStateToProps(state: StateType) {
  return {
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    isAuth: state.authPage.isAuth,
    authorizedUserId: state.authPage.id
  }
}

export default compose<React.ComponentType>(
  connect(mapStateToProps, { getUserProfile, getStatus, updateStatus, savePhoto }),
  withRouter
)(ProfileContainer);