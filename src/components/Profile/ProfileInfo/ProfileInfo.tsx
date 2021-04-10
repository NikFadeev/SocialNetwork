import s from './ProfileInfo.module.css';

const ProfileInfo = () => {
    return <div>
        <div>
            <img src="https://memax.club/wp-content/uploads/2019/05/zima_na_zastavku_15_20064653.jpg" alt=""/>
        </div>
        <div className={s.descriptionBlock}>
            ava + description
        </div>
    </div>
}

export default ProfileInfo;