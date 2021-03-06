import ProfileInfo from "./ProfileInfo/ProfileInfo";
import { StoreType } from "../../redux/redux-store";
import MyPostsContainer from "./MyPosts/MyPostsContainer";

const Profile = (props: any) => {
  return <div>
    <ProfileInfo profile={props.profile} updateStatus={props.updateStatus} status={props.status} isOwner={props.isOwner} savePhoto={props.savePhoto} />
    <MyPostsContainer />
  </div>
}

export default Profile;