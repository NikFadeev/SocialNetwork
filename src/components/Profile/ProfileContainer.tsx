import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import { ProfileType, setUserProfile } from '../../redux/profile-reducer';
import axios from 'axios';
import { StateType } from '../../redux/redux-store';
import { RouteComponentProps, withRouter } from 'react-router-dom';

// в RouteComponentProps прописывается тип пропсов которые должны прийти из withRouter
// а после & указывается тип оставшихся пропсов
type PropsType = RouteComponentProps<{ userId: string }> & {
  profile: ProfileType | null,
  setUserProfile: (profile: ProfileType) => void
}

class ProfileContainer extends React.Component<PropsType> {
  componentDidMount() {
    console.log(this.props.match);
    let userId = this.props.match.params.userId;
    if (!userId) {
      userId = "2";
    }

    axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`)
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

const withUrl = withRouter(ProfileContainer);
export default connect(mapStateToProps, { setUserProfile })(withUrl);