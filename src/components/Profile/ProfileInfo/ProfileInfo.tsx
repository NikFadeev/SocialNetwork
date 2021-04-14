import { ProfileType } from '../../../redux/profile-reducer';
import Preloader from '../../common/Preloader/Preloader';
import s from './ProfileInfo.module.css';

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
      ava + description
        </div>
  </div>
}

export default ProfileInfo;