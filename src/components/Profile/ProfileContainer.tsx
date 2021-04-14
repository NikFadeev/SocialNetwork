import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import { ProfileType, setUserProfile } from '../../redux/profile-reducer';
import axios from 'axios';
import { StateType } from '../../redux/redux-store';

type PropsType = {
  profile: ProfileType | null,
  setUserProfile: (profile: ProfileType) => void
}

class ProfileContainer extends React.Component<PropsType> {
  componentDidMount() {
    axios.get(`https://social-network.samuraijs.com/api/1.0/profile/2`)
      .then(response => {
        this.props.setUserProfile(response.data);
      })
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

export default connect(mapStateToProps, { setUserProfile })(ProfileContainer);