import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {StoreType} from "../../redux/redux-store";
import MyPostsContainer from "./MyPosts/MyPostsContainer";

const Profile = (props: {}) => {
    return <div>
        <ProfileInfo />
        <MyPostsContainer />
    </div>
}

export default Profile;