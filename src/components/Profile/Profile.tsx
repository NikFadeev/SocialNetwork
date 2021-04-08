import c from './Profile.module.css';

export type ProfileType = {
    state: MyPostsType
}

const Profile = (props: ProfileType) => {
    return <div className={c.content}>
        <ProfileInfo />
        <MyPosts posts={props.state.posts}/>
    </div>
};

export default Profile;