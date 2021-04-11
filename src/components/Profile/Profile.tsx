import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {StoreType} from "../../redux/redux-store";
import MyPostsContainer from "./MyPosts/MyPostsContainer";

type ProfilePropsType = {
    store: StoreType
}

const Profile = (props: ProfilePropsType) => {
    return <div>
        <ProfileInfo />
        <MyPostsContainer store={props.store} />
    </div>
}

export default Profile;