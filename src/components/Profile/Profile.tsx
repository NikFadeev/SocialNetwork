import ProfileInfo from "./ProfileInfo/ProfileInfo";
import { StoreType } from "../../redux/redux-store";
import MyPostsContainer from "./MyPosts/MyPostsContainer";

const Profile = (props: any) => {
  return <div>
    <ProfileInfo profile={props.profile} />
    <MyPostsContainer />
  </div>
}

export default Profile;