import { ProfileType } from '../../../redux/profile-reducer';
import Preloader from '../../common/Preloader/Preloader';
import s from './ProfileInfo.module.css';
import ProfileStatus from './ProfileStatusWithHooks';

export type PropsType = {
  profile: ProfileType | null,
  status: string,
  updateStatus: (status: string) => void
}

const ProfileInfo = (props: PropsType) => {
  if (!props.profile) {
    return <Preloader />
  }

  return <div>
    <div className={s.descriptionBlock}>
      <img src={props.profile.photos.large} />
      <ProfileStatus status={props.status} updateStatus={props.updateStatus} />
    </div>
  </div>
}

export default ProfileInfo;