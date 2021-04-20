import { ProfileType } from '../../../redux/profile-reducer';
import Preloader from '../../common/Preloader/Preloader';
import s from './ProfileInfo.module.css';
import ProfileStatus from './ProfileStatusWithHooks';
import userPhoto from '../../../assets/images/defaultLogo.jpg';

export type PropsType = {
  profile: ProfileType | null,
  status: string,
  updateStatus: (status: string) => void,
  isOwner: boolean,
  savePhoto: (file: any) => void
}

const ProfileInfo = (props: PropsType) => {
  if (!props.profile) {
    return <Preloader />
  }

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.currentTarget.files && e.currentTarget.files.length) {
      props.savePhoto(e.currentTarget.files[0]);
    }
  }

  return <div>
    <div className={s.descriptionBlock}>
      <img src={props.profile.photos.large || userPhoto} />
      {props.isOwner && <input type="file" onChange={onFileChange} />}
      <ProfileStatus status={props.status} updateStatus={props.updateStatus} />
    </div>
  </div>
}

export default ProfileInfo;