import { ProfileType } from '../../../redux/profile-reducer';
import Preloader from '../../common/Preloader/Preloader';
import s from './ProfileInfo.module.css';
import ProfileStatus from './ProfileStatus';

export type PropsType = {
  profile: ProfileType | null
}

const ProfileInfo = (props: PropsType) => {
  if (!props.profile) {
    return <Preloader />
  }

  return <div>
    <div className={s.descriptionBlock}>
      <img src={props.profile.photos.large} />
      <ProfileStatus status="hello" />
    </div>
  </div>
}

export default ProfileInfo;